//import express
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mainRouter=require('./routes/index')
const productRouter=require('./routes/products');
const ErrorHandler = require("./errors/ErrorHandler");
//const apikeyMiddleware=require('./middlewares/apiKeys')




app.set('view engine','ejs')
// console.log(app.get('view engine'))
// by default it will see all the views in view folder
console.log(app.get('views'))
//but we can change this
// app.set('views',path.resolve(__dirname)+'/templates')
// console.log(app.get('views'))


// static middleware
//global middleware
//app.use(apikeyMiddleware)
app.use(express.static("public"));
app.use(express.json());
app.use(productRouter)
app.use(mainRouter)



//error handling
app.use((request,response,next)=>{

  return response.json({message:'Page not foun d'})



})


//error handling middleware
app.use((error,request,response,next)=>{

  if(error instanceof ErrorHandler ){

    // response.status(422).json({message: error.message})
    response.status(error.status).json({
      error:{
        message:error.message,
        status:error.status
      }
    })


  }else{

    response.status(500).json({
      error:{
        message:error.message,
        status:error.status
      }
    })

  }

  // console.log('Error caught',error.message)
  // next()

})


app.listen(PORT, () => {
  console.log(`listeneing on port ${PORT}`);
});

// app.get("/", (request, response) => {
// //   response.send("Hello From Express");
// //   response.send("<h1>Hello</h1>");
// //   response.sendFile(path.resolve(__dirname) + "/index.html");
//   response.render('index',{

//     title:'my home page'
//   });
// });
// app.get("/about", (request, response) => {
// //   response.send("Hello From Express");
// //   response.send("<h1>Hello</h1>");
// //   response.sendFile(path.resolve(__dirname) + "/about.html");
//   response.render( "about", {

//     title:'my about page'

//   });
// });


// app.get("/download",(request,response)=>{

//     response.download(path.resolve(__dirname)+'/about.html');


// })