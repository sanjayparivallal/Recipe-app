import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are a helpful culinary assistant. Given a list of ingredients, provide a detailed recipe. The recipe should be well-structured, including a title, a list of ingredients with quantities (estimated if necessary), clear step-by-step instructions, and a brief introductory paragraph. The response must be formatted using Markdown.
`;

const apiKey = process.env.GOOGLE_API_KEY;

export async function handler(event) {
  try {
    // Log for debugging: Check if the API key is loaded
    console.log("API Key loaded:", !!apiKey);

    if (!apiKey) {
      console.error("GOOGLE_API_KEY is not defined.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error: API key missing." }),
      };
    }

    const { ingredients } = JSON.parse(event.body || "{}");

    if (!ingredients || ingredients.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No ingredients provided" }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `${SYSTEM_PROMPT}\nUser has these ingredients: ${ingredients.join(", ")}. Please give a recipe recommendation.`;
    
    // Log for debugging: Show the prompt being sent
    console.log("Generated prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipeText = response.text();
    
    // Log for debugging: Show the successful response
    console.log("Successfully generated recipe.");

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: recipeText || "No recipe found." }),
    };
  } catch (err) {
    // Log for debugging: Catch and show the specific error
    console.error("Caught an error in function handler:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch recipe." }),
    };
  }
}
