"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  UPC: z
    .string()
    .min(12, {
      message: "UPC must be a minimum of 12 characters.",
    })
    .max(13, {
      message: "UPC exceeds 13 characters.",
    }),
    skuOwner: z.string().min(1, {
      message: "Please select one.",
    }),
    modelNumber: z
    .string()
    .min(1, {
      message: "Please fill out this field.",
    })
    .max(20, {
      message: "Model number exceeds 20 characters.",
    }),
    longDescription: z
    .string()
    .min(1, {
      message: "Please fill out this field.",
    })
    .max(40, {
      message: "Long description exceeds 40 characters.",
    }),
});

export default function Smart() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UPC: "",
      skuOwner: "",
      modelNumber: "",
      longDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values.UPC, values.skuOwner, values.modelNumber);
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Table className="flex flex-col">
            <TableHeader>
              <TableRow>
                <TableHead>Primary UPC</TableHead>
                <TableHead>SKU Owner</TableHead>
                <TableHead>Model Number</TableHead>
                <TableHead>RMS Long Description</TableHead>
                <TableHead>For Individual Sale</TableHead>
                <TableHead>SKU Required in Advance</TableHead>
                <TableHead>FTP Video Location</TableHead>
                <TableHead>Onproof.ca FTP File Location</TableHead>
                <TableHead>Vendor Asset Site URL</TableHead>
                <TableHead>Vendor Asset Site Username & Password</TableHead>
                <TableHead>ETA for Assets</TableHead>
                <TableHead>Product Variants</TableHead>
                <TableHead>Product Overview</TableHead>
                <TableHead>Features and Benefits</TableHead>
                <TableHead>Is In-Store Only BB</TableHead>
                <TableHead>Embargo Date</TableHead>
                <TableHead>Product Condition</TableHead>
                <TableHead>Type (CA-English)</TableHead>
                <TableHead>Material (CA-English)</TableHead>
                <TableHead>Colour (CA-English)</TableHead>
                <TableHead>Pattern/Theme (CA-English)</TableHead>
                <TableHead>Collection/Series (CA-English)</TableHead>
                <TableHead>Compatible Brands (CA-English)</TableHead>
                <TableHead>Compatible Models (CA-English)</TableHead>
                <TableHead>Voice Assistant Built-In</TableHead>
                <TableHead>Works with Google Assistant</TableHead>
                <TableHead>Works with Amazon Alexa</TableHead>
                <TableHead>Product Line (CA-English)</TableHead>
                <TableHead>Jewelry Accessory Type</TableHead>
                <TableHead>Width</TableHead>
                <TableHead>Height</TableHead>
                <TableHead>Depth</TableHead>
                <TableHead>Width (Inches)</TableHead>
                <TableHead>Height (Inches)</TableHead>
                <TableHead>Depth (Inches)</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>What's in the Box (CA-English)</TableHead>
                <TableHead>Flyer Software Platform</TableHead>
                <TableHead>Flyer Subhead (CA-English)</TableHead>
                <TableHead>Flyer Icon 1</TableHead>
                <TableHead>Flyer Bullet 1 (CA-English)</TableHead>
                <TableHead>Flyer Bullet 2 (CA-English)</TableHead>
                <TableHead>Flyer Bullet 3 (CA-English)</TableHead>
                <TableHead>Flyer Bullet 4 (CA-English)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="UPC"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="#000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="skuOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="futureshop">F</SelectItem>
                              <SelectItem value="bestbuy">B</SelectItem>
                              <SelectItem value="shared">S</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                <FormField
                    control={form.control}
                    name="modelNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
                <TableCell>
                  <Input></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
