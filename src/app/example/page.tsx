"use client";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";

const headers = [
  "Vendor Part Number",
  "Description (Short)",
  "Description (Long)",
  "UPC",
  "Secondary UPC",
  "Brand",
  "Model",
  "Manufacturer",
  "Unit Cost",
  "Retail Price",
  "Width (Boxed)",
  "Height (Boxed)",
  "Length (Boxed)",
  "Weight (Boxed)",
  "Width (Unboxed)",
  "Height (Unboxed)",
  "Length (Unboxed)",
  "Weight (Unboxed)",
  "Casepack",
  "Innerpack",
  "Unit Cost For Additional Supplier(1)",
  "Case Pack Qty For Additional Supplier(1)",
  "Inner Pack Qty For Additional Supplier(1)",
  "Unit Cost For Additional Supplier(2)",
  "Case Pack Qty For Additional Supplier(2)",
  "Inner Pack Qty For Additional Supplier(2)",
  "French Compliant",
  "Shippable To Quebec",
  "Energy Star",
  "Refurbished",
  "Consignment",
  "Software Platform",
  "Street Date",
  "Product Warranty Days",
  "Product Warranty Coverage",
  "Extended Parts Warranty",
  "Return Restrictions",
  "Expiration Date/Lot Number",
  "Shelf Life",
  "Data Flag",
  "Dangerous Product/Material",
];

export default function Example() {
  
  return (
    <main>
      <div className="z-10 flex">
        <div className="sticky left-0 z-40 flex flex-col flex-shrink-0 overflow-x-auto text-sm font-medium text-primary">
        
          {headers.map((item, index) => (
            <div
              className="flex items-center justify-center w-56 h-20 text-center border-b border-accent-foreground bg-secondary"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
        <Row></Row>
      </div>
    </main>
  );
}
