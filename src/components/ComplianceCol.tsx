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

import { cn } from "@/lib/utils";

const formats = {
  "Lithium Ion": [
    "AA",
    "AAA",
    "C",
    "D",
    "9V",
    "Lantern",
    "CR-V3",
    "CR-P2 (CR-P2/5024LC)",
    "2CR5 (2CR5/5032LC)",
    "CR2 (CR17355/5046LC)",
    "CR123A",
    "CR123A (CR17345/5018LC)",
    "RCR123A",
    "RCR123",
    "RCR-V3",
    "OTHER",
  ],
};
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
      BATTERY_TYPE: [],
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      name="myForm"
      id="myForm"
      className="flex"
    >
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex h-[20px] justify-center border-r border-b text-xs font-bold">
            SKU {index + 1}
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`BATTERY_TYPE-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alkaline-battery">
                      Alkaline Battery
                    </SelectItem>
                    <SelectItem value="alkaline-coin-button">
                      Alkaline Coin/Button
                    </SelectItem>
                    <SelectItem value="lead-acid">Lead-Acid</SelectItem>
                    <SelectItem value="lithium-carbon">
                      Lithium Carbon Flouride (Li-CFx)
                    </SelectItem>
                    <SelectItem value="lithium-coin">
                      Lithium Coin/Button
                    </SelectItem>
                    <SelectItem value="lithium-iron-disulfide">
                      Lithium Iron Disulfide (LiFe2)
                    </SelectItem>
                    <SelectItem value="lithium-iron-phosphate">
                      Lithium iron phosphate (LiFePO4)
                    </SelectItem>
                    <SelectItem value="lithium-cobalt">
                      Lithium-cobalt (LiCoO2)
                    </SelectItem>
                    <SelectItem value="lithium-ion">
                      Lithium-Ion Battery
                    </SelectItem>
                    <SelectItem value="lithium-manganese">
                      Lithium-manganese(LiMn204)
                    </SelectItem>
                    <SelectItem value="lithium-manganese-dioxide">
                      Lithium-manganese(LiMn204)
                    </SelectItem>
                    <SelectItem value="lithium-polymer">
                      Lithium-Polymer
                    </SelectItem>
                    <SelectItem value="manganese-titanium-lithium">
                      Manganese Titanium Lithium
                    </SelectItem>
                    <SelectItem value="nickel-cadmium">
                      Nickel-Cadmium (NiCd)
                    </SelectItem>
                    <SelectItem value="nickel-metal-hydride">
                      Nickel-Metal Hydride (NiMH)
                    </SelectItem>
                    <SelectItem value="silver-oxide-coin">
                      Silver Oxide Coin/Button
                    </SelectItem>
                    <SelectItem value="zinc-air-coin">
                      Zinc Air Coin/Button
                    </SelectItem>
                    <SelectItem value="zinc-carbon">Zinc Carbon</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`size_format-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(formats).map(([type, sizes]) => (
                      <div key={type}>

                          {sizes.map((size, index) => (
                            <SelectItem key={index} value={size}>{size}</SelectItem>
                          ))}

                      </div>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`quantity-${index}`}
              render={({ field }) => (
                <Input
                {...field}
                className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                required
                minLength={12}
                maxLength={13}
                pattern="\d+" // Use the \d+ regex pattern to allow only digits
                title="Please enter only digits"
              />
              )}
            />
          </div>
        </div>
      ))}
    </form>
  );
}
