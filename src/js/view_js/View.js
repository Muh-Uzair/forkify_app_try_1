import icons from "url:../../img/icons.svg"



export default class view_js
{
    _data ;

    // Commonly Used Functions
    _clear_parent_html_element()
    {
        this._parent_element.innerHTML = "" ;
    }

    // 1 : 
    render_spinner_method()
    {

        const markup = 
            `<div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
        `;
        this._parent_element.innerHTML = "" ;
        this._parent_element.insertAdjacentHTML("afterbegin", markup) ;  
        
    };


    render_method(data , render_parameter = true )
    {
       

        if(!data || (Array.isArray(data) && data.length === 0)) return this.error_display_method(`No results for this query`)

       
        this._data = data ; // data here is the 
        // console.log(this._data)
        const markup = this._generate_markup() ;

        if(!render_parameter) return markup
        // console.log(markup)
        this._clear_parent_html_element() ;
        this._parent_element.insertAdjacentHTML("afterbegin" , markup)
    }

    // 3 : 
    error_display_method(actual_error_msg = this._default_error_msg) // here we render error
    {

      const markup =
      `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${actual_error_msg}</p>
          </div>
      `

      this._clear_parent_html_element() ;
      this._parent_element.insertAdjacentHTML("afterbegin" , markup)

    }

    success_display_method(actual_success_msg = this._default_success_msg)
    {

      const markup =
      `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${actual_success_msg}</p>
          </div>
      `

      this._clear_parent_html_element() ;
      this._parent_element.insertAdjacentHTML("afterbegin" , markup)

    }

    update_recipe_content_method(recieved_recipe_object)
    {

      

      // 1 : checking if we have recieved the recipe object , that array check is for another case not this case
      if(   !recieved_recipe_object    ||   (Array.isArray(recieved_recipe_object) && recieved_recipe_object.length === 0)  ) return this.error_display_method(`No results for this query`)

      // 2 : storing the recieved the reciepe_object into _data attribute
      this._data = recieved_recipe_object ; // data here is the reciepe object
      // console.log(this._data)


      // 6 : taking current elements from DOM , those elemnts which are on screen right now
      const current_DOM_elements = Array.from(this._parent_element.querySelectorAll("*"))

      // 3 : only that markup which consist updated element
      const new_updated_markup = this._generate_markup() ; 

      // 4 : Creating new_DOM_object from updated markup string
      const new_DOM_object = document.createRange().createContextualFragment(new_updated_markup) // DOM object created from that new markup
      // console.log(new_DOM_object)

      // 5 : taking elements out of the new_DOM_object 
      const new_DOM_elements = Array.from(new_DOM_object.querySelectorAll("*"))
      // console.log(new_DOM_elements)


      // console.log(current_DOM_elements)


      // looping over the new elements and checking that which element changed
      new_DOM_elements.forEach(( new_DOM_el , i ) =>
      {
        const current_DOM_el =  current_DOM_elements[i] ;
        // console.log(current_DOM_el , new_DOM_el.isEqualNode(current_DOM_el)) // isEqualNode is DOM Api method , this only check the 
        //console.log(new_DOM_el.firstChild , new_DOM_el.isEqualNode(current_DOM_el))

        // those which are changed we replace it in DOM with new one
        if( !new_DOM_el.isEqualNode(current_DOM_el) && (new_DOM_el.firstChild?.nodeValue.trim() !=="" ) )
        {
          current_DOM_el.textContent = new_DOM_el.textContent ;
        } 


        // changing the data attributes, first we had 3 and 5 now we can do 1, 2 , 3, etc
       if( !new_DOM_el.isEqualNode(current_DOM_el))
       {
        // new_DOM.attribute is an object 
        //console.log(new_DOM_el , new_DOM_el.attributes)
        Array.from(new_DOM_el.attributes).forEach( attribute =>
          {
            // console.log(new_DOM_el , attribute)
            current_DOM_el.setAttribute(attribute.name , attribute.value) 

          })
       }

      })






      
    }




}



// console.log(view_js.prototype)