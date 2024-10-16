"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import CustomPasswordInput from "@/components/CustomInputs/CustomPasswordInput";

import { signinFormSchema, SigninFormValues } from "@/lib/utils";
import { routes } from "@/constants";
import { useRouter } from "next/navigation";
import { signin } from "@/lib/actions/auth/sign-in";

function SignInForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: SigninFormValues) => {
    try {
      const signInRes = await signin(values);

      if (!signInRes?.success) {
        console.log("[SignInForm] Error", signInRes.error);
        throw new Error("Sign in failed");
      }

      const user = signInRes?.data?.user;

      if (!user) {
        console.log("[SignInForm] Error", "User not found");
        throw new Error("Sign in failed");
      }

      form.reset();
      toast.success("Sign in successful");
      router.push(routes.home());
    } catch (error) {
      console.log("[SignInForm] Error", error);

      toast.error("Sign in failed");
    }
  };

  return (
    <div className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link className="flex justify-start items-center w-full gap-2" href="/">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="select-none"
          />
          <div className="font-ibm-plex-serif text-20 font-bold text-black-1 select-none">
            Horizon
          </div>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : "Sign In"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">Plaid Link</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomTextInput<SigninFormValues>
                name="email"
                label="Email"
                control={form.control}
                placeholder="Enter your email"
              />
              <CustomPasswordInput<SigninFormValues>
                name="password"
                label="Password"
                control={form.control}
                placeholder="Enter your password"
                passwordToggle
              />
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="form-btn disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <div className="flex justify-center items-center gap-2">
                    {isSubmitting && (
                      <LuLoader2 className="w-4 h-4 animate-spin" />
                    )}
                    Sign In
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              Don't have an account?
            </p>
            <Link href={routes.signUp()} className="form-link">
              Sign Up
            </Link>
          </footer>
        </>
      )}
    </div>
  );
}

export default SignInForm;
