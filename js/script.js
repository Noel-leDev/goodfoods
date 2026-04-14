import { fetchData } from "./api.js";
import { addMealToDOM } from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  const submit = document.getElementById("submit");
  const random = document.getElementById("random");
  const resultHeading = document.getElementById("meal-result-heading");
  const mealsEl = document.getElementById("meals");
  const single_mealEl = document.getElementById("single-meal-container");
  const youtube = document.getElementById("youtube");

  // function pour fetch les api data
  function findMeal(e) {
    e.preventDefault();
    resetUI();
    const item = search.value;
    // console.log(item);
    // fetch api and display in browser

    if (item.trim()) {
      fetchData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`,
      ).then((data) => {
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
  async function getsingleItemId(mealID) {
    const data = await fetchData(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`,
    );
    console.log(data);
    const meal = data.meals[0];
    // console.log(data);

    addMealToDOM(meal, single_mealEl, youtube, mealsEl);
  }

  function resetUI() {
    single_mealEl.innerHTML = "";
    youtube.innerHTML = "";
    mealsEl.style.display = "grid";
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

      mealsEl.style.display = "none";

      getsingleItemId(mealID);

      // 👇 attendre que le DOM existe
      document.addEventListener("click", (e) => {
        if (e.target.id === "back") {
          resetUI();
        }
      });
    }
  });
  //LOCALSTORAGE
  let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
});
