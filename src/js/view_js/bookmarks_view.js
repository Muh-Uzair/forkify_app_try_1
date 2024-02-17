import View from "./View.js"
import icons from "url:../../img/icons.svg"
import Preview_view from "./preview_view.js"



class bookmarks_view extends View
{

    _parent_element = document.querySelector('.bookmarks__list')
    _default_error_msg = `No bookmarks yet` ;
    _default_success_msg = ` ` ;

    add_event_listener_function_control_bookmarks(recieved_control_bookmarks_function)
    {
        window.addEventListener(`load` , recieved_control_bookmarks_function)
    }
    _generate_markup()
    {
        // _data here is that bookmarked_array of recipe object hai
        // console.log(this._data)
        return this._data.map( bookmarked_recipe_object => Preview_view.render_method(bookmarked_recipe_object , false)).join("")          
    }




}


export default new bookmarks_view() ;
// console.log(showing_result_view.prototype)  