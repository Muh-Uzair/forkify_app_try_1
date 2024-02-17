import * as Model from "./model.js"
import recipe_view from "./view_js/recipe_view.js";
import search_view from "./view_js/search_view.js" ;
import Showing_result_view from "./view_js/showing_result_view.js"
import Pagination_view from "./view_js/pagination_view.js"
import Bookmarks_view from "./view_js/bookmarks_view.js";
import Add_recipe_view from "./view_js/add_recipe_view.js";
import * as Config from "./config.js"
import "core-js/stable" ;
import "regenerator-runtime/runtime" // for  
// import view_js from "./view_js/View.js";
import view_js from "./view_js/View.js"
import showing_result_view from "./view_js/showing_result_view.js";
import bookmarks_view from "./view_js/bookmarks_view.js";
// import showing_result_view from "./view_js/showing_result_view.js";
 
// if(module.hot)
// {
//     module.hot.accept() ;
// }



const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


/**
 * 
 * @returns {undefined} It returns nothing just do the impplementation
 * @author Muhamad Uzair
 */
async function control_recipes()
{

  try 
  {

    const recipe_id = window.location.hash.slice(1); // takes recipe id from search bar 
    // console.log(recipe_id)
    if(!recipe_id) return ; // if there recipe id do not exist so it returns 
     
    
    recipe_view.render_spinner_method(recipeContainer) // we play spinner until reipe loads , we have imported class only and on that class render_spinner_method exist 
   

        
    // Showing_result_view.update_recipe_content_method(Model.get_search_result_page())

    // 1: Loading Recipe
    await Model.load_recipe_function(`${recipe_id}`) // we are calling function so that loading_recipe_function gets load and it stores the recipe inside recipe object in modal 
    const { recipe_object } = Model.state_object ; // this is the main line which brings the recipe_object from modal to controller
    
    if(Model.state_object.recipe_object.key)  Model.state_object.recipe_object.key = recipe_object.key

    // L 6 : Renderng Recipe 
    // 2: Rendering Recipe

    recipe_view.render_method(Model.state_object.recipe_object) // after we have recipe_object then we display it on thr page 
    // console.log(Model.state_object.recipe_object)
    // control_servings_function() 

    // Showing_result_view.render_method(Model.get_search_result_page)

    ;
    // debugger;
    Bookmarks_view.update_recipe_content_method(Model.state_object.bookmarks_array)    


  }
  catch(error_object)
  {
      recipe_view.error_display_method(error_object.message)
      console.error(error_object)
  } 
}
// control_recipes() ;
async function control_search_result_function()
{

  try
  {

    Showing_result_view.render_spinner_method()
    // console.log(Showing_result_view.__proto__)
    
    // 1 : gettin search item from input fiels
    const search_item = search_view.get_search_item() ;
    // console.log(search_item)

    // 2 : if no search item exist then we return 
    if(!search_item) return ;



    // 3 : Rendering Search results
    // data ko Model k state_object me store krtay hai 
    await Model.load_seacrh_results_function(search_item) ;
    // console.log(Model.state_object.search.search_results_array)// after data has arrived we display it and render method in View.js does that 
    Showing_result_view.render_method(Model.get_search_result_page(1)); // render_method(data) takes data data asa parameter which will be our our object
 

    // 4 : Render initial pagination buttons 
    // console.log(`hello`)
    Pagination_view.render_method(Model.state_object.search)// the whole search object is passed into pagination which have everyting in it 

    Showing_result_view.update_recipe_content_method(Model.get_search_result_page())

    // clear the input field after user have searched the item
    search_view.clearing_search_field_function() ;


    // console.log(" ")
  }
  catch(error_object)
  {
    console.error(error_object)
  }



}
function control_pagination(go_to_page_number)
{
  // console.log("Pagination Controller") ;
  // console.log(go_to_page_number)
  Showing_result_view.render_method(Model.get_search_result_page(go_to_page_number)); // render_method(data) takes data data asa parameter which will be our our object
  

  // 4 : Render initial pagination buttons 
  // console.log(`hello`)
  Pagination_view.render_method(Model.state_object.search)
}
function control_servings_function(updated_servings_number)
{
    Model.update_servings_function(updated_servings_number) ;
    // console.log(Model.state_object.recipe_object)
    recipe_view.update_recipe_content_method(Model.state_object.recipe_object)

}
// control_servings_function();
function control_add_bookmark_function()
{
  // console.log(Model.state_object.recipe_object)
  
  // 1 : Add or remove bookmarks
  if(Model.state_object.recipe_object.bookmarked === false )   Model.add_bookmark_function(Model.state_object.recipe_object)  
  else Model.delete_bookmark_function(Model.state_object.recipe_object.id)

  // 2 : add that white color to that book mark button or remove 
  recipe_view.update_recipe_content_method(Model.state_object.recipe_object) 


  // 3 : putting bookmarks into that tab 
  Bookmarks_view.render_method(Model.state_object.bookmarks_array)
}
function control_bookmarks_function()
{
  Bookmarks_view.render_method(Model.state_object.bookmarks_array)
}
async function control_add_recipe(recieved_new_recipe)
{
  
  try
  {
    
    // 1 : displaying a spinner until the recipe has not yet been uploaded
    Add_recipe_view.render_spinner_method()
    
    // 2 : logic for uploading the actual recipe
    await Model.upload_recipe_function(recieved_new_recipe)
    console.log(Model.state_object.recipe_object)

    // 3 : displaying th uploaded recipe on the main view 
    recipe_view.render_method(Model.state_object.recipe_object)

    // 4 : adding the new uploaded recipe onto the bookmarked recipe menu
    Bookmarks_view.render_method(Model.state_object.bookmarks_array)

    // 5 : changing the hash in the url 
    // window.location.hash = `${Model.state_object.recipe_object.id}`  // my logic for chainging the api 
    window.history.pushState(null, "" , `#${Model.state_object.recipe_object.id}`)


    // 5 : after the recipe has been uploaded we display the success message on the display
    Add_recipe_view.success_display_method() ;

    // console.log(Model.state_object.bookmarks_array)

     
    

       
    setTimeout( function()
    {
      Add_recipe_view.toggle_window_method() ;
    } , Config.WINDOW_CLOSING_TIME * 1000 )

  }
  catch(error_object)
  {
    console.error(error_object )
    Add_recipe_view.error_display_method(error_object.message)
  }

}


function new_feture()
{
  console.log("this is the new new feture branch")
}

function init()
{
  Bookmarks_view.add_event_listener_function_control_bookmarks(control_bookmarks_function)
  recipe_view.add_handeler_render_function(control_recipes)
  recipe_view.add_event_listener_function_servings_up_down(control_servings_function)
  recipe_view.add_event_listener_function_bookmark_btn(control_add_bookmark_function)
  search_view.add_handeler_render_function(control_search_result_function)
  Pagination_view.event_listner_function_prev_next_buttons(control_pagination)
  Add_recipe_view._add_event_listener_function_upload_form_button(control_add_recipe)
  console.log("")
  console.log("Initial commit five")
  
}
init() ;





/////////////////////////////////////////////////////////////////////////////









