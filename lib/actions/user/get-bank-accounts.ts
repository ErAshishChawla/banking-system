"use server";

import { Query } from "node-appwrite";

import { createAdminClient } from "@/lib/server/appwrite";
import { apiResponse, parseStringify } from "@/lib/utils";
import { keys } from "@/lib/keys";

interface getBankAccountsProps {
  userId: string;
}

export async function getBankAccounts({ userId }: getBankAccountsProps) {
  try {
    const { database } = await createAdminClient();

    const QUERY = Query.equal("userId", userId);
    const { APPWRITE_DATABASE_ID, APPWRITE_BANK_COLLECTION_ID } = keys;

    const bankAccounts = await database.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_BANK_COLLECTION_ID!,
      [QUERY]
    );

    return parseStringify(
      apiResponse(200, "Bank accounts fetched", {
        // bankAccounts: bankAccounts?.documents || [],
        count: bankAccounts?.total || 0,
      })
    );
  } catch (error) {
    console.error("[getBankAccounts] Error", error);
    return parseStringify(apiResponse(500, "Failed to fetch bank accounts"));
  }
}
