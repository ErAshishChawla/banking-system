import { keys } from "@/lib/keys";
import { createAdminClient } from "@/lib/server/appwrite";
import { apiResponse, parseStringify } from "@/lib/utils";
import { Query } from "node-appwrite";

export const getBank = async ({ documentId }: { documentId: string }) => {
  try {
    const { database } = await createAdminClient();

    const { APPWRITE_DATABASE_ID, APPWRITE_BANK_COLLECTION_ID } = keys;

    const bank = await database.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return parseStringify(
      apiResponse(200, "Bank fetched", {
        bank: bank.documents[0],
      })
    );
  } catch (error) {
    console.error("[getBank] Error", error);
    return parseStringify(apiResponse(500, "Failed to fetch bank"));
  }
};
