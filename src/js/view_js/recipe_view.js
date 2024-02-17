import {Fraction} from "fractional"
import View from "./View.js"
import icons from "url:../../img/icons.svg"



class recipe_view extends View
{

    // private fields
    _parent_element = document.querySelector('.recipe') // parent html element here is recipe container
    _default_error_msg = `Sorry ! We were not able to find you recipe` ;
    _default_success_msg = ` ` ;


    _generate_markup()
    {
        return ` 

      <figure class="recipe__fig">
        <img src="${this._data.image_url}" alt="${this._data.title}" class="recipe__img" /> 
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>





          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>

            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>

        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? `-fill` : ``}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map( ing => 
          {
            return `

            <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? ing.quantity : "" }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
            
            `;
          }).join("")}

          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">0.5</div>
            <div class="recipe__description">
              <span class="recipe__unit">cup</span>
              ricotta cheese
            </div>
          </li>
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
        
        `
    }
    add_handeler_render_function(handler)
    {
      window.addEventListener("hashchange" , handler )
      window.addEventListener("load" , handler)
    }
    add_event_listener_function_servings_up_down(recieved_control_servings_function)
    {
      this._parent_element.addEventListener("click" ,
      function(event_info_object)
      {
          const btn = event_info_object.target.closest(".btn--update-servings")
          if(!btn) return 
          // console.log(btn)

          const updateTo = +btn.dataset.updateTo ;
          // console.log(updateTo)

          if(updateTo >=1 ) recieved_control_servings_function(updateTo) ;
      })
    }
    add_event_listener_function_bookmark_btn(control_add_bookmark_function)
    {

      this._parent_element.addEventListener("click" ,
      function(event_info_object)
      {
        const btn = event_info_object.target.closest(".btn--bookmark")
        if(!btn) return 
        control_add_bookmark_function()
      })



    }





}

// exporting an object 
export default new recipe_view() ;