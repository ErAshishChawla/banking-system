"use server";

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { keys } from "@/lib/keys";
import { Query } from "node-appwrite";
import { apiResponse, parseStringify } from "@/lib/utils";

export const getUserData = async () => {
  try {
    const { account } = await createSessionClient();

    const { APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID } = keys;

    const loggedInUser = await account.get();

    const { database } = await createAdminClient();

    const query = Query.equal("userId", loggedInUser.$id);
    const userDetails = await database.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_USER_COLLECTION_ID!,
      [query]
    );

    const user = {
      ...loggedInUser,
      ...userDetails.documents?.[0],
    };

    return parseStringify(
      apiResponse(200, "User found", {
        user,
      })
    );
  } catch (error) {
    console.log("[getLoggedInUser] Error", error);
    return parseStringify(apiResponse(500, "User not found", null));
  }
};
