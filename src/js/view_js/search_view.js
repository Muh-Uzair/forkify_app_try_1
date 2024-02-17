


class search_view
{


    _parent_element = document.querySelector(".search")



    get_search_item()
    {

         return this._parent_element.querySelector(".search__field").value
    }


    add_handeler_render_function(recieved_function)
    {

        this._parent_element.addEventListener("submit" , function(event_object)
        {

            
                        
            event_object.preventDefault() ;
            recieved_function() ;
        })

    }

    clearing_search_field_function()
    {
        this._parent_element.querySelector(".search__field").value = `` ;
    }


}


export default new search_view() ;