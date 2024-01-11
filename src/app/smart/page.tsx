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
  forIndividualSale: z.string().min(1, {
    message: "Please select one.",
  }),
  skuRequiredAdvance: z.string().min(1, {
    message: "Please select one.",
  }),
  ftpVideoLocation: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  onproofFTPFileLocation: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  vendorAssetSiteURL: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  vendorAssetSiteUsernamePassword: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
});

// Onproof.ca FTP File Location
// Vendor Asset Site URL
// Vendor Asset Site Username & Password
// ETA for Assets
// Product Variants
// Product Overview
// Features and Benefits
// Is In-Store Only BB
// Embargo Date
// Product Condition
// Type (CA-English)
// Material (CA-English)
// Colour (CA-English)
// Pattern/Theme (CA-English)
// Collection/Series (CA-English)
// Compatible Brands (CA-English)
// Compatible Models (CA-English)
// Voice Assistant Built-In
// Works with Google Assistant
// Works with Amazon Alexa
// Product Line (CA-English)
// Jewelry Accessory Type
// Width
// Height
// Depth
// Width (Inches)
// Height (Inches)
// Depth (Inches)
// Weight
// What's in the Box (CA-English)
// Flyer Software Platform
// Flyer Subhead (CA-English)
// Flyer Icon 1
// Flyer Bullet 1 (CA-English)
// Flyer Bullet 2 (CA-English)
// Flyer Bullet 3 (CA-English)
// Flyer Bullet 4 (CA-English)

export default function Smart() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UPC: "",
      skuOwner: "",
      modelNumber: "",
      longDescription: "",
      forIndividualSale: "",
      skuRequiredAdvance: "",
      ftpVideoLocation: "",
      onproofFTPFileLocation: "",
      vendorAssetSiteURL: "",
      vendorAssetSiteUsernamePassword: "",
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
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
                  <FormField
                    control={form.control}
                    name="forIndividualSale"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no-ensemble">
                                No - Ensemble Product
                              </SelectItem>
                              <SelectItem value="no-gift">
                                No - Gift with Purchase
                              </SelectItem>
                              <SelectItem value="no-multiBoxEnsemble">
                                No - Multi-box and Ensemble Product
                              </SelectItem>
                              <SelectItem value="no-multiBox">
                                No - Multi-box Product
                              </SelectItem>
                              <SelectItem value="yes">Yes</SelectItem>
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
                    name="skuRequiredAdvance"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="yes-photo">
                                Yes - Photo Services Required
                              </SelectItem>
                              <SelectItem value="yes-preorder">
                                Yes - Pre-Order/Coming Soon
                              </SelectItem>
                              <SelectItem value="yes-purchase">
                                Yes - Purchase Order
                              </SelectItem>
                              <SelectItem value="yes-manufacture">
                                Yes - Required for Manufacture of Product
                              </SelectItem>
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
                    name="ftpVideoLocation"
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
                    name="onproofFTPFileLocation"
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
                    name="vendorAssetSiteURL"
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
                    name="vendorAssetSiteUsernamePassword"
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
