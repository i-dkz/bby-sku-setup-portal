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
import * as pdfjsLib from "pdfjs-dist";
// import 'pdfjs-dist/build/pdf.worker.entry';




import { cn } from "@/lib/utils";

const formats = {
  "Lithium Ion": [
    "AA",
    "AAA",
    "C",
    "D",
    "9V",
    "Lantern",
    "CR-V3",
    "CR-P2 (CR-P2/5024LC)",
    "2CR5 (2CR5/5032LC)",
    "CR2 (CR17355/5046LC)",
    "CR123A",
    "CR123A (CR17345/5018LC)",
    "RCR123A",
    "RCR123",
    "RCR-V3",
    "OTHER",
  ],
};
// this is the row component, rows are dynamically rendered based on selectedNum and all the rows make up a form
export default function ComplianceCol() {
  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();
  const [fileInputValue, setFileInputValue] = useState("");

  type FormData = {
    [key: string]: any;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // these are the names of the attributes in the CO4P database so naming conventions are snakecase
    const formData: FormData = {
      BATTERY_TYPE: [],
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
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // pdfjsLib.GlobalWorkerOptions.workerSrc =
    // '../../node_modules/pdfjs-dist/build/pdf.worker.mjs';

    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.error("No file selected.");
      return;
    }
  
    const file = fileInput.files[0];
  
    if (file) {
        setFileInputValue(file.name); // or any other property you want to display
    
        // Use FileReader to read the contents of the file as ArrayBuffer
        const reader = new FileReader();
    
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const pdfData = event.target.result as ArrayBuffer;
    
            // Log the ArrayBuffer contents
            console.log(new Uint8Array(pdfData));
    
            // If you want to convert it to a string and display it
            const text = new TextDecoder().decode(new Uint8Array(pdfData));
            console.log(text);
          }
        };
    
        // Read the file as ArrayBuffer
        reader.readAsArrayBuffer(file);
      

    // try {
    //   const pdfData = await file.arrayBuffer();
    //   const loadingTask = pdfjsLib.getDocument(pdfData);

    //   loadingTask.promise.then(async function (pdf) {
    //     const page = await pdf.getPage(1);

    //     // Extract text from the PDF
    //     const textContent = await page.getTextContent();
    //     const textItems = textContent.items.map((item) => {
    //         if ('str' in item) {
    //           return item.str;
    //         } else if ('textContent' in item) {
    //           return item.textContent;
    //         }
    //         return '';
    //       });
    //     const extractedText = textItems.join(' ');

    //     // Log the extracted text to the console
    //     console.log('Extracted Text:', extractedText);
    //   });
    // } catch (error) {
    //   console.error('Error loading PDF:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      name="complianceForm"
      id="complianceForm"
      className="flex"
    >
      {Array.from({ length: selectedNum }).map((_, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex h-[20px] justify-center border-r border-b text-xs font-bold">
            SKU {index + 1}
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`BATTERY_TYPE-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alkaline-battery">
                      Alkaline Battery
                    </SelectItem>
                    <SelectItem value="alkaline-coin-button">
                      Alkaline Coin/Button
                    </SelectItem>
                    <SelectItem value="lead-acid">Lead-Acid</SelectItem>
                    <SelectItem value="lithium-carbon">
                      Lithium Carbon Flouride (Li-CFx)
                    </SelectItem>
                    <SelectItem value="lithium-coin">
                      Lithium Coin/Button
                    </SelectItem>
                    <SelectItem value="lithium-iron-disulfide">
                      Lithium Iron Disulfide (LiFe2)
                    </SelectItem>
                    <SelectItem value="lithium-iron-phosphate">
                      Lithium iron phosphate (LiFePO4)
                    </SelectItem>
                    <SelectItem value="lithium-cobalt">
                      Lithium-cobalt (LiCoO2)
                    </SelectItem>
                    <SelectItem value="lithium-ion">
                      Lithium-Ion Battery
                    </SelectItem>
                    <SelectItem value="lithium-manganese">
                      Lithium-manganese(LiMn204)
                    </SelectItem>
                    <SelectItem value="lithium-manganese-dioxide">
                      Lithium-manganese(LiMn204)
                    </SelectItem>
                    <SelectItem value="lithium-polymer">
                      Lithium-Polymer
                    </SelectItem>
                    <SelectItem value="manganese-titanium-lithium">
                      Manganese Titanium Lithium
                    </SelectItem>
                    <SelectItem value="nickel-cadmium">
                      Nickel-Cadmium (NiCd)
                    </SelectItem>
                    <SelectItem value="nickel-metal-hydride">
                      Nickel-Metal Hydride (NiMH)
                    </SelectItem>
                    <SelectItem value="silver-oxide-coin">
                      Silver Oxide Coin/Button
                    </SelectItem>
                    <SelectItem value="zinc-air-coin">
                      Zinc Air Coin/Button
                    </SelectItem>
                    <SelectItem value="zinc-carbon">Zinc Carbon</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`size_format-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(formats).map(([type, sizes]) => (
                      <div key={type}>
                        {sizes.map((size, index) => (
                          <SelectItem key={index} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`quantity-${index}`}
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
              name={`hazmat_id-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(formats).map(([type, sizes]) => (
                      <div key={type}>
                        {sizes.map((size, index) => (
                          <SelectItem key={index} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`batteries_in-${index}`}
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
              name={`batteries_out-${index}`}
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
              name={`cells-${index}`}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Multi">Multiple</SelectItem>
                    <SelectItem value="Single">Single</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-56 h-20 border-b border-r">
            <Controller
              control={control}
              name={`lithium_content-${index}`}
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
              name={`watt_hours-${index}`}
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
              name={`battery_weight-${index}`}
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
              name={`msds-${index}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-[35px] px-2 font-normal text-xs border rounded-md w-[180px] "
                  required
                  type="file"
                  id="fileInput"
                  accept=".pdf"
                  onChange={(e) => handleChange(e)}

                />
              )}
            />
          </div>
        </div>
      ))}
    </form>
  );
}
