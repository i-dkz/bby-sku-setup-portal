import {
    Controller,
    SubmitHandler,
    useForm,
    FieldValues,
  } from "react-hook-form";
  import { Button } from "./ui/button";
  import { useNumStore } from "@/store/NumStore";
  import { Input } from "./ui/input";
  import { useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
  import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
  import { Calendar } from "./ui/calendar";
  import { CalendarIcon } from "lucide-react";
  import { format, isValid } from "date-fns";
  import { cn } from "@/lib/utils";
  
  // this function checks if a string is capitalized, used to differentiate between CO4P db values and other values
  function isCapitalized(str: string) {
    return str === str.toUpperCase();
  }
  
  // this is the row component, rows are dynamically rendered based on selectedNum and all the rows make up a form
  export default function Row() {
    const { selectedNum } = useNumStore();
    const { handleSubmit, control } = useForm();
  
    type FormData = {
      [key: string]: any;
    };
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      // these are the names of the attributes in the CO4P database so naming conventions are snakecase
      const formData: FormData = {
        BATTERY_TYPE: []
      };
  
      Object.keys(formData).forEach((key) => {
        const currentValue = formData[key];
  
        // check if the key has a default value, if yes, add default values to match the number of rows
        if (currentValue.length === 1) {
          const diff = selectedNum - currentValue.length;
  
          // Duplicate the values to match selectedNum
          formData[key] = [...currentValue, ...Array(diff).fill(currentValue[0])];
        }
      });
  
    //   // matching the data collected from the form to the db attribute
    //   Object.keys(data).forEach((key) => {
    //     if (isCapitalized(key)) {
    //       const splitKey = key.split("-")[0];
  
    //       // Format date values before pushing to the array
    //       if (splitKey === "ENT_STREET_DATE" && isValid(data[key])) {
    //         formData[splitKey].push(format(data[key], "yyyyMMddHHmmss"));
    //       } else {
    //         formData[splitKey].push(data[key]);
    //       }
    //     }
    //   });
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} name="myForm" id="myForm" className="flex">
        
        {Array.from({ length: selectedNum }).map((_, index) => (
          <div className="flex flex-col" key={index}>
            <div className="flex h-[20px] justify-center border-r border-b text-xs font-bold">SKU {index + 1}</div>
            <div className="flex items-center justify-center w-56 h-20 border-b border-r">
              <Controller
                control={control}
                name={`BATTERY_TYPE-${index}`}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                    required
                    maxLength={20}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center w-56 h-20 border-b border-r">
              <Controller
                control={control}
                name={`SHORT_DESC-${index}`}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                    required
                    maxLength={20}
                  />
                )}
              />
            </div>

          </div>
        ))}
        
      </form>
    );
  }
  