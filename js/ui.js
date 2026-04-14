import { getYouTubeID } from "./utils.js";
// fonction pour ajouter un meal au DOM #######################
export async function addMealToDOM(meal, single_mealEl, youtube) {
  const ingredients = [];
  for (let i = 1; i < 20; i++) {
    //On vérifie si l'ingrédient existe ----------et n'est pas une chaîne vide
    if (meal[`strIngredient${i}`]) {
      //si un meal a des ingredients, on ajout ingredients
      ingredients.push(`${meal[`strIngredient${i}`]} - 
                                  ${meal[`strMeasure${i}`]} `);
    } else {
      continue;
    }
  }

  // console.log(ingredients);
  single_mealEl.innerHTML = `
             <button id="back">⬅ Retour</button>
              <div class="single-meal" >
                  <h1>${meal.strMeal}</h1>
                  <button class="fav-btn" data-id="${meal.idMeal}">❤️ Ajouter aux favoris </button>     
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

  // console.log(meal.strYoutube);
  youtube.innerHTML = `            
          <div class="youtube-box">
        <div class="video">
          <iframe  src="https://www.youtube.com/embed/${getYouTubeID(meal.strYoutube)}" 
                  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
}
