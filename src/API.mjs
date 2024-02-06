import OpenAI from "openai";
import { headers, batteryTypes, formats, unCodes } from "./data/complianceData"

const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

export default async function apiCall(pdf) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a data entry system. With no headers or comments, Read ${pdf}.

        battery types must match ${batteryTypes}

        for lithium ion batteries output = battery type/watt hours/total mass in kilograms.
        
        for lithium metal batteries output = battery type/lithium amount in grams/total mass in kilograms.
        
        return only values in csv`,
      },
    ],
    // model: "gpt-3.5-turbo",
    model: "gpt-4-1106-preview",
    // model: "gpt-4",
  });

  return (completion.choices[0].message.content);
}

// pages/api/openai.js

// import apiCall from "../../path/to/apiCall"; // Adjust the path as needed

// export default async function handler(req, res) {
//   const { pdf } = req.body;

//   try {
//     const completion = await apiCall(pdf);
//     res.status(200).json(completion.choices[0]);
//   } catch (error) {
//     console.error("Error making API call:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }



