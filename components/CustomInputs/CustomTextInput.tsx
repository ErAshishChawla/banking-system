"use client";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
}

function CustomTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomPasswordInputProps<T>) {
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
                <Input
                  type="text"
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message" />
            </div>
          </FormItem>
        </div>
      )}
    />
  );
}

export default CustomTextInput;
