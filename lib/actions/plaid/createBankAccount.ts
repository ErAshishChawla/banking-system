"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { keys } from "@/lib/keys";
import { ID } from "node-appwrite";
import { apiResponse, parseStringify } from "@/lib/utils";

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const { APPWRITE_DATABASE_ID, APPWRITE_BANK_COLLECTION_ID } = keys;

    const bankAccount = await database.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    );

    return parseStringify(
      apiResponse(200, null, {
        bankAccount,
      })
    );
  } catch (error) {
    console.log("[createBankAccount] Error", error);
    return parseStringify(
      apiResponse(500, "Failed to create bank account", null)
    );
  }
};
