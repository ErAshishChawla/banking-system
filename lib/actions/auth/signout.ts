"use server";

import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/server/appwrite";
import { apiResponse } from "@/lib/utils";

export async function signout() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");

    return apiResponse(200, null, null);
  } catch (error: any) {
    console.log("[ERROR] signout", error);
    return apiResponse(500, error?.message, null);
  }
}
