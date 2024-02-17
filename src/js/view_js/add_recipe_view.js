import View from "./View.js"
import icons from "url:../../img/icons.svg"




class add_recipe_view extends View
{

    _parent_element = document.querySelector('.upload')
    _window = document.querySelector(".add-recipe-window")
    _overlay = document.querySelector(".overlay")
    _btn_open = document.querySelector(".nav__btn--add-recipe")
    _btn_close = document.querySelector(".btn--close-modal")
    _default_success_msg = `Recipe was successfully uploaded`



    constructor()
    {
        super() ;
        this._add_event_listener_function_show_window()
        this._add_event_listener_function_close_window()
    }



    toggle_window_method()
    {
        this._overlay.classList.toggle("hidden")
        this._window.classList.toggle("hidden")
    }
    _add_event_listener_function_show_window()
    {
        this._btn_open.addEventListener("click" , this.toggle_window_method.bind(this))
    }
    _add_event_listener_function_close_window()
    {
        this._btn_close.addEventListener("click" , this.toggle_window_method.bind(this))   
        this._overlay.addEventListener("click" , this.toggle_window_method.bind(this))     
    }
    _add_event_listener_function_upload_form_button(recieved_control_add_recipe_function)
    {
        this._parent_element.addEventListener("submit" , function(event_info_object)
        {
            event_info_object.preventDefault()

            const data_from_form_array = [...new FormData(this)]
            // console.log(data_from_form)

            const data_from_form_object  = Object.fromEntries(data_from_form_array)
            // console.log(data_from_form_object)
            recieved_control_add_recipe_function(data_from_form_object)
        })
    }


}


export default new add_recipe_view() ; 