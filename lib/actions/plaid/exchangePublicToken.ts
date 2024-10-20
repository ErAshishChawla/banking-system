"use server";

import { revalidatePath } from "next/cache";
import {
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
} from "plaid";

import { routes } from "@/constants";
import { plaidClient } from "@/lib/plaid";
import { apiResponse, encryptId, parseStringify } from "@/lib/utils";
import { addFundingSource } from "@/lib/actions/dwolla/dwolla.actions";
import { createBankAccount } from "@/lib/actions/plaid/createBankAccount";

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response?.data?.access_token;
    const itemId = response?.data?.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse?.data?.accounts?.[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData?.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse?.data?.processor_token;

    // Create a funding source URl for the account using the Dwolla customerId, processor token and the bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData?.name,
    });

    if (!fundingSourceUrl) {
      throw new Error("Failed to create funding source");
    }

    // Create a bank account using the user id, item id, account id, access token, funding source url and sharable id
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData?.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData?.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath(routes.home());

    return parseStringify(apiResponse(200, null, null));
  } catch (error) {
    console.log("[exchangePublicToken] Error", error);
    return parseStringify(
      apiResponse(500, "Failed to exchange public token", null)
    );
  }
};
