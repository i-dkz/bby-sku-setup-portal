"use client";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const headers = {
  "Vendor Part Number": "Maximum 20 characters",
  "Description (Short)": "Maximum 20 characters",
  "Description (Long)": "Maximum 40 characters",
  "UPC": "12 or 13 digits only",
  "Secondary UPC": "12 or 13 digits only",
  "Brand": "Maximum 20 characters",
  "Model": "Maximum 20 characters",
  "Manufacturer": "Maximum 20 characters",
  "Unit Cost": "Must be greater than 0",
  "Retail Price": "Must be greater than 0",
  "Width (Boxed)": "Must be greater than 0",
  "Height (Boxed)": "Must be greater than 0",
  "Length (Boxed)": "Must be greater than 0",
  "Weight (Boxed)": "Must be greater than 0",
  "Width (Unboxed)": "Must be greater than 0",
  "Height (Unboxed)": "Must be greater than 0",
  "Length (Unboxed)": "Must be greater than 0",
  "Weight (Unboxed)": "Must be greater than 0",
  "Casepack": "Must be greater than 0",
  "Innerpack": "Must be greater than 0. Cannot exceed casepack",
  "Unit Cost For Additional Supplier(1)": "(Optional) Must be greater than 0",
  "Case Pack Qty For Additional Supplier(1)": "(Optional) Must be greater than 0",
  "Inner Pack Qty For Additional Supplier(1)": "(Optional) Must be greater than 0",
  "Unit Cost For Additional Supplier(2)": "(Optional) Must be greater than 0",
  "Case Pack Qty For Additional Supplier(2)": "(Optional) Must be greater than 0",
  "Inner Pack Qty For Additional Supplier(2)": "(Optional) Must be greater than 0",
  "French Compliant": "Choose Yes or No",
  "Shippable To Quebec": "If french compliant, leave blank. Choose Yes or No",
  "Energy Star": "(Optional) Choose Yes or No",
  "Refurbished": "(Required) Choose Yes or No",
  "Consignment": "(Required) Choose Yes or No",
  "Software Platform": "(Optional) Select from list of values",
  "Street Date": "(Optional) Choose a future street date",
  "Product Warranty Days": "(Required) Select from list of values",
  "Product Warranty Coverage": "(Required) Select from list of values",
  "Extended Parts Warranty": "(Optional) Max 255 characters",
  "Return Restrictions": "(Optional) Max 255 characters",
  "Expiration Date/Lot Number": "(Optional) Select from list of values",
  "Shelf Life": "(Optional) Select from list of values",
  "Data Flag": "(Required) Select Yes or No",
  "Dangerous Product/Material": "(Required) Select Yes or No",
};

export default function Example() {
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
        <Row></Row>
      </div>
    </main>
  );
}
