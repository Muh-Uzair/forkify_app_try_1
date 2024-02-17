import View from "./View.js"
import icons from "url:../../img/icons.svg"




class pagination_view extends View
{

    _parent_element = document.querySelector('.pagination')


    _next_button_markup()
    {
        return`
            <button data-goto="${this._data.current_page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.current_page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
    }
    _prev_button_markup()
    {
        return`
        <button data-goto="${this._data.current_page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.current_page - 1}</span>
        </button>
    `
    }
    _generate_markup()
    {
        
        // finding how many number of pages there will be 
        
        const num_total_pages = Math.ceil(this._data.search_results_array.length / this._data.results_per_page) ;
        // console.log(num_total_pages , this._data.current_page)
        // console.log(this._data)

        // Here we are dealing with 4 scenarios
        
        // 1 : On page_1 , and there are other page | no prev button but next both 
        if( this._data.current_page === 1 && num_total_pages > 1 )
        {
            return this._next_button_markup()
        }

        
        // 2 : On last page | no next button only prev button available
        if(this._data.current_page === num_total_pages && num_total_pages > 1 )
        {
            return this._prev_button_markup()
        }


        // 3 : On other page | next & prev both ava ialale 
        if( this._data.current_page < num_total_pages )
        {
            return`
                ${this._prev_button_markup()}
                ${this._next_button_markup()}
            `
        }


        // 4 : On page_1, and there are no other pages | no next and prev button 
        return` `

    }


    // this is a publisher function   & the recieved function is a subscriber which will be executed when we click on prev or next button 
    event_listner_function_prev_next_buttons(recieved_function)
    {
        this._parent_element.addEventListener("click" , function(event_info_object)
        {
            const btn = event_info_object.target.closest(".btn--inline") // reason for this line is that we might not click on the button it self but we might click on text in that button or any thing else , in those scenarios we must be able to handle those
            // console.log(btn) 

            if(!btn) return

            const go_to_page_number = Number(btn.dataset.goto )
            

            recieved_function(go_to_page_number) ;


        })
    } 



}


export default new pagination_view() ;