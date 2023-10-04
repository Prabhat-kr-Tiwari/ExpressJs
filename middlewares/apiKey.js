const ErrorHandler = require("../errors/ErrorHandler")

function apiKey(request,response,next){


    const api_key='1234567'
    console.log(request.query.api_key)

    const userApiKey=request.query.api_key
    //checking the api key
    if(userApiKey && userApiKey==api_key){

          //if we not call this method then our request will get hang
    //har middleware ke baad next middleware call karna hota hai
    
      next()
    }else{
        // response.json({
        //     message:'not allowed'
        // })
        next(ErrorHandler.forbidden())

    }
  
}
module.exports=apiKey