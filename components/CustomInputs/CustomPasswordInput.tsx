"use client";

import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomTextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  passwordToggle?: boolean;
}

function CustomPasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomTextInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((s) => !s);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="w-full flex flex-col">
              <FormControl>
                <div className="w-full flex gap-3 items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="input-class"
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={togglePassword}
                    size="icon"
                    variant={"ghost"}
                    className="hover:bg-gray-200/50 transition-colors"
                  >
                    {!showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="form-message" />
            </div>
          </FormItem>
        </div>
      )}
    />
  );
}

export default CustomPasswordInput;
