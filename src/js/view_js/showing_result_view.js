import View from "./View.js"
import icons from "url:../../img/icons.svg"
import Preview_view from "./preview_view.js"



class showing_result_view extends View
{

    _parent_element = document.querySelector('.results')
    _default_error_msg = `No recipes for this input` ;
    _default_success_msg = ` ` ;



    _generate_markup()
    {
        // _data here is that bookmarked_array of recipe object hai
        // console.log(this._data)
        return this._data.map( bookmarked_recipe_object => Preview_view.render_method(bookmarked_recipe_object , false)).join("")          
    }




}


export default new showing_result_view() ;
// console.log(showing_result_view.prototype)