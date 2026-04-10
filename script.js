document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  const submit = document.getElementById("submit");
  const random = document.getElementById("random");
  const resultHeading = document.getElementById("meal-result-heading");
  const mealsEl = document.getElementById("meals");
  const single_mealEl = document.getElementById("single-meal-container");

  // function pour fetch les api data
  function findMeal(e) {
    e.preventDefault();
    const item = search.value;
    // console.log(item);
    // fetch api and display in browser
    if (item.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          resultHeading.innerHTML = `Résultat pour <strong>${item}</strong>`;
          // if condition
          if (data.meals === null) {
            resultHeading.innerHTML = `Oops! Pas de resultats pour <em>${item} </em>`;
          } else {
            // alert("There is a meal name")
            mealsEl.innerHTML = data.meals
              .map(
                (meal) =>
                  `<div class="meal">                
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

              <div class="meal-info" data-mealid="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
              </div>         
        </div>
  `,
              )
              .join("");
          }
        });
      //juste apres ca, je supprime vide la valeur du champs de saisie
      search.value = "";
    } else {
      alert("please enter item name");
    }
  }
  // fonction pour recuperer l'id de chaque meal
  function getsingleItemId(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const meal = data.meals[0];
        // console.log(meal);

        addMealToDOM(meal);
      });
  }

  // fonction pour ajouter un meal au DOM
  function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i < 20; i++) {
      //On vérifie si l'ingrédient existe ----------et n'est pas une chaîne vide
      if (meal[`strIngredient${i}`]) {
        //si un meal a des ingredients, on ajout ingredient
        ingredients.push(`${meal[`strIngredient${i}`]} - 
                          ${meal[`strMeasure${i}`]} `);
      } else {
        break;
      }
    }
    // console.log(ingredients);
    single_mealEl.innerHTML = `
      <div class="single-meal">
          <h1>${meal.strMeal}</h1>
          <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
          </div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="main">
              <h2>Ingrédients</h2>
              <ul>
                ${ingredients
                  .map((values) => {
                    return `<li>${values}</li>`;
                  })
                  .join("")}
              </ul>
              
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
          </div>
      </div>
      `;
  }
  submit.addEventListener("submit", findMeal);

  // Click sur single meal
  mealsEl.addEventListener("click", (e) => {
    const mealInfo = e.composedPath().find((single_item) => {
      // console.log(single_item);
      if (single_item.classList) {
        return single_item.classList.contains("meal-info");
      } else {
        return false;
      }
    });
    // console.log(mealInfo);
    if (mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealid");
      // console.log(mealID);
      getsingleItemId(mealID);
    }
  });
});
