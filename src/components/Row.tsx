import {
  Controller,
  SubmitHandler,
  useForm,
  FieldValues,
} from "react-hook-form";
import { Button } from "./ui/button";
import { useNumStore } from "@/store/NumStore";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export default function Row() {
  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();
  const [maxInnerpack, setMaxInnerpack] = useState<number>(0);
  const [maxInnerpack1, setMaxInnerpack1] = useState<number>(0);
  const [maxInnerpack2, setMaxInnerpack2] = useState<number>(0);

  const updateMaxInnerpack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxInnerpack(Number(value));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data); // Handle your form submission logic here
    console.log(data["VPN-0"]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex w-[6000px]" key={index}>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`VPN-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`shortDescription-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`longDescription-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={40}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`UPC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-32 h-8 px-2 font-normal border rounded-md"
                  required
                  minLength={12}
                  maxLength={13}
                  pattern="\d+" // Use the \d+ regex pattern to allow only digits
                  title="Please enter only digits"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`secondaryUPC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-32 h-8 px-2 font-normal border rounded-md"
                  required
                  minLength={12}
                  maxLength={13}
                  pattern="\d+" // Use the \d+ regex pattern to allow only digits
                  title="Please enter only digits"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`brand-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`model-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`manufacturer-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`unitCost-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`retailPrice-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`boxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`boxedHeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`boxedLength-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`boxedWeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`unboxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`unboxedHeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`unboxedLength-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`unboxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`casepack-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                  onChange={(e) => updateMaxInnerpack(e)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 font-bold border-b border-r">
            <Controller
              control={control}
              name={`innerpack-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                  max={maxInnerpack}
                />
              )}
            />
          </div>
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
