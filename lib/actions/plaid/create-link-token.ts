"use server";

import { keys } from "@/lib/keys";
import { plaidClient } from "@/lib/plaid";
import { apiResponse, parseStringify } from "@/lib/utils";
import { CountryCode, Products } from "plaid";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: keys.PLAID_PRODUCTS!.split(",") as Products[],
      language: "en",
      country_codes: keys.PLAID_COUNTRY_CODES!.split(",") as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify(
      apiResponse(200, null, {
        linkToken: response?.data?.link_token,
      })
    );
  } catch (error) {
    console.log("[createLinkToken] Error", error);
    return parseStringify(
      apiResponse(500, "Failed to create link token", null)
    );
  }
};
