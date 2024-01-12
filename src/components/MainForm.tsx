"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const formSchema = z.object({
  vendorCode: z.string().min(4, {
    message: "Vendor code must be at least 4 numbers.",
  }),
  department: z.string().min(1),
})

export function ProfileForm() {

    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          vendorCode: "",
          department: ""
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (values.vendorCode === "2200") {
            router.push("/smart")
        }
        console.log(values.vendorCode)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="vendorCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Code</FormLabel>
              <FormControl>
                <Input placeholder="#000000" {...field} />
              </FormControl>
              <FormDescription>
                Enter vendor code.
              </FormDescription>
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
                            <SelectTrigger className="w-[180px]">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
