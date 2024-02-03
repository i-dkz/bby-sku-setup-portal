// "use client";
// import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
// import React, { useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const formSchema = z.object({
//   batteryType: z.string().min(1, {
//     message: "Battery Type required.",
//   }),
//   hazmatID: z.string().min(1).max(4),
//   wattHours: z.string(),
//   batteryWeight: z.string().min(1),
// });

// export default function Compliance() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       batteryType: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.

//     console.log(values.batteryType);
//   }

//   const handleSub = (e: React.FormEvent) => {
//     e.preventDefault();

//     // const input = document.getElementById("fileInput") as HTMLInputElement;
//     // const file = input.files?.[0];

//     // if (file) {
//     //   console.log("File uploaded:",typeof file);
//     //   // You can perform further actions with the uploaded file here
//     // } else {
//     //   console.error("No file selected");
//     // }

//     // // extractTextFromPDF(file

//   };

//   return (
//     <main>
//       <form onSubmit={handleSub}>
//         <input
//           type="file"
//           id="fileInput"
//           name="fileInput"
//           className="m-4"
//         ></input>
//         <Button onClick={handleSub}>Upload MSDS</Button>
//       </form>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <Table className="flex flex-col">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>UPC</TableHead>
//                 <TableHead>Battery Type</TableHead>
//                 <TableHead>Hazmat ID</TableHead>
//                 <TableHead>Watt Hours</TableHead>
//                 <TableHead>Battery Net Weight</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 <TableCell>1010101010101</TableCell>
//                 <TableCell>
//                   <FormField
//                     control={form.control}
//                     name="batteryType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <SelectTrigger className="w-[180px]">
//                               <SelectValue placeholder="" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="alkaline-battery">
//                                 Alkaline Battery
//                               </SelectItem>
//                               <SelectItem value="alkaline-coin-button">
//                                 Alkaline Coin/Button
//                               </SelectItem>
//                               <SelectItem value="lead-acid">
//                                 Lead-Acid
//                               </SelectItem>
//                               <SelectItem value="lithium-carbon">
//                                 Lithium Carbon Flouride (Li-CFx)
//                               </SelectItem>
//                               <SelectItem value="lithium-coin">
//                                 Lithium Coin/Button
//                               </SelectItem>
//                               <SelectItem value="lithium-iron-disulfide">
//                                 Lithium Iron Disulfide (LiFe2)
//                               </SelectItem>
//                               <SelectItem value="lithium-iron-phosphate">
//                                 Lithium iron phosphate (LiFePO4)
//                               </SelectItem>
//                               <SelectItem value="lithium-cobalt">
//                                 Lithium-cobalt (LiCoO2)
//                               </SelectItem>
//                               <SelectItem value="lithium-ion">
//                                 Lithium-Ion Battery
//                               </SelectItem>
//                               <SelectItem value="lithium-manganese">
//                                 Lithium-manganese(LiMn204)
//                               </SelectItem>
//                               <SelectItem value="lithium-manganese-dioxide">
//                                 Lithium-manganese(LiMn204)
//                               </SelectItem>
//                               <SelectItem value="lithium-polymer">
//                                 Lithium-Polymer
//                               </SelectItem>
//                               <SelectItem value="manganese-titanium-lithium">
//                                 Manganese Titanium Lithium
//                               </SelectItem>
//                               <SelectItem value="nickel-cadmium">
//                                 Nickel-Cadmium (NiCd)
//                               </SelectItem>
//                               <SelectItem value="nickel-metal-hydride">
//                                 Nickel-Metal Hydride (NiMH)
//                               </SelectItem>
//                               <SelectItem value="silver-oxide-coin">
//                                 Silver Oxide Coin/Button
//                               </SelectItem>
//                               <SelectItem value="zinc-air-coin">
//                                 Zinc Air Coin/Button
//                               </SelectItem>
//                               <SelectItem value="zinc-carbon">
//                                 Zinc Carbon
//                               </SelectItem>
//                               <SelectItem value="other">Other</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <FormField
//                     control={form.control}
//                     name="hazmatID"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <SelectTrigger className="w-[180px]">
//                               <SelectValue placeholder="" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="3480">3480</SelectItem>
//                               <SelectItem value="3481">3481</SelectItem>
//                               <SelectItem value="3090">3090</SelectItem>
//                               <SelectItem value="3091">3091</SelectItem>
//                               <SelectItem value="3171">3171</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <FormField
//                     control={form.control}
//                     name="wattHours"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <FormField
//                     control={form.control}
//                     name="batteryWeight"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//           <Button type="submit" className="m-4">
//             Submit
//           </Button>
//         </form>
//       </Form>
//     </main>
//   );
// }

"use client";
import ComplianceCol from "@/components/ComplianceCol";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const headers = {
  "Battery Type": "Select from list of values",
  "Size/Format" : "Select from list of values",
  "*Qty (total no. of batteries for this type)": "Enter a number",
  "HAZMAT UN# (4 Digits)": "Select from list of values",
  "# of Batteries in Product (inside)": "Enter a number",
  "# of Batteries out of Product (outside)": "Enter a number",
  "Cells in Lithium (single or multiple)": "Select from list of values",
  "# Lithium Content (Primary) (grams)": "Required for lithium metal batteries",
  "Watt Hours": "Required for lithium ion batteries",
  "Individual Li Battery Net Weight (kg)": "Enter a number"
};

export default function Compliance() {
  return (
    <main>
      <div className="z-10 flex w-[10000px]">
        <div className="sticky left-0 z-40 flex flex-col flex-shrink-0 w-auto overflow-x-auto text-sm font-medium text-primary">
          <div className="h-[20px] bg-secondary border-b border-primary-foreground"></div>
          {Object.entries(headers).map(([key, value]) => (
            <div
              className="sticky left-0 flex items-center justify-between w-56 h-20 p-4 border-b border-primary-foreground bg-secondary"
              key={key}
            >
              {key}
              <div className="w-[20px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="p-0 h-[20px] w-[20px]">?</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{value}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
        <ComplianceCol />
      </div>
    </main>
  );
}
