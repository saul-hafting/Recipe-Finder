document.getElementById("searchButton").addEventListener("click", () => {
    const ingredient = document.getElementById("ingredient").value;
    fetchRecipes(ingredient);
});

function fetchRecipes(ingredient) {
    const apiKey = '9cfaaed5ea9d4924ae3783d8577272f3'; 
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&addRecipeInformation=true&apiKey=${apiKey}`;

    // Fetch data from the API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => displayRecipes(data.results)) // Pass the array of recipes to displayRecipes function
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("results").innerHTML = "Sorry, we couldn't find any recipes.";
        });
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear any previous results
 
    if (recipes.length === 0) {
        resultsDiv.innerHTML = "No recipes found. Try a different ingredient.";
        return;
    }
 
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
 
        const fullDescription = recipe.summary ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, "") : "No description available";
        const shortDescription = fullDescription.length > 200 ? fullDescription.slice(0, 200) + "..." : fullDescription;
 
        recipeCard.innerHTML = `
        <div class="item">
            <h2>${recipe.title}</h2>
            <p>${shortDescription}</p>
            <img src="${recipe.image}" alt="${recipe.title}">
            <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
        </div>
        `;
 
        resultsDiv.appendChild(recipeCard);
    });
 }