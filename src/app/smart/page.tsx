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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

const formSchema = z.object({
  VPN: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "VPN cannot exceed 20 characters" }),
  shortDescription: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Short description cannot exceed 20 characters" }),
  longDescription: z
    .string()
    .min(1, { message: "Required" })
    .max(40, { message: "Long description cannot exceed 20 characters" }),
  UPC: z
    .string()
    .min(12, {
      message: "UPC must be a minimum of 12 digits.",
    })
    .max(13, {
      message: "UPC exceeds 13 digits.",
    }),
  secondaryUPC: z
    .string()
    .min(12, {
      message: "UPC must be a minimum of 12 digits.",
    })
    .max(13, {
      message: "UPC exceeds 13 digits.",
    }),
  brand: z
    .string()
    .min(1, {
      message: "Required.",
    })
    .max(20, { message: "Brand cannot exceed 20 characters" }),
  model: z
    .string()
    .min(1, {
      message: "Required.",
    })
    .max(20, {
      message: "Model cannot exceed 20 characters.",
    }),
  manufacturer: z
    .string()
    .min(1, {
      message: "Required.",
    })
    .max(20, {
      message: "Manufacturer cannot exceed 20 characters.",
    }),
  unitCost: z.coerce.number().positive(),
  retailPrice: z.coerce.number().positive(),
  widthBoxed: z.coerce.number().positive(),
  heightBoxed: z.coerce.number().positive(),
  lengthBoxed: z.coerce.number().positive(),
  weightBoxed: z.coerce.number().positive(),
  widthUnboxed: z.coerce.number().positive(),
  heightUnboxed: z.coerce.number().positive(),
  lengthUnboxed: z.coerce.number().positive(),
  weightUnboxed: z.coerce.number().positive(),
  casepack: z.coerce.number().positive(),
  innerpack: z.coerce.number().positive(),
  unitCostAdditional1: z.coerce.number().optional(),
  casepackAdditional1: z.coerce.number().optional(),
  innerpackAdditional1: z.coerce.number().optional(),
  unitCostAdditional2: z.coerce.number().optional(),
  casepackAdditional2: z.coerce.number().optional(),
  innerpackAdditional2: z.coerce.number().optional(),
  frenchCompliant: z.string().min(1, { message: "Required" }),
  shippableToQuebec: z.string().min(1, { message: "Required" }),
  energyStar: z.string().min(1, { message: "Required" }),
  refurbished: z.string().min(1, { message: "Required" }),
  consignment: z.string().min(1, { message: "Required" }),
  softwarePlatform: z.string(),
  streetDate: z.date(),
  productWarrantyDays: z.string(),
  productWarrantyCoverage: z.string(),
  extendedPartsWarranty: z.string(),
  returnRestrictions: z.string(),
  expirationDate: z.string(),
  shelfLife: z.string(),
  dataFlag: z.string(),
  dangerousProduct: z.string(),
  forIndividualSale: z.string().min(1, {
    message: "Please select one.",
  }),
  skuRequiredAdvance: z.string().min(1, {
    message: "Please select one.",
  }),
  ftpVideoLocation: z.string().optional(),
  onproofFTPFileLocation: z.string().optional(),
  vendorAssetSiteURL: z.string().optional(),
  vendorAssetSiteUsernamePassword: z.string().optional(),
  etaForAssets: z.date({
    required_error: "ETA is required.",
  }),
  productVariants: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  productOverview: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  featuresAndBenefits: z
    .string()
    .min(0, {
      message: "Please fill out this field.",
    })
    .max(200, {
      message: "field cannot exceed 200 characters.",
    }),
  inStoreOnly: z.string().min(1, {
    message: "Please select one.",
  }),
  embargoDate: z.date().optional(),
  productCondition: z.string().min(1),
});

export default function Smart() {
  const [maxInnerpack, setMaxInnerpack] = useState<number>(0);
  const [maxInnerpack1, setMaxInnerpack1] = useState<number>(0);
  const [maxInnerpack2, setMaxInnerpack2] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      VPN: "",
      shortDescription: "",
      longDescription: "",
      UPC: "",
      secondaryUPC: "",
      brand: "",
      model: "",
      manufacturer: "",
      unitCost: 0,
      retailPrice: 0,
      widthBoxed: 0,
      heightBoxed: 0,
      lengthBoxed: 0,
      weightBoxed: 0,
      widthUnboxed: 0,
      heightUnboxed: 0,
      lengthUnboxed: 0,
      weightUnboxed: 0,
      casepack: 0,
      innerpack: 0,
      unitCostAdditional1: 0,
      casepackAdditional1: 0,
      innerpackAdditional1: 0,
      unitCostAdditional2: 0,
      casepackAdditional2: 0,
      innerpackAdditional2: 0,
      frenchCompliant: "",
      shippableToQuebec: "",
      energyStar: "",
      refurbished: "",
      consignment: "",
      productWarrantyDays: "365",
      productWarrantyCoverage: "",
      extendedPartsWarranty: "",
      skuRequiredAdvance: "",
      ftpVideoLocation: "",
      onproofFTPFileLocation: "",
      vendorAssetSiteURL: "",
      vendorAssetSiteUsernamePassword: "",
      productVariants: "",
      productOverview: "",
      featuresAndBenefits: "",
    },
  });

  useEffect(() => {
    // Update maxInnerpack when casepack changes
    setMaxInnerpack(form.getValues("casepack") as number);
    setMaxInnerpack1(form.getValues("casepackAdditional1") || 0);
    setMaxInnerpack2(form.getValues("casepackAdditional2") || 0);
  }, [
    form.watch("casepack"),
    form.watch("casepackAdditional1"),
    form.watch("casepackAdditional2"),
  ]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values.UPC, values.brand);
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Table className="flex flex-col">
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Part Number</TableHead>
                <TableHead>Description (Short)</TableHead>
                <TableHead>Description (Long)</TableHead>
                <TableHead>UPC</TableHead>
                <TableHead>Secondary UPC (Optional)</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Retail Price</TableHead>
                <TableHead>Width cm (Boxed)</TableHead>
                <TableHead>Height cm (Boxed)</TableHead>
                <TableHead>Depth cm (Boxed)</TableHead>
                <TableHead>Weight kg (Boxed)</TableHead>
                <TableHead>Width cm (Unboxed)</TableHead>
                <TableHead>Height cm (Unboxed)</TableHead>
                <TableHead>Depth cm (Unboxed)</TableHead>
                <TableHead>Weight kg (Unboxed)</TableHead>
                <TableHead>Case Pack Qty</TableHead>
                <TableHead>Inner Pack Qty</TableHead>
                <TableHead>Unit Cost For Additional Supplier(1)</TableHead>
                <TableHead>Case Pack Qty For Additional Supplier(1)</TableHead>
                <TableHead>Inner Pack Qty For Additional Supplier(1)</TableHead>
                <TableHead>Unit Cost For Additional Supplier(2)</TableHead>
                <TableHead>Case Pack Qty For Additional Supplier(2)</TableHead>
                <TableHead>Inner Pack Qty For Additional Supplier(2)</TableHead>
                <TableHead>French Compliant</TableHead>
                <TableHead>Shippable to Quebec</TableHead>
                <TableHead>Energy Star</TableHead>
                <TableHead>Refurbished</TableHead>
                <TableHead>Consignment</TableHead>
                <TableHead>Software Platform</TableHead>
                <TableHead>Street Date</TableHead>
                <TableHead>Product Warranty Days</TableHead>
                <TableHead>Product Warranty Coverage</TableHead>
                <TableHead>Extended Parts Warranty</TableHead>
                <TableHead>Return Restrictions</TableHead>
                <TableHead>Expiration Date/Lot Number</TableHead>
                <TableHead>Shelf Life</TableHead>
                <TableHead>Data Flag</TableHead>
                <TableHead>Dangerous Product/Material</TableHead>
                <TableHead>For Individual Sale</TableHead>
                <TableHead>FTP Video Location</TableHead>
                <TableHead>Onproof.ca FTP File Location</TableHead>
                <TableHead>Vendor Asset Site URL</TableHead>
                <TableHead>Vendor Asset Site Username & Password</TableHead>
                <TableHead>ETA For Assets</TableHead>
                <TableHead>Product Variants</TableHead>
                <TableHead>Product Overview</TableHead>
                <TableHead>Features and Benefits</TableHead>
                <TableHead>Is In-Store Only BB</TableHead>
                <TableHead>Embargo Date</TableHead>
                <TableHead>Product Condition</TableHead>
                <TableHead>Type (CA-English)</TableHead>
                <TableHead>Features and Benefits</TableHead>
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
                    name="VPN"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="UPC"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="text" pattern="\d{12}" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="secondaryUPC"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="text" pattern="\d{12}" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="unitCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="retailPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="widthBoxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="heightBoxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="lengthBoxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="weightBoxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="widthUnboxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="heightUnboxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="lengthUnboxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="weightUnboxed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="casepack"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="innerpack"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} max={maxInnerpack} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="unitCostAdditional1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="casepackAdditional1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="innerpackAdditional1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} max={maxInnerpack1} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="unitCostAdditional2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="casepackAdditional2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="innerpackAdditional2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} max={maxInnerpack2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name="frenchCompliant"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="shippableToQuebec"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="energyStar"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="refurbished"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="consignment"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="softwarePlatform"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="streetDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-auto pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="productWarrantyDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="30">30</SelectItem>
                              <SelectItem value="45">45</SelectItem>
                              <SelectItem value="60">60</SelectItem>
                              <SelectItem value="90">90</SelectItem>
                              <SelectItem value="120">120</SelectItem>
                              <SelectItem value="180">180</SelectItem>
                              <SelectItem value="182">182</SelectItem>
                              <SelectItem value="270">270</SelectItem>
                              <SelectItem value="365">365</SelectItem>
                              <SelectItem value="548">548</SelectItem>
                              <SelectItem value="730">730</SelectItem>
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
                    name="productWarrantyCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="parts-and-labour">
                                Parts & Labour
                              </SelectItem>
                              <SelectItem value="labour">
                                Labour Only
                              </SelectItem>
                              <SelectItem value="parts">Parts Only</SelectItem>
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
                    name="extendedPartsWarranty"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="returnRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="expirationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exp-date">
                                Expiration Date
                              </SelectItem>
                              <SelectItem value="lot-num">
                                Lot Number
                              </SelectItem>
                              <SelectItem value="both">Both</SelectItem>
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
                    name="shelfLife"
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
                              <SelectItem value="1-to-6">1-6 Months</SelectItem>
                              <SelectItem value="6-to-12">
                                6-12 Months
                              </SelectItem>
                              <SelectItem value="12-to-18">
                                12-18 Months
                              </SelectItem>
                              <SelectItem value="18-to-24">
                                18-24 Months
                              </SelectItem>
                              <SelectItem value="24-plus">
                                24+ Months
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
                    name="dataFlag"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                    name="dangerousProduct"
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
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                  <FormField
                    control={form.control}
                    name="etaForAssets"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-auto pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="productVariants"
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
                    name="productOverview"
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
                    name="featuresAndBenefits"
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
                    name="inStoreOnly"
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
                    name="embargoDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-auto pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="productCondition"
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
                              <SelectItem value="brand-new">
                                Brand New
                              </SelectItem>
                              <SelectItem value="geek-squad-ob">
                                Geek Squad Open Box
                              </SelectItem>
                              <SelectItem value="ob">Open Box</SelectItem>
                              <SelectItem value="ref-excellent">
                                Refurbished Excellent
                              </SelectItem>
                              <SelectItem value="ref-fair">
                                Refurbished Fair
                              </SelectItem>
                              <SelectItem value="ref-good">
                                Refurbished Good
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button type="submit" className="m-4">
            Next
          </Button>
        </form>
      </Form>
    </main>
  );
}
