"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import {
  SignupFormValues,
  apiResponse,
  parseStringify,
  signupFormSchema,
} from "@/lib/utils";
import { createAdminClient } from "@/lib/server/appwrite";

export async function signUp(values: SignupFormValues) {
  try {
    const sanitizedValues = await signupFormSchema.parseAsync(values);

    const { account } = await createAdminClient();

    const { email, password, firstName, lastName } = sanitizedValues;

    const accountCreationRes = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return apiResponse(200, null, {
      user: parseStringify(accountCreationRes),
    });
  } catch (error: any) {
    console.log("[signUp] Error", error);
    return apiResponse(500, error?.message || "Internal server error");
  }
}
