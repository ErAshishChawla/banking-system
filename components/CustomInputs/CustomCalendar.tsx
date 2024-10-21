"use client";

import { format } from "date-fns";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { DateTime } from "luxon";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomCalendarInput<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
}

function CustomCalendarInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomCalendarInput<T>) {
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
                  className="input-class"
                  type="date"
                  placeholder={placeholder}
                  {...field}
                  min={"1900-01-01"}
                  max={format(new Date(), "yyyy-MM-dd")}
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

export default CustomCalendarInput;
