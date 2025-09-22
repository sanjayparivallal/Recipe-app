// src/ai.js
export default async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    const data = await response.json();

    if (data.error) return { error: data.error };
    return data.recipe;
  } catch (err) {
    console.error("Error fetching recipe from serverless function:", err);
    return { error: "Failed to fetch recipe." };
  }
}