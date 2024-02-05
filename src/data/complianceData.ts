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
    "Alkaline Coin/Button",
    "Lead-Acid",
    "Lithium Carbon Flouride (Li-CFx)",
    "Lithium Coin/Button",
    "Lithium Iron Disulfide (LiFe2)",
    "Lithium iron phosphate (LiFePO4)",
    "Lithium-cobalt (LiCoO2)",
    "lithium-ion",
    "Lithium-manganese(LiMn204)",
    "Lithium Manganese Dioxide(LiMnO2)",
    "Lithium-Polymer",
    "Manganese Titanium Lithium",
    "Nickel-Cadmium (NiCd)",
    "Nickel-Metal Hydride (NiMH)",
    "Silver Oxide Coin/Button",
    "Zinc Air Coin/Button",
    "Zinc Carbon",
    "Other",
    "Alkaline Battery",
  ];
  
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

  const unCodes = {
    "lithium-ion": ["3480","3481","3171"],
    "lithium-polymer": ["3480","3481","3171"],
    "lithium-manganese" :["3090","3091"],
    "lithium-carbon-fluoride" :["3090","3091"],
  }

  export { headers, batteryTypes, formats, unCodes };