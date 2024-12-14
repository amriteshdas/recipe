const appId = "d198a62f"; // Replace with your App ID
const apiKey = "8e0adf4f50c9cdf9b90d480c84180940"; // Replace with your API Key
const searchBtn = document.getElementById("search-btn");
const ingredientInput = document.getElementById("ingredient");
const recipeContainer = document.getElementById("recipe-container");
const loadingBar = document.getElementById("loading");
const progress = document.querySelector(".progress");

// Fetch recipes from Edamam API
async function fetchRecipes(ingredient) {
  const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${appId}&app_key=${apiKey}&from=0&to=10`;
  loadingBar.style.display = "block";  // Show loading bar

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.hits);
    progress.style.width = "100%"; // Fill the progress bar
    setTimeout(() => loadingBar.style.display = "none", 500); // Hide loading bar after 0.5s
  } catch (error) {
    console.error("Error fetching recipes:", error);
    progress.style.width = "100%"; // Fill the progress bar
    setTimeout(() => loadingBar.style.display = "none", 500); // Hide loading bar after 0.5s
  }
}

// Display recipes in the UI
function displayRecipes(recipes) {
  recipeContainer.innerHTML = ""; // Clear previous results
  if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipeObj => {
    const recipe = recipeObj.recipe;
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.label}">
      <h3>${recipe.label}</h3>
      <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
      <a href="${recipe.url}" target="_blank">View Full Recipe</a>
    `;
    recipeContainer.appendChild(recipeCard);
  });
}

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
  const ingredient = ingredientInput.value.trim();
  if (ingredient) {
    fetchRecipes(ingredient);
    progress.style.width = "0%";  // Reset the progress bar
  } else {
    alert("Please enter an ingredient!");
  }
});
