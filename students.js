const recipesContainer = document.getElementById('recipes');
const dashbord = document.getElementById('featured');

let featureRecipes = [];
let allRecipes = [];
fetch('https://dummyjson.com/recipes')
  .then(response => response.json())
  .then(data => { 
    allRecipes.push(data.recipes)
    // allRecipes = data.recipes;
    // featureRecipes = data.recipes;
    displayRecipes(allRecipes);
    // displayFeature(featureRecipes)
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
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Order Number:</dt>
                    <dd class="text-base font-normal text-gray-500 dark:text-gray-400">
                      <a href="#" class="hover:underline">#73742364</a>
                    </dd>
                  </dl>

                  <dl class="flex items-center gap-2.5">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 xl:w-36">Return Term:</dt>
                    <dd class="text-base font-normal text-gray-500 dark:text-gray-400">21.07.2023</dd>
                  </dl>
                </div>
              
      `

      dashbord.appendChild(checklist)
    })
  };

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
      const section = document.createElement('section');
      section.classList.add('bg-white', 'px-4', 'py-8', 'antialiased', 'dark:bg-gray-900', 'md:py-16');
      section.innerHTML = `
      <div class="mx-auto grid max-w-screen-xl rounded-lg bg-gray-50 p-4 dark:bg-gray-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
    <div class="lg:col-span-5 lg:mt-0">
      <a href="#">
        <img class="mb-4 h-56 w-56 dark:hidden sm:h-96 sm:w-96 md:h-full md:w-full" src="${recipe.image }" alt="peripherals" />
      </a>
    </div>
    <div class="me-auto place-self-center lg:col-span-7">
      <h1 class="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
      ${recipe.name}
      </h1>
      <p class="mb-6 text-gray-500 dark:text-gray-400">${recipe.instructions}.</p>
      <a href="#" class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"> Pre-order now </a>
    </div>
  </div>
      
      `

    //   const image = document.createElement('img');
    //   image.src = recipe.image;
    //   card.appendChild(image);

    //   const name = document.createElement('h2');
    //   name.textContent = recipe.name;
    //   card.appendChild(name);

    //   const difficulty = document.createElement('p');
    //   difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
    //   card.appendChild(difficulty);

    //   const ratingStars = document.createElement('p');
    //   ratingStars.textContent = `Rating: ${getStars(recipe.rating)}`;
    //   card.appendChild(ratingStars);
    
    //   const readMoreBtn = document.createElement('button');
    //   readMoreBtn.textContent = 'Read More';
    //   readMoreBtn.addEventListener('click', () => {
    //     showMoreDetails(recipe);
    //   });
      // card.appendChild(readMoreBtn);
    
    

      recipesContainer.appendChild(section);
    })};



  //   function displayStudents() {
  //     const studentList = document.getElementById('list-display');
  //     // console.log('studentList:', studentList); // Debugging statement
  //     if (!studentList) {
  //         console.error('Element with ID studentList not found.');
  //         return;
  //     }
  //     studentList.innerHTML = '';
  //     console.log(students);
      
  
  //     students.forEach((student) => {
          
  //         const row = document.createElement('tr');
  //         row.classList.add('border-b', 'dark:border-gray-700');
  //         row.innerHTML = `
  //             <td class="px-4 py-3">${student.firstName}</td>
  //             <td class="px-4 py-3">${student.lastName}</td>
  //             <td class="px-4 py-3">${student.gender}</td>
  //             <td class="px-4 py-3">${student.studentMark}</td>
  //             <td class="px-4 py-3 flex items-center justify-end">
  //                 <button onclick="editStudent(${student.id})" data-modal-target="updateProductModal" data-modal-toggle="updateProductModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</button>
  //                 <button onclick="confirmDelete(${student.id})" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
  //             </td>
  //         `;
  //         studentList.appendChild(row);
  //     });
  // }


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