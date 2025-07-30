import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cleaningPrompt = `You are an expert data cleaning bot. The user has provided text from a messy bank statement CSV. Your single task is to identify the main list of transactions. This list typically has columns like 'Date', 'Description', 'Debit', 'Credit', or 'Amount'. Instructions: 1. Delete all summary information, account holder details, balances, and other non-transactional rows. 2. Keep the header row for the transactions (e.g., "Date,Description,Amount"). 3. Return ONLY the cleaned transaction data as a standard, CSV-formatted string. Do NOT return JSON. Do NOT add any commentary. Return only the raw, cleaned CSV text.`;

const extractionPrompt = `You are a financial data extraction assistant. The input is a clean CSV string representing bank transactions. Your task is to extract structured information. Return the data as an array of JSON objects. Each object must have: name: a descriptive name for the transaction, amount: amount of money spent or received (positive for income, negative for expenses), date: date of transaction (YYYY-MM-DD), type: "debit" or "credit", category (optional): e.g., Food, Travel, Rent, Income, time (if stated in the description) ex 4:30 PM. Normalize date formats. Clean up noisy descriptions. Infer transaction type. Skip any remaining header rows. Return only the JSON array. No extra commentary or formatting.`;

async function runGeminiModel(prompt, text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt, text]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
}

async function callGemini(rawCsvText) {
  console.log("Call gemini called!!!!");
  try {
    console.log("Step 1: Cleaning CSV data...");
    const cleanedCsvText = await runGeminiModel(cleaningPrompt, rawCsvText);

    if (!cleanedCsvText || cleanedCsvText.trim().length === 0) {
      return {
        error: "AI failed to identify any transaction data in the CSV.",
      };
    }

    console.log("Step 2: Extracting transactions to JSON...");
    const jsonString = await runGeminiModel(extractionPrompt, cleanedCsvText);

    let cleanedResponse = jsonString
      .replace(/```json\s*/g, "")
      .replace(/```\s*$/g, "")
      .trim();

    if (!cleanedResponse.startsWith("[") || !cleanedResponse.endsWith("]")) {
      return { error: "AI returned a non-JSON response after extraction." };
    }

    return JSON.parse(cleanedResponse);
  } catch (err) {
    console.error("An error occurred in the pipeline:", err);
    return {
      error: "An unexpected error occurred during processing.",
      details: err.message,
    };
  }
}

export default callGemini;
