import { useState } from "react";
import AddIngredient from "./components/AddIngredient";
import IngredientsList from "./components/IngredientsList";
import Cta from "./components/Cta";
import MyRecipe from "./components/MyRecipe";
import getRecipeFromMistral from "./ai";

const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState(null);

  function addIngredient(newIngredient) {
    setIngredients((prev) => [...prev, newIngredient]);
  }

  function deleteIngredient(ingredient) {
    setIngredients((prev) => prev.filter((i) => i !== ingredient));
  }

  async function toggleRecipe() {
    if (ingredients.length < 4) return;

    setLoading(true);
    setError(null);

    try {
      const fetchedRecipe = await getRecipeFromMistral(ingredients);

      if (typeof fetchedRecipe === "string") {
        setRecipe(fetchedRecipe);
      } else if (fetchedRecipe?.error) {
        setError(fetchedRecipe.error);
        setRecipe("");
      } else {
        setRecipe("No recipe found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipe. Try again.");
      setRecipe("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <AddIngredient onAdd={addIngredient} length={ingredients.length} />

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          removeIngredient={deleteIngredient}
          isRecipeGenerated={!!recipe}
        />
      )}

      {ingredients.length > 3 && <Cta loading={loading} toggleRecipe={toggleRecipe} />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {recipe && !error && <MyRecipe recipe={recipe} />}
    </main>
  );
};

export default Main;