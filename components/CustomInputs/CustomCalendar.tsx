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
        <div className="form-item w-full">
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-full flex flex-col">
                  <FormControl>
                    <Input
                      className="input-class"
                      placeholder={placeholder}
                      value={
                        !field.value ? "" : format(field.value, "yyyy-MM-dd")
                      }
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage className="form-message" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  className="bg-white"
                  selected={
                    field.value
                      ? DateTime.fromISO(field.value).toJSDate()
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return;
                    const isoDate = DateTime.fromJSDate(date).toUTC().toISO();
                    field.onChange(isoDate);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        </div>
      )}
    />
  );
}

export default CustomCalendarInput;
