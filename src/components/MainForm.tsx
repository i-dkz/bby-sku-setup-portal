"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNumStore } from "@/store/NumStore";

const formSchema = z.object({
  vendor: z.string().min(1, {
    message: "Vendor is required",
  }),
  department: z.string().min(1, {
    message: "Product type is required",
  }),
  numberOfSKUS: z.coerce.number().min(1, {message: "SKUs must be greater than 0 "}).max(50, {message:"Cannot exceed 50 SKUs at a time"}),
});

export function ProfileForm() {
  const {setSelectedNum} = useNumStore();

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: "",
      department: "",
      numberOfSKUS: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

      setSelectedNum(values.numberOfSKUS);
      router.push("/example");
    

    
    console.log(values.vendor);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asus">Asus</SelectItem>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="LG">LG</SelectItem>
                    <SelectItem value="HP">HP</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="futureshop">TV</SelectItem>
                    <SelectItem value="bestbuy">Computer</SelectItem>
                    <SelectItem value="shared">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfSKUS"
          render={({ field }) => (
            <FormItem>
              <FormLabel># of SKUs</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  {...field}
                  min={1}
                  max={50}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
