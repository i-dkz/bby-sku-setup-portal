import { Controller, SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { Button } from "./ui/button";
import { useNumStore } from "@/store/NumStore";
import { Input } from "./ui/input";

export default function Row() {
  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data); // Handle your form submission logic here
    console.log(data["VPN-0"])
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex" key={index}>
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
              name={`UPC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-32 h-8 px-2 font-normal border rounded-md"
                  required
                  minLength={12}
                  maxLength={13}
                  pattern="\d+"  // Use the \d+ regex pattern to allow only digits
                  title="Please enter only digits"
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
