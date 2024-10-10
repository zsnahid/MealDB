const getCategories = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await response.json();
  displayCategories(data.categories);
};

function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categories-container");

  categories.forEach((category) => {
    const {
      idCategory,
      strCategory,
      strCategoryDescription,
      strCategoryThumb,
    } = category;

    const div = document.createElement("div");
    div.classList.add("min-w-40", "bg-slate-100", "rounded-lg");
    div.innerHTML = `
        <figure>
            <img src="${strCategoryThumb}" class="rounded-lg object-cover object-center p-5"/>
        </figure>
        <p class="font-semibold bg-slate-200 rounded-b-lg p-3">${strCategory}</p>
    `;
    categoriesContainer.append(div);
  });
}

const getFoodsByFirstLetter = async (firstLetter) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
  );
  const data = await response.json();
  if (data.meals === null) {
    return;
  }

  displayAllFoods(data.meals);
};

function displayAllFoods(meals) {
  const remainingFoodsContainer = document.getElementById("remaining-foods-container");

  meals.forEach((meal) => {
    const {
      idMeal,
      strArea,
      strCategory,
      strInstructions,
      strMeal,
      strMealThumb,
      strYoutube,
    } = meal;

    const div = document.createElement("div");
    div.classList.add("flex", "border", "rounded-lg", "shadow");
    div.innerHTML = `
      <figure class="basis-1/3">
        <img src="${strMealThumb}" class="rounded-lg" alt="${strMeal}"/>
      </figure>
      <div class="p-5 basis-2/3 flex flex-col justify-center items-start">
        <p class="font-semibold text-xl mb-3">${strMeal}</p>
        <p class="line-clamp-3 mb-5 text-sm text-slate-500">${strInstructions}</p>
        <button 
          class="btn-link text-primary" 
          onclick="getDetails(${idMeal})">
            View Details
        </button>
      </div>
    `;
    remainingFoodsContainer.append(div);
  });
}

function getAllFoods() {
  for (let i = 98; i <= 122; i++) {
    const char = String.fromCharCode(i);
    getFoodsByFirstLetter(char);
  }
}

const getFoodsWithFirstLetterA = async() => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
  const data = await response.json();
  displayAllFoods(data.meals);
}

getFoodsWithFirstLetterA();

const getDetails = async (mealId) => {
  console.log(mealId);

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  displayDetails(data.meals);
};

// {
//   "idMeal": "52768",
//   "strMeal": "Apple Frangipan Tart",
//   "strCategory": "Dessert",
//   "strArea": "British",
//   "strInstructions": "Preheat the oven to 200C/180C Fan/Gas 6.\r\nPut the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter.",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
//   "strTags": "Tart,Baking,Fruity",
//   "strYoutube": "https://www.youtube.com/watch?v=rp8Slv4INLk",
// }

function displayDetails(meal) {
  console.log(meal);
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
  } = meal[0];
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <p class="font-semibold text-lg">${strMeal}</p>
    <div class="border my-5"></div>
    <figure class="mb-5">
      <img src="${strMealThumb}" class="max-w-full aspect-video"/>
    </figure>
    <p class="font-medium text-sm mb-3">
      Category: 
      <span class="font-normal text-slate-500">
        ${strCategory}
      </span>
    </p>
    <p class="font-medium text-sm mb-3">
      Area: 
      <span class="font-normal text-slate-500">
        ${strArea}
      </span>
    </p>
    <p class="font-medium text-sm mb-3">
      Instructions: 
      <span class="font-normal text-slate-500">
        ${strInstructions}
      </span>
    </p>
    <p class="font-medium text-sm mb-3">
      YouTube: 
      <a class="font-normal text-slate-500" href="${strYoutube}">
        ${strYoutube}
      </a>
    </p>
  `;
  details_modal.showModal();
}

getCategories();
