import {
  Controller,
  SubmitHandler,
  useForm,
  FieldValues,
} from "react-hook-form";
import { Button } from "./ui/button";
import { useNumStore } from "@/store/NumStore";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { pdfjs } from "react-pdf";
import { useState } from "react";
import { batteryTypes, formats, unCodes } from "@/data/complianceData";
import apiCall from "../API.mjs";

// this is the column component, columns are dynamically rendered based on selectedNum and all the columns make up a form
export default function ComplianceCol() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const { selectedNum } = useNumStore();
  const { handleSubmit, control } = useForm();
  const [batteryType, setBatteryType] = useState("");
  const [wattHoursArray, setWattHoursArray] = useState<string[]>(
    Array(selectedNum).fill("")
  );
  const [lithiumContentArray, setLithiumContentArray] = useState<string[]>(
    Array(selectedNum).fill("")
  );
  const [battTypeArray, setBattTypeArray] = useState<string[]>(
    Array(selectedNum).fill("")
  );
  const [weightArray, setWeightArray] = useState<string[]>(
    Array(selectedNum).fill("")
  );

  // Function handles setting the watt hour state for only the column that is being updated
  const handleWattHours = (value: string, index: number) => {
    setWattHoursArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleLithiumContent = (value: string, index: number) => {
    setLithiumContentArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleBattType = (value: string, index: number) => {
    setBattTypeArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleNetWeight = (value: string, index: number) => {
    setWeightArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

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

  // this function handles when the user uploads an MSDS file
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const pdfData = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument(pdfData);

    let extractedWH: number;

    // This is the function that parses the pdf file and looks for the watt hour rating
    loadingTask.promise.then(async function (pdf) {
      const numPages = pdf.numPages;
      let combinedText = "";
      // Loop through all pages
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        // Extract text from the PDF
        const textContent = await page.getTextContent();

        // Process text content as needed for each page
        for (const item of textContent.items) {
          if ("str" in item) {
            combinedText += item.str;
            //   if (
            //     item.str.toLowerCase().includes("watt") ||
            //     item.str.toLowerCase().includes("wh") ||
            //     item.str.toLowerCase().includes("rating")
            //   ) {
            //     const numbers = item.str.match(/\d+/g);
            //     if (numbers) {
            //       extractedWH = parseInt(numbers[0]);

            //       console.log(
            //         `Page ${pageNumber}, Extracted Number: ${extractedWH}`
            //       );

            //       // Break out of the loop once the first "wh" is found
            //       break;
            //     } else {
            //       console.log(
            //         `Page ${pageNumber}, No numbers found in the string`
            //       );
            //     }
            //   }
            //   if (
            //     /3480|3481/.test(item.str.toLowerCase())
            //   ) {
            //     console.log(item.str)
            //     handleBattType("lithium-ion", index);
            //   } else if (
            //     /lithium-manganese|manganese|lithium manganese/.test(item.str.toLowerCase())
            //   ) {
            //     handleBattType("Lithium Manganese Dioxide(LiMnO2)", index);
            //   }
          }
        }
        // console.log(combinedText);

        // // Check if "wh" is found to break out of the outer loop
        // if (extractedWH) {
        //   handleWattHours(extractedWH.toString(), index);
        //   break;
        // }
      }
      handleBattType("", index);
      handleWattHours("", index);
      handleNetWeight("", index);
      handleLithiumContent("", index);
      let responseData;

      try {
        const response = await apiCall(combinedText);
        console.log(response);
        responseData = response?.split(",");
      } catch (error) {
        console.error("Error occurred during API call:", error);
      }

      if (responseData) {
        if (responseData[0].toLowerCase() == "lithium-ion" || responseData[0] == "Lithium-Polymer" ) {
          handleBattType(responseData[0], index);
          handleWattHours(responseData[1], index);
          handleNetWeight(responseData[2], index);
        } else {
          handleBattType(responseData[0], index);
          handleLithiumContent(responseData[1], index);
          handleNetWeight(responseData[2], index);
        }
      }
    });
  };

  return (
    <>
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
                    onValueChange={(e) => {
                      // Update state directly within field.onChange
                      field.onChange(e);

                      // Perform additional actions here if needed
                      handleBattType(e, index);
                    }}
                    defaultValue={field.value}
                    value={battTypeArray[index]}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {batteryTypes.map((batt, index) => (
                        <SelectItem value={batt} key={index}>
                          {batt}
                        </SelectItem>
                      ))}
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
                    onValueChange={() => {
                      field.onChange;
                    }}
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
                      {battTypeArray[index] === "lithium-ion" || battTypeArray[index] === "Lithium-Polymer" ?
                        unCodes["lithium-ion"].map((code, index) => (
                          <SelectItem key={index} value={code}>
                            {code}
                          </SelectItem>
                        ))
                          :
                          battTypeArray[index].toLowerCase().startsWith("lithium") ?
                        unCodes["lithium-manganese"].map((code, index) => (
                          <SelectItem key={index} value={code}>
                            {code}
                          </SelectItem>
                        )) :
                        null
                      }
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
                    disabled={battTypeArray[index] === "lithium-ion" || battTypeArray[index] === "Lithium-Polymer"}
                    value={lithiumContentArray[index]}
                    onChange={(e) =>
                      handleLithiumContent(e.target.value, index)
                    }
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
                    pattern="\d+" // Use the \d+ regex pattern to allow only digits
                    title="Please enter only digits"
                    disabled={battTypeArray[index] !== "lithium-ion" && battTypeArray[index] !== "Lithium-Polymer"}
                    value={wattHoursArray[index]} // Check for NaN and set to an empty string
                    onChange={(e) => {
                      // const parsedValue = parseFloat(e.target.value);
                      handleWattHours(e.target.value, index);
                    }}
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
                    value={weightArray[index]}
                    onChange={(e) => {
                      handleNetWeight(e.target.value, index);
                    }}
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
                    onChange={(e) => handleChange(e, index)}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </form>
    </>
  );
}
