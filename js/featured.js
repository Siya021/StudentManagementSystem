const dashbord = document.getElementById('featured');

let allRecipes = [];
fetch('https://dummyjson.com/recipes')
  .then(response => response.json())
  .then(data => { 
    // allRecipes.push(data.recipes)
    // allRecipes = data.recipes;
allRecipes = data.recipes;
    displayFeature(allRecipes);
    //(featureRecipes)
    console.log(allRecipes)
  });

  function displayFeature(recipes) {
    dashbord.innerHTML = '';

    recipes.forEach(recipe => {
      const checklist = document.createElement('div');
      checklist.classList.add('flex', 'items-center', 'gap-8', 'p-6', 'sm:items-start', 'lg:items-center');
      checklist.innerHTML = `
      
                <input id="product1" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-700 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="product1" class="sr-only"> Recipe </label>
              </div>

              <div class="min-w-0 flex-1 gap-14 xl:flex xl:items-center">
                <div class="min-w-0 max-w-xl flex-1 gap-6 sm:flex sm:items-center">
                  <a href="#" class="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                    <img class="h-auto max-h-full w-full dark:hidden" src="${recipe.image}" alt="imac image" />
                    
                  </a>
                  <a href="#" class="mt-4 font-medium text-gray-900 hover:underline dark:text-white sm:mt-0">${recipe.name}</a>
                </div>

                <div class="mt-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-between md:items-center xl:mt-0 xl:flex-col xl:items-start">
                  <dl class="flex items-center gap-2.5">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Meal Type:</dt>
                    <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                      <a href="#" class="hover:underline">${recipe.mealType}</a>
                    </dd>
                  </dl>

                  <dl class="flex items-center gap-2.5">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36"></dt>
                    <dd class="text-base font-normal text-gray-500 dark:text-gray-400">${recipe.cookTime}</dd>
                  </dl>
                </div>
              
      `

      dashbord.appendChild(checklist)
    })
  };


function showMoreDetails(recipe) {
    alert(`Details for ${recipe.name}:
    Ingredients: ${recipe.ingredients}
    Instructions: ${recipe.instructions}
    Serving: ${recipe.servings}
    Calories per Serving: ${recipe.caloriesPerServing}`);
}

function getStars(rating) {
  const roundedRating = Math.round(rating); 
  const stars = '🔥'.repeat(roundedRating);
  return stars;
}