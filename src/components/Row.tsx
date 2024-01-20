import {
  Controller,
  SubmitHandler,
  useForm,
  FieldValues,
  useWatch,
} from "react-hook-form";
import { Button } from "./ui/button";
import { useNumStore } from "@/store/NumStore";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FormData {
  VPN: string;
  shortDescription: string;
  longDescription: string;
  UPC: string;
  secondaryUPC: string;
  brand: string;
  model: string;
  manufacturer: string;
  unitCost: number;
  boxedWidth: number;
  boxedHeight: number;
  boxedLength: number;
  boxedWeight: number;
  unboxedWidth: number;
  unboxedHeight: number;
  unboxedLength: number;
  unboxedWeight: number;
  casepack: number;
  innerpack: number;
  additionalUnitCost1: number;
  additionalCasepack1: number;
  additionalInnerpack1: number;
  additionalUnitCost2: number;
  additionalCasepack2: number;
  additionalInnerpack2: number;
  frenchCompliant: string;
  shippableToQuebec: string;
  energyStar: string;
  refurbished: string;
  consignment: string;
  softwarePlatform: string;
  productWarrantyDays: string;
  productWarrantyCoverage: string;
  extendedPartsWarranty: string;
  returnRestrictions: string;
  expirationDateLotNum: string;
  shelfLife: string;
  dataFlag: string;
  dangerousProduct: string;
}

export default function Row() {
  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();

  const [isAdditionalSupplier1, setIsAdditionalSupplier1] = useState(false);
  const [isAdditionalSupplier2, setIsAdditionalSupplier2] = useState(false);
  const [maxInnerpack, setMaxInnerpack] = useState<number>(0);
  const [maxInnerpack1, setMaxInnerpack1] = useState<number>(0);
  const [maxInnerpack2, setMaxInnerpack2] = useState<number>(0);

  const updateMaxInnerpack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxInnerpack(Number(value));
  };
  const updateMaxInnerpack1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxInnerpack1(Number(value));
  };
  const updateMaxInnerpack2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxInnerpack2(Number(value));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data); // Handle your form submission logic here
    console.log(data["VPN-0"]);

    const formData: FormData = {
      VPN: data["VPN-0"],
      shortDescription: data["shortDescription-0"],
      longDescription: data["longDescription-0"],
      UPC: data["UPC-0"],
      secondaryUPC: data["secondaryUPC-0"],
      brand: data["brand-0"],
      model: data["model-0"],
      manufacturer: data["manufacturer-0"],
      unitCost: data["unitCost-0"],
      boxedWidth: data["boxedWidth-0"],
      boxedHeight: data["boxedHeight-0"],
      boxedLength: data["boxedLength-0"],
      boxedWeight: data["boxedWeight-0"],
      unboxedWidth: data["unboxedWidth-0"],
      unboxedHeight: data["unboxedHeight-0"],
      unboxedLength: data["unboxedLength-0"],
      unboxedWeight: data["unboxedWeight-0"],
      casepack: data["casepack-0"],
      innerpack: data["innerpack-0"],
      additionalUnitCost1: data["additionalUnitCost1-0"],
      additionalCasepack1: data["additionalCasepack1-0"],
      additionalInnerpack1: data["additionalInnerpack1-0"],
      additionalUnitCost2: data["additionalUnitCost2-0"],
      additionalCasepack2: data["additionalCasepack2-0"],
      additionalInnerpack2: data["additionalInnerpack2-0"],
      frenchCompliant: data["frenchCompliant-0"],
      shippableToQuebec: data["shippableToQuebec-0"],
      energyStar: data["energyStar-0"],
      refurbished: data["refurbished-0"],
      consignment: data["consignment-0"],
      softwarePlatform: data["softwarePlatform-0"],
      productWarrantyDays: data["productWarrantyDays-0"],
      productWarrantyCoverage: data["productWarrantyCoverage-0"],
      extendedPartsWarranty: data["extendedPartsWarranty-0"],
      returnRestrictions: data["returnRestrictions-0"],
      expirationDateLotNum: data["expirationDateLotNum-0"],
      shelfLife: data["shelfLife-0"],
      dataFlag: data["dataFlag-0"],
      dangerousProduct: data["dangerousProduct-0"],
    };

    exportToCSV(formData);
    // Handle any other form submission logic here
  };

  const exportToCSV = (data: FormData) => {
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, "I416NS_zflentge093248234.csv");
  };

  const convertToCSV = (data: FormData) => {
    const headers = Object.keys(data);
    const values = Object.values(data);
    const csvRows = [headers.join(","), values.join(",")];
    return csvRows.join("\n");
  };

  const downloadCSV = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="myForm">
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex w-[10000px]" key={index}>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
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
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
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
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`longDescription-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  maxLength={40}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
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
                  pattern="\d+" // Use the \d+ regex pattern to allow only digits
                  title="Please enter only digits"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`secondaryUPC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-32 h-8 px-2 font-normal border rounded-md"
                  minLength={12}
                  maxLength={13}
                  pattern="\d+" // Use the \d+ regex pattern to allow only digits
                  title="Please enter only digits"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
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
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
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
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`manufacturer-${index}`}
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
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`unitCost-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`retailPrice-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`boxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`boxedHeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`boxedLength-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`boxedWeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`unboxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`unboxedHeight-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`unboxedLength-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`unboxedWidth-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`casepack-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                  onChange={(e) => updateMaxInnerpack(e)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`innerpack-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required
                  min={0}
                  max={maxInnerpack}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalUnitCost1-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  min={0}
                  onChange={(e) => setIsAdditionalSupplier1(!!e.target.value)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalCasepack1-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required={isAdditionalSupplier1}
                  min={0}
                  onChange={(e) => {
                    updateMaxInnerpack1(e);
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalInnerpack1-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required={isAdditionalSupplier1}
                  min={0}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  max={maxInnerpack1}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalUnitCost2-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  min={0}
                  onChange={(e) => setIsAdditionalSupplier2(!!e.target.value)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalCasepack2-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required={isAdditionalSupplier2}
                  min={0}
                  onChange={(e) => updateMaxInnerpack2(e)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`additionalInnerpack2-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  required={isAdditionalSupplier2}
                  min={0}
                  max={maxInnerpack2}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`frenchCompliant-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`shippableToQuebec-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`energyStar-${index}`}
              render={({ field }) => (
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
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`refurbished-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`consignment-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`softwarePlatform-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3d-blu-ray-combo">
                      3D Blu-ray Combo_3DBRC
                    </SelectItem>
                    <SelectItem value="3d-blu-ray">3D Blu-ray_3DBR</SelectItem>
                    <SelectItem value="4k">4KUHD_4KUHD</SelectItem>
                    <SelectItem value="android">ANDROID_ANDR</SelectItem>
                    <SelectItem value="blu-ray-combo">
                      Blu-ray Combo_BRC
                    </SelectItem>
                    <SelectItem value="blu-ray">Blu-ray_BR</SelectItem>
                    <SelectItem value="dvd">DVD_DVD</SelectItem>
                    <SelectItem value="ios">iOS_iOS</SelectItem>
                    <SelectItem value="linux">Linux_LINUX</SelectItem>
                    <SelectItem value="mac">MAC_MAC</SelectItem>
                    <SelectItem value="micro-sim">Micro SIM_SIMM</SelectItem>
                    <SelectItem value="mini-sim">Mini SIM_SIMI</SelectItem>
                    <SelectItem value="nano-sim">Nano SIM_SIMN</SelectItem>
                    <SelectItem value="nintendo-switch">
                      Nintendo Switch_SWITCH
                    </SelectItem>
                    <SelectItem value="pc-mac">PC / MAC_PCMAC</SelectItem>
                    <SelectItem value="pc">PC Games_PC</SelectItem>
                    <SelectItem value="ps4">Playstation 4_PS4</SelectItem>
                    <SelectItem value="ps5">Playstation 5_PS5</SelectItem>
                    <SelectItem value="windows">WINDOWS_WIN</SelectItem>
                    <SelectItem value="xbox-one">XBOX One_XBOX1</SelectItem>
                    <SelectItem value="xbox">XBOX_XBOX</SelectItem>
                    <SelectItem value="xbox-x">XBOX Series X_XBOXX</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`streetDate-${index}`}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[85%] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`productWarrantyDays-${index}`}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={"365"}>
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
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`productWarrantyCoverage-${index}`}
              render={({ field }) => (
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
                    <SelectItem value="labour">Labour Only</SelectItem>
                    <SelectItem value="parts">Parts Only</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`extendedPartsWarranty-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  min={0}
                  maxLength={256}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`returnRestrictions-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-8 px-2 font-normal border rounded-md w-36"
                  min={0}
                  maxLength={256}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`expirationDateLotNum-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exp-date">Expiration Date</SelectItem>
                    <SelectItem value="lot-num">Lot Number</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`shelfLife-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-to-6">1-6 Months</SelectItem>
                    <SelectItem value="6-to-12">6-12 Months</SelectItem>
                    <SelectItem value="12-to-18">12-18 Months</SelectItem>
                    <SelectItem value="18-to-24">18-24 Months</SelectItem>
                    <SelectItem value="24-plus">24+ Months</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`dataFlag-${index}`}
              render={({ field }) => (
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
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`dangerousProduct-${index}`}
              render={({ field }) => (
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
              )}
            />
          </div>
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}