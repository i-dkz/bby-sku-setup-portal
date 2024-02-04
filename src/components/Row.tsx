import {
  Controller,
  SubmitHandler,
  useForm,
  FieldValues,
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
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


// this function checks if a string is capitalized, used to differentiate between CO4P db values and other values
function isCapitalized(str: string) {
  return str === str.toUpperCase();
}

// this is the row component, rows are dynamically rendered based on selectedNum and all the rows make up a form
export default function Row() {
  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();
  const router = useRouter();

  const [isAdditionalSupplier1, setIsAdditionalSupplier1] = useState(false);
  const [isAdditionalSupplier2, setIsAdditionalSupplier2] = useState(false);
  const [maxInnerpack, setMaxInnerpack] = useState<number>(0);
  const [maxInnerpack1, setMaxInnerpack1] = useState<number>(0);
  const [maxInnerpack2, setMaxInnerpack2] = useState<number>(0);

  type FormData = {
    [key: string]: any;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // these are the names of the attributes in the CO4P database so naming conventions are snakecase
    const formData: FormData = {
      UPC: [],
      UPC_TYPE: ["UPC-A"],
      UPC1: [],
      UPC_TYPE1: [],
      UPC2: [],
      UPC_TYPE2: [],
      MANUFACTURER: [],
      SKU_DESC: [],
      SHORT_DESC: [],
      DEPT: [15],
      CLASS: [6],
      SUBCLASS: [2],
      ZONE_GROUP_ID: [2],
      COST_ZONE_GROUP_ID: [1],
      MERCHANDISE_IND: ["Y"],
      STORE_ORD_MULT: ["C"],
      FORECAST_IND: ["N"],
      ORIGINAL_RETAIL: [],
      RECOMMEND_RETAIL: [],
      FS_PERF_CODE: [],
      BBY_PERF_CODE: [],
      SUPPLIER: [240086],
      UNIT_COST: [],
      VPN: [],
      SUPP_PACK_SIZE: [],
      INNER_PACK_SIZE: [],
      SHIP_CARTON_LEN: [],
      SHIP_CARTON_HGT: [],
      SHIP_CARTON_WID: [],
      SHIP_CARTON_WT: [],
      VENDOR_PROCESSING_TIME: [],
      PRE_ORDER_DAYS: [],
      PVT_LBL: [],
      PVT_LBL_SOURCE: [],
      LEAD_TIME: [7],
      PURCHASE_UOM: ["EA"],
      SUPP_LABEL: [],
      CONSIGNMENT_RATE: [],
      MIN_ORDER_QTY: [],
      MAX_ORDER_QTY: [],
      SUPP_COLOR: [],
      SUPP_SIZE: [],
      SUPPLIER1: [],
      SUPP1_UNIT_COST: [],
      SUPP1_PACK_SIZE: [],
      SUPP1_INNER_PACK_SIZE: [],
      SUPPLIER2: [],
      SUPP2_UNIT_COST: [],
      SUPP2_PACK_SIZE: [],
      SUPP2_INNER_PACK_SIZE: [],
      SUPPLIER3: [],
      SUPP3_UNIT_COST: [],
      SUPP3_PACK_SIZE: [],
      SUPP3_INNER_PACK_SIZE: [],
      SUPPLIER4: [],
      SUPP4_UNIT_COST: [],
      SUPP4_PACK_SIZE: [],
      SUPP4_INNER_PACK_SIZE: [],
      SUPPLIER5: [],
      SUPP5_UNIT_COST: [],
      SUPP5_PACK_SIZE: [],
      SUPP5_INNER_PACK_SIZE: [],
      SUPPLIER6: [],
      SUPP6_UNIT_COST: [],
      SUPP6_PACK_SIZE: [],
      SUPP6_INNER_PACK_SIZE: [],
      SUPPLIER7: [],
      SUPP7_UNIT_COST: [],
      SUPP7_PACK_SIZE: [],
      SUPP7_INNER_PACK_SIZE: [],
      SUPPLIER8: [],
      SUPP8_UNIT_COST: [],
      SUPP8_PACK_SIZE: [],
      SUPP8_INNER_PACK_SIZE: [],
      SUPPLIER9: [],
      SUPP9_UNIT_COST: [],
      SUPP9_PACK_SIZE: [],
      SUPP9_INNER_PACK_SIZE: [],
      SKU_TYPE: ["MERCH"],
      SKU_OWNER: ["S"],
      ENT_STREET_DATE: [],
      PRE_BOOKED_IND: ["N"],
      PB_START_DATE: [],
      PB_END_DATE: [],
      SOFTWARE_RATING: [],
      SOFTWARE_PLATFORM: [],
      BRAND_NAME: [],
      MODEL_NO: [],
      PRODUCT_TYPE: ["R"],
      DELIVERABLE: ["N"],
      WARRANTY_FLAG: ["Y"],
      ACCESSORY: [],
      SERIAL_REQUIRED: ["N"],
      SERIALIZED_FORMAT: [],
      ENT_CFG_CODE: [],
      ENT_RELATIVE_SIZE: [],
      RETURN_RESTRICTIONS_FS: ["N/A"],
      IMPART_INFO_SHOPPER: ["N"],
      S_UNIT_HEIGHT: [],
      S_UNIT_WIDTH: [],
      S_UNIT_LENGTH: [],
      S_UNIT_WEIGHT: [],
      ENT_ARTIST_ID: [],
      CSP_TERM: [],
      CSP_TYPE: [],
      PSP_ACTIVE: [],
      PSP_PRP_TYPE: [],
      BUNDLE_IND: [],
      CAN_MANUFACTURER_WARRANTY: ["N/A"],
      EXT_PARTS_WARRANTY: ["N/A"],
      MAKE: ["N/A"],
      PEG_HOOK_FLAG: ["N"],
      SKU_MARKET: ["B"],
      NON_INVENTORY_SKU_TYPE: ["N"],
      SERVICE_APPLICABLE_FLAG: [],
      MIN_LAYAWAY_DEPOSIT: [20],
      CSP_LOWEST_PRICE: [],
      CSP_HIGHEST_PRICE: [],
      AVAILABLE_FOR_SALE: [],
      ASSESSMENT_REQUIRED: [],
      CSP_POLICY: [],
      SP1: [],
      LOCALLY_INVENTORIED_PRODUCT: [],
      THIRD_PARTY_IND: [],
      SKU_SELL_UOM: ["EACH"],
      ES_LABEL_NAME: [],
      ES_LABEL_ID: [],
      FS_IN_STOCK_DATE: [],
      FS_OUT_OF_STOCK_DATE: [],
      BBY_IN_STOCK_DATE: [],
      BBY_OUT_OF_STOCK_DATE: [],
      AUTO_DESTABLE: [],
      RELATED_SKU1: [],
      RELATED_SKU2: [],
      COMPULSORY_KIT_FLAG: [],
      BIN_NO: [],
      SERVICEABLE_EXTERNALLY: [],
      MANUFACTURER_WARRANTY: ["N"],
      BRAND_TYPE: ["S"],
      NO_DISCOUNT: ["N"],
      STAFF_PURCHASE_ALLOWED: ["Y"],
      DELETE_FLAG: [],
      FRENCH_COMPLIANT: [],
      AUTHORIZED_FOR_SALE: ["Y"],
      LAYAWAY_DEPOSIT_ALLOWED: ["Y"],
      ENERGY_STAR: ["Y"],
      ALLOW_QTY_OVERRIDE: ["Y"],
      MAX_QTY_ALLOWED: [],
      PRICE_ENTRY_REQUIRED: ["N"],
      RAINCHECK_ALLOWED: ["Y"],
      RA_RETURN_POLICY_DAYS: [30],
      RA_PRICE_MATCH_POLICY_DAYS: [30],
      RA_SUPPORT_MNF_WRNTY: ["N"],
      RA_SERVICE_UNDER_MNF_WRNTY: ["Y"],
      RA_SERVICE_OUTSIDE_MNF_WRNTY: ["Y"],
      RA_RTV_DEFECTIVE_DAYS: [0],
      RA_RTV_OB_DAYS: [0],
      RA_RESELL_AS_OB: ["Y"],
      RA_PRODUCT_WRNTY_DAYS: [],
      RA_SUPPLIER_CONTACT: [8886783688],
      RA_PRIVACY_INSTRUCTION_CODE: [3],
      RA_RETURNABLE: ["Y"],
      RA_OB_RETURNABLE: ["Y"],
      RA_TECH_CHECK_LEVEL: [1],
      RA_ALERT_INFORMATION: [],
      RA_SERIAL_REQ_FOR_RETURN: ["N"],
      RA_SERIAL_REQ_FOR_RTV: ["N"],
      RA_ALL_ACCESS_REQ_FOR_RTV: ["N"],
      RA_REQUIRED_COMPONENTS: [],
      RA_RESTOCK_FEE_PCT: [0],
      RA_RAPID_EXCHANGEABLE: ["N"],
      RA_RESELL: ["Y"],
      RA_ALWAYS_RTV: ["N"],
      RA_PROCESS_AT_MEDIA_DC: ["N"],
      RA_LIQUIDATEABLE: ["N"],
      RA_MUST_RECYCLE: ["N"],
      RA_DISPOSE_IN_STORE: ["N"],
      RA_RUN_DISPOSITION: ["Y"],
      RA_RAPID_REPAIR_PSP: ["Y"],
      RA_RAPID_REPAIR_WARRANTY: ["Y"],
      RA_RAPID_REPAIR_FEE: ["Y"],
      PROVINCE: [],
      IN_STOCK_DATE: [],
      OUT_OF_STOCK_DATE: [],
      TAG_TYPE: [],
      POACHABLE_IND: [],
      RA_SERV_STKUNIT_UNDRMNF_WRNTY: ["Y"],
      PRESELL_AMT: [],
      RA_DEPOT_RTV: ["N"],
      ADD_STORES: ["Y"],
      LOC_TRAIT: [],
      MFG_TECH_SUPPORT_TERM: [0],
      CARRY_IN_WARRANTY_DAYS: [365],
      ON_SITE_WARRANTY_DAYS: [0],
      PARTS_WARRANTY_DAYS: [365],
      STATIC_BUFFER_VALUE: [0],
      DYNAMIC_BUFFER_PERCENT: [0],
      APPROVAL_REQUIRED_SALE: ["N"],
      APPROVAL_REQUIRED_RETURN: ["N"],
      SIGNATURE_CAPTURE: ["N"],
      NO_RECEIPT_RETURN_ALLOWED: ["Y"],
      REPORTING_DEPT: [],
      POSA_VENDOR: [],
      ACTIVATEINPIM: ["Y"],
      STEP_ID: [],
      CUST_EMAIL_REQUIRED: [],
      MFG_WARRANTY_OVERLAP: ["N"],
      AD_COVERAGE: ["N"],
      FF_RTV_DAYS: [],
    };

    Object.keys(formData).forEach((key) => {
      const currentValue = formData[key];

      // check if the key has a default value, if yes, add default values to match the number of rows
      if (currentValue.length === 1) {
        const diff = selectedNum - currentValue.length;

        // Duplicate the values to match selectedNum
        formData[key] = [...currentValue, ...Array(diff).fill(currentValue[0])];
      }
    });

    // matching the data collected from the form to the db attribute
    Object.keys(data).forEach((key) => {
      if (isCapitalized(key)) {
        const splitKey = key.split("-")[0];

        // Format date values before pushing to the array
        if (splitKey === "ENT_STREET_DATE" && isValid(data[key])) {
          formData[splitKey].push(format(data[key], "yyyyMMddHHmmss"));
        } else {
          formData[splitKey].push(data[key]);
        }
      }
    });

    exportToCSV(formData);
    // Handle any other form submission logic here
    router.push("./compliance")
  };

  // function takes the form data passes to convertToCSV function to get csv format, then passes to downloadCSV function
  const exportToCSV = (data: FormData) => {
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, "I416NS_zflentge1.csv");
  };

  // function assigns the headers, then takes the values arrays and based on selectedNum, creates a comma separated string
  // once the end is reached, a newline is appended to the end of the string
  // then it returns the concatenated csv string of headers and values
  const convertToCSV = (data: FormData) => {
    const headers = Object.keys(data);
    const values = Object.values(data);

    let str: string = "";

    Array.from({ length: selectedNum }).map((_, index) =>
      values.forEach((val) => {
        if (val[index] === undefined) {
          str += "" + ",";
        } else {
          str += val[index] + ",";
        }
      }, (str += "\n"))
    );

    const csvRows = [headers.join(","), str.trim()];
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
    <form onSubmit={handleSubmit(onSubmit)} name="myForm" id="myForm" className="flex">
      
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex h-[20px] justify-center border-r border-b text-xs font-bold">SKU {index + 1}</div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`VPN-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SHORT_DESC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SKU_DESC-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
              name={`UPC1-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
              name={`BRAND_NAME-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`MODEL_NO-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`MANUFACTURER-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  maxLength={20}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`UNIT_COST-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`ORIGINAL_RETAIL-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SHIP_CARTON_WID-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SHIP_CARTON_HGT-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SHIP_CARTON_LEN-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SHIP_CARTON_WT-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`S_UNIT_WIDTH-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`S_UNIT_HEIGHT-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`S_UNIT_LENGTH-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`S_UNIT_WEIGHT-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SUPP_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required
                  min={0}
                  onChange={(e) => {
                    setMaxInnerpack(parseInt(e.target.value));
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`INNER_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
              name={`SUPP1_UNIT_COST-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  min={0}
                  onChange={(e) => setIsAdditionalSupplier1(!!e.target.value)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SUPP1_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required={isAdditionalSupplier1}
                  min={0}
                  onChange={(e) => {
                    setMaxInnerpack1(Number(e.target.value));
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SUPP1_INNER_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
              name={`SUPP2_UNIT_COST-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  min={0}
                  onChange={(e) => setIsAdditionalSupplier2(!!e.target.value)}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SUPP2_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required={isAdditionalSupplier2}
                  min={0}
                  onChange={(e) => {
                    setMaxInnerpack2(Number(e.target.value));
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SUPP2_INNER_PACK_SIZE-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  required={isAdditionalSupplier2}
                  min={0}
                  max={maxInnerpack2}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r" >
            <Controller
              control={control}
              name={`FRENCH_COMPLIANT-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px] z-1">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
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
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`ENERGY_STAR-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
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
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
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
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`SOFTWARE_PLATFORM-${index}`}
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
                    <SelectItem value="MAC">MAC_MAC</SelectItem>
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
                    <SelectItem value="WIN">WINDOWS_WIN</SelectItem>
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
              name={`ENT_STREET_DATE-${index}`}
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
                      onSelect={(date) => field.onChange(date)}
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
              name={`RA_PRODUCT_WRNTY_DAYS-${index}`}
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
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
                  min={0}
                  maxLength={256}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`RETURN_RESTRICTIONS_FS-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal border rounded-md w-[180px]"
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
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      ))}
      
    </form>
  );
}
