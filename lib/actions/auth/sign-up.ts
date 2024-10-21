"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import {
  SignupFormValues,
  apiResponse,
  extractCustomerIdFromUrl,
  parseStringify,
  signupFormSchema,
} from "@/lib/utils";
import { createAdminClient } from "@/lib/server/appwrite";
import { createDwollaCustomer } from "../dwolla/dwolla.actions";
import { keys } from "@/lib/keys";

export async function signUp(values: SignupFormValues) {
  try {
    const sanitizedValues = await signupFormSchema.parseAsync(values);

    const { password, ...userData } = sanitizedValues;

    const { account, database } = await createAdminClient();

    const { email, firstName, lastName } = userData;

    const accountCreationRes = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!accountCreationRes) {
      throw new Error("Account creation failed!");
    }

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...sanitizedValues,
      type: "personal",
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Dwolla customer creation failed!");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const { APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID } = keys;
    const newUser = await database.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: accountCreationRes?.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(
      apiResponse(200, "Sign up successful", {
        user: newUser,
      })
    );
  } catch (error: any) {
    console.log("[signUp] Error", error);
    return apiResponse(500, error?.message || "Internal server error");
  }
}
