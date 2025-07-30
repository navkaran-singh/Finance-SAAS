import express from "express";
import cors from "cors";
import callGemini from "./utils/gemini.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // specify your frontend origin
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions)); // use CORS with the specified options -> to make requests bw different ports
app.use(express.json());

app.get("/api/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

app.post("/api/ai/", async (req, res) => {
  console.log("/api/ai called");
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    console.log("Uploaded file is empty or contains no text.");
    return res.status(400).json({ error: "Uploaded file is empty." });
  }

  try {
    // Pass the actual CSV text from the request to the function
    const response = await callGemini(text);

    console.log("AI response received:", response);
    console.log(response);

    res.json({ msg: response });
  } catch (error) {
    console.error("Error in /api/ai endpoint:", error);
    console.log(error.message);

    res.status(500).json({ err: "An internal server error occurred." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
