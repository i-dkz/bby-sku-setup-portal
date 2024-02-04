import pdfjsLib from '../../node_modules/pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc =
"../../node_modules/pdfjs-dist/build/pdf.worker.mjs";

async function extractText() {
const fileInput = document.getElementById("fileInput");
const file = fileInput.files[0];

if (!file) {
  console.error("No file selected.");
  return;
}

const pdfData = await file.arrayBuffer();
const loadingTask = pdfjsLib.getDocument(pdfData);

loadingTask.promise.then(async function (pdf) {
  const page = await pdf.getPage(5);

  // Extract text from the PDF
  const textContent = await page.getTextContent();
  // const textItems = textContent.items.map((item) => item.str);
  // const extractedText = textItems.join(" ");

  // // Log the extracted text to the console
  // console.log("Extracted Text:", extractedText);
  let extractedNumber = 0;
  textContent.items.forEach((item) => {
    if (
      item.str.toLowerCase().includes("watt") ||
      item.str.includes("wh") ||
      item.str.includes("rating")
    ) {
      const numbers = item.str.match(/\d+/g);
      if (numbers) {
        extractedNumber = parseInt(numbers[0]);
        console.log(extractedNumber); // Output: 123
      } else {
        console.log("No numbers found in the string");
      }
    }
  });

  const inputElement = document.getElementById("wattHours");

  // Check if the input element exists
  if (inputElement) {
    // Set the value of the input element
    inputElement.value = extractedNumber;
  } else {
    console.error("Input element not found.");
  }
});
}

// Define the function in the global scope
window.extractText = extractText;

const headers = {
  "Battery Type": "Select from list of values",
  "Size/Format": "Select from list of values",
  "*Qty (total no. of batteries for this type)": "Enter a number",
  "HAZMAT UN# (4 Digits)": "Select from list of values",
  "# of Batteries in Product (inside)": "Enter a number",
  "# of Batteries out of Product (outside)": "Enter a number",
  "Cells in Lithium (single or multiple)": "Select from list of values",
  "# Lithium Content (Primary) (grams)": "Required for lithium metal batteries",
  "Watt Hours": "Required for lithium ion batteries",
  "Individual Li Battery Net Weight (kg)": "Enter a number",
  MSDS: "Upload MSDS file here",
};

const batteryTypes = [
    'Alkaline Coin/Button',
    'Lead-Acid',
    'Lithium Carbon Flouride (Li-CFx)',
    'Lithium Coin/Button',
    'Lithium Iron Disulfide (LiFe2)',
    'Lithium iron phosphate (LiFePO4)',
    'Lithium-cobalt (LiCoO2)',
    'Lithium-Ion Battery',
    'Lithium-manganese(LiMn204)',
    'Lithium Manganese Dioxide(LiMnO2)',
    'Lithium-Polymer',
    'Manganese Titanium Lithium',
    'Nickel-Cadmium (NiCd)',
    'Nickel-Metal Hydride (NiMH)',
    'Silver Oxide Coin/Button',
    'Zinc Air Coin/Button',
    'Zinc Carbon',
    'Other',
    'Alkaline Battery',
]

const formats = {
  "Lithium-Ion": [
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

const vendor = localStorage.getItem("vendor");
const category = localStorage.getItem("category");
const numOfSKUs = localStorage.getItem("numOfSKUs");


// DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  document.getElementById("toggle").addEventListener("click", function (e) {
    body.classList.toggle("dark");
  });
});

// DYNAMICALLY ADDING HEADERS
const heads = document.getElementById("headers");

Object.entries(headers).map(([key, value]) => [
  (heads.innerHTML += `<div class="flex bg-secondary text-sm font-medium items-center px-4 border-b border-r h-[60px] w-[100%]">${key}</div>`),
]);


// DYNAMICALLY ADDING THE COLUMNS
const complianceColumn = `
    <form class="flex flex-col" id="complianceForm">
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <select type="select" id="batteryType" name="batteryType" required>
                <option></option>
                
            </select>
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <select type="select" id="sizeFormat" name="sizeFormat" required>
                <option></option>
            </select>
        </div>

        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input
                type="number"
                id="quantity"
                name="quantityu"
                min="1"
                required
            />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <select type="select" id="unCode" name="unCode" required>
                <option></option>
            </select>
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input
                type="number"
                id="baterriesIn"
                name="baterriesIn"
                min="1"
                required
            />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input
                type="number"
                id="baterriesOut"
                name="baterriesOut"
                min="1"
                required
            />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <select type="select" id="cells" name="cells" required>
                <option></option>
            </select>
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input
                type="text"
                id="lithiumContent"
                name="lithiumContent"
                required
            />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input type="text" id="wattHours" name="wattHours" required />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input type="text" id="netWeight" name="netWeight" required />
        </div>
        <div
        class="flex justify-center h-[60px] border-b border-r items-center"
        >
            <input type="file" id="fileInput" accept=".pdf" onChange={extractText()}>
        </div>
    </form>
`;

// ADDING THE COLUMNS TO MAIN
const main = document.querySelector("main");
main.innerHTML += complianceColumn;

const battType = document.getElementById("batteryType");
const sizeFormat = document.getElementById("sizeFormat");

// ADDING THE BATTERY TYPES TO THE BATT TYPE DROPDOWN MENU
batteryTypes.map((battery) => {
    battType.innerHTML += `<option value=${battery}>${battery}</option>`;
})

// EVENT LISTENER TO DYNAMICALLY CHANGE THE SIZE/FORMATS BASED ON THE BATTERY TYPE THAT IS CHOSEN
battType.addEventListener("change", function () {
    const selectedBattery = battType.value;
    sizeFormat.innerHTML = ""; // Clear existing options

    console.log(battType.value)

    if (formats[selectedBattery]) {
      // Populate sizeFormat dropdown based on selected battery
      formats[selectedBattery].forEach((format) => {
        sizeFormat.innerHTML += `<option value="${format}">${format}</option>`;
      });
    }
  });

