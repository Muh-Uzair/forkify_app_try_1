import * as Config from "./config"


// const timeout = function (seconds) {
//     return new Promise(function (_, reject) {
//       setTimeout(function () {
//         reject(new Error(`Request took too long! Timeout after ${s} second`));
//       }, seconds * 1000);
//     });
//   };


function request_time_out_function(seconds)
{
    return new Promise( function(_, reject)
    {
        setTimeout(function()
        {
            reject(`Request took too long! Timeout after ${seconds} second`)
        } , seconds*1000)
    })
}


function get_fetch_pro_function(api_url , upload_data_recieved_recipe_object)
{
    let fetch_pro ;
    if(upload_data_recieved_recipe_object)
    {
        
        fetch_pro = fetch(api_url , {

            method : "POST" ,
            headers : {

                "Content-Type" : "application/json"
            },
            body: JSON.stringify(upload_data_recieved_recipe_object),
        })
    }
    else
    {
        fetch_pro = fetch(api_url) ;
    }

    return fetch_pro
}
export async function get_and_send_JSON(api_url , upload_data_recieved_recipe_object = undefined )
{

    
    let fetch_pro = get_fetch_pro_function(api_url ,upload_data_recieved_recipe_object)

    try
    {

        const response_object_1 = await Promise.race([fetch_pro , request_time_out_function(Config.TIME_OUT_SECONDS) ])
        const data_object_1 = await response_object_1.json() 
        if( response_object_1.ok === false )
        {
            throw new Error(`${data_object_1.message}`)    
        }
        
        return data_object_1 ;

    }
    catch(error_object)
    {
        throw error_object
    }


}


// export async function get_recipe_data_object_json(api_url)
// {
//     try
//     {

//         const response_object_1 = await Promise.race([fetch(api_url) , request_time_out_function(Config.TIME_OUT_SECONDS) ])
//         const data_object_1 = await response_object_1.json()
//         if( response_object_1.ok === false )
//         {
//             throw new Error(`${data_object_1.message}`)    
//         }
        
//         return data_object_1 ;

//     } 
//     catch(error_object)
//     {
//         throw error_object
//     }
// }
// export async function  send_JSON(api_url , upload_data_recieved_recipe_object)
// {
//     try
//     {
//         const fetch_pro = fetch(api_url , {

//             method : "POST" ,
//             headers : {

//                 "Content-Type" : "application/json"
//             },
//             body: JSON.stringify(upload_data_recieved_recipe_object),
//         })

//         const response_object_1 = await Promise.race([fetch_pro , request_time_out_function(Config.TIME_OUT_SECONDS) ])
//         const data_object_1 = await response_object_1.json() 
//         if( response_object_1.ok === false )
//         {
//             throw new Error(`${data_object_1.message}`)    
//         }
        
//         return data_object_1 ;

//     }
//     catch(error_object)
//     {
//         throw error_object
//     }

// }

