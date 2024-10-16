"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import CustomPasswordInput from "@/components/CustomInputs/CustomPasswordInput";
import CustomCalendarInput from "@/components/CustomInputs/CustomCalendar";

import { signupFormSchema, SignupFormValues } from "@/lib/utils";
import { signUp } from "@/lib/actions/auth/sign-up";
import { routes } from "@/constants";

function SignUpForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const signupRes = await signUp(values);

      if (!signupRes?.success) {
        console.log("[SignUpForm] Error", signupRes.error);
        throw new Error("Sign up failed");
      }

      const user = signupRes?.data?.user;

      if (!user) {
        console.log("[SignUpForm] Error", "User not found");
        throw new Error("Sign up failed");
      }

      form.reset();
      toast.success("Sign up successful");
      router.push(routes.signIn());
    } catch (error: any) {
      console.log("[SignUpForm] Error", error);
      toast.error(error?.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-form">
      <header className="flex flex-col gap-5">
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

        <div className="flex flex-col gap-1">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : "Sign Up"}
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <CustomTextInput<SignupFormValues>
                  name="firstName"
                  label="First Name"
                  control={form.control}
                  placeholder="ex: John"
                />
                <CustomTextInput<SignupFormValues>
                  name="lastName"
                  label="Last Name"
                  control={form.control}
                  placeholder="ex: Doe"
                />
              </div>

              <CustomTextInput<SignupFormValues>
                name="address1"
                label="Address"
                control={form.control}
                placeholder="Enter your specific address"
              />

              <CustomTextInput<SignupFormValues>
                name="city"
                label="City"
                control={form.control}
                placeholder="Enter your city"
              />

              <div className="flex gap-4">
                <CustomTextInput<SignupFormValues>
                  name="state"
                  label="State"
                  control={form.control}
                  placeholder="ex: NY"
                />
                <CustomTextInput<SignupFormValues>
                  name="postalCode"
                  label="Postal Code"
                  control={form.control}
                  placeholder="ex: 11101"
                />
              </div>

              <div className="flex gap-4">
                <CustomCalendarInput<SignupFormValues>
                  name="dateOfBirth"
                  label="Date of Birth"
                  control={form.control}
                  placeholder="yyyy-mm-dd"
                />
                <CustomTextInput<SignupFormValues>
                  name="ssn"
                  label="SSN"
                  control={form.control}
                  placeholder="ex:1234"
                />
              </div>

              <CustomTextInput<SignupFormValues>
                name="email"
                label="Email"
                control={form.control}
                placeholder="Enter your email"
              />
              <CustomPasswordInput<SignupFormValues>
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
                    Sign Up
                  </div>
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              Already have an account?
            </p>
            <Link href={routes.signIn()} className="form-link">
              Sign In
            </Link>
          </footer>
        </>
      )}
    </div>
  );
}

export default SignUpForm;
