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
  "Case Pack Qty For Additional Supplier(1)":
    "(Optional) Must be greater than 0",
  "Inner Pack Qty For Additional Supplier(1)":
    "(Optional) Must be greater than 0",
  "Unit Cost For Additional Supplier(2)": "(Optional) Must be greater than 0",
  "Case Pack Qty For Additional Supplier(2)":
    "(Optional) Must be greater than 0",
  "Inner Pack Qty For Additional Supplier(2)":
    "(Optional) Must be greater than 0",
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

const vendor = localStorage.getItem("vendor");
const category = localStorage.getItem("category");
const numOfSKUs = localStorage.getItem("numOfSKUs");

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  document.getElementById("toggle").addEventListener("click", function (e) {
    body.classList.toggle("dark");
  });
});

const heads = document.getElementById("headers");

Object.entries(headers).map(([key, value]) => [
  (heads.innerHTML += `<div class="flex bg-secondary text-sm font-medium items-center px-4 border-b border-r h-[60px] ">${key}</div>`),
]);

