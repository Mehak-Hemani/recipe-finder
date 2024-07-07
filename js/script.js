const apiKey = '1564537f4e2c465993f318cae2911c2d'; // Replace with your Spoonacular API key

async function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            data.results.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.className = 'recipe';

                recipeDiv.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div>
                        <h3>${recipe.title}</h3>
                        <button onclick="saveRecipe('${recipe.id}', '${recipe.title}', '${recipe.image}')">Add To Favourite</button>
                    </div>
                `;

                resultsDiv.appendChild(recipeDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        resultsDiv.innerHTML = '<p>An error occurred while searching for recipes.</p>';
    }
}

function saveRecipe(id, title, image) {
    const favoritesDiv = document.getElementById('favorites');
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';

    recipeDiv.innerHTML = `
        <img src="${image}" alt="${title}">
        <div>
            <h3>${title}</h3>
        </div>
    `;

    favoritesDiv.appendChild(recipeDiv);
}
