import {aysnc} from "regenerator-runtime"
import * as Config from "./config.js"
import * as Helpers from "./helpers.js"


export const state_object = 
{
    recipe_object : {} ,
    search:
    {

        search_item:"" ,  // search item and the results against it
        search_results_array: [] ,
        current_page : 1 ,
        results_per_page : Config.results_per_page ,  
    },
    bookmarks_array: [] ,
} ;


// this function gives us the recipe data according to id
export async function load_recipe_function(recipe_id)
{
    
    try
    {
        const data_object_1 = await Helpers.get_and_send_JSON(`${Config.API_URL}/${recipe_id}?key=${Config.API_KEY}`)

        const {recipe : recipe_object_dummy } = data_object_1.data ;
        state_object.recipe_object = recipe_object_dummy ;
         

        if(state_object.bookmarks_array.some( recipe => recipe.id === recipe_id))
        state_object.recipe_object.bookmarked = true ;
        else state_object.recipe_object.bookmarked = false ;

        
    }
    catch(error_object)
    {
        throw error_object
    }
    


    // console.log(state_object.recipe_object)
} 
// this function give us the liast of search results aainst an a query
export async function load_seacrh_results_function(search_item)
{

    try
    {
        state_object.search.search_item = search_item ;
        const search_result_data_object_1 = await Helpers.get_and_send_JSON(`${Config.API_URL}/?search=${search_item}&key=${Config.API_KEY}`)
        
        state_object.search.search_results_array = search_result_data_object_1.data.recipes ;
        state_object.search.current_page = 1 ;

    }
    catch(error_object)
    {
        throw error_object 
    }

}
export function get_search_result_page(current_page = state_object.search.current_page) // this function give only a part of the results_array
{
    state_object.search.current_page = current_page

    const start = (current_page -  1 ) * Config.results_per_page ; // 0  9 19 
    const end = ( current_page * Config.results_per_page ) ; //      9 19 29

    // start = (2-1) * 10 = 10 | 10 se start hoga
    // end = (2 * 10 ) | 20 but slice does not include last so last would be 19 

    return state_object.search.search_results_array.slice(start , end) ;


}
export function update_servings_function(number_of_servings)
{

    
    state_object.recipe_object.ingredients.forEach(val => 
    {
        // console.log(val.quantity)
        // formula for presenting new servings
        // new_quantity =( old_qt * new_seringd ) / old_servings

        val.quantity = (val.quantity * number_of_servings ) / state_object.recipe_object.servings
        
    });
    state_object.recipe_object.servings = number_of_servings ;
    // console.log(state_object.recipe_object)
}
function storing_in_local_storage_function()
{
    localStorage.setItem( `bookmarks` , JSON.stringify(state_object.bookmarks_array))
}
export function add_bookmark_function(recieved_reciepe_object)
{
    
    // 1 : pushing a recipe into bookmarks array
    state_object.bookmarks_array.push(recieved_reciepe_object)

    // 2 : marking the current loaded recipe as bookmarked 
    if( recieved_reciepe_object.id === state_object.recipe_object.id)  state_object.recipe_object.bookmarked = true ; // this will allow us to show this recipe as bookmarked in recipe view

    // state_object.recipe_object.bookmarked = true ;
    // console.log(state_object.bookmarks_array)
    // console.log(state_object.recipe_object)
    storing_in_local_storage_function() ;
}
export function delete_bookmark_function(recieved_recipe_id)
{

    // finding index of that recipe in bookmarks_array which matches the recieved_reciepe_id
    const recipe_id_index = state_object.bookmarks_array.findIndex( val => val.id === recieved_recipe_id)
    // then we remove that recipe from array 
    state_object.bookmarks_array.splice(recipe_id_index , 1)
    // make the bookmark property on it as false
    if( recieved_recipe_id === state_object.recipe_object.id)  state_object.recipe_object.bookmarked = false ;

    storing_in_local_storage_function()
}
function init()
{
    const data_from_local_storage = localStorage.getItem("bookmarks")
    if(data_from_local_storage) state_object.bookmarks_array = JSON.parse(data_from_local_storage)

    // console.log(state_object.bookmarks_array)
}
init();
function clear_book_marks_function()
{
    localStorage.clear("bookmarks")
}
// clear_book_marks_function() 
export async function upload_recipe_function(recieved_new_recipe)
{
    // console.log(recieved_new_recipe)    
    try
    {

            // console.log(recieved_new_recipe) 
            // 1 : convertig the recieved recieved_new_recipe which is an object into array of entries
            let ingredients_array = Object.entries(recieved_new_recipe)
            // console.log(ingredients_array)

            // 2: this will filter only ingredients from entries and those ingrediest which are not empty 
            ingredients_array = ingredients_array
            .filter( ingredient => ingredient[0].slice(0,10) === "ingredient" && ingredient[1] !== "")
            .map( val => 
            {
                const ing_arr = val[1].split(",").map( val => val.trim())
                // console.log(ing_arr)
                if(ing_arr.length !== 3 ) throw new Error(`Wrong ingredient format`)
                const [quantity, unit, description] = ing_arr
                return {quantity: quantity ? +quantity : null , unit, description}
            })
            // console.log(ingredients_array)

            // let st = "ingredients"
            // console.log(st.slice(0,10))

            // 3 : converting the data into correct format which the forkify API accpets from the recieved_new_recipe
            const recipe = 
            {
                title : recieved_new_recipe.title,
                source_url : recieved_new_recipe.sourceUrl,
                image_url : recieved_new_recipe.image,
                publisher : recieved_new_recipe.publisher, 
                cooking_time : +recieved_new_recipe.cookingTime,
                servings : +recieved_new_recipe.servings,
                ingredients : ingredients_array ,
                
            }
            // console.log(recipe)
            const our_created_recipe_recived_from_api = await Helpers.get_and_send_JSON(`${Config.API_URL}?key=${Config.API_KEY}` , recipe) // api key : 196d3a4e-5f09-43ae-8407-09f09015bd26
            // console.log(our_created_recipe_recived_from_api.data.recipe)

            state_object.recipe_object = our_created_recipe_recived_from_api.data.recipe
            add_bookmark_function(state_object.recipe_object)
            
    }
    catch(error_object)
    {
        throw error_object
    }


} 
