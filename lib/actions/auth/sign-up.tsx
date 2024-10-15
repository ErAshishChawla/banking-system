import { z } from "zod";

import { SignupFormValues, signupFormSchema } from "@/lib/utils";

export async function signUp(values: SignupFormValues) {
  try {
    const sanitizedValues = await signupFormSchema.parseAsync(values);

    // Call the API to sign up the user
  } catch (error) {}
}
