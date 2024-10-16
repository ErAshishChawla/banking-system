"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import {
  SigninFormValues,
  signinFormSchema,
  apiResponse,
  parseStringify,
} from "@/lib/utils";
import { createAdminClient } from "@/lib/server/appwrite";

export async function signin(values: SigninFormValues) {
  try {
    const sanitizedValues = await signinFormSchema.parseAsync(values);

    const { account } = await createAdminClient();

    const { email, password } = sanitizedValues;

    const signinRes = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", signinRes.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return apiResponse(200, null, {
      user: parseStringify(signinRes),
    });
  } catch (error: any) {
    console.log("[signUp] Error", error);
    return apiResponse(500, error?.message || "Internal server error");
  }
}
