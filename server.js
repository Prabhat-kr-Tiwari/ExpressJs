//import express
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const mainRouter=require('./routes/index')




app.set('view engine','ejs')
// console.log(app.get('view engine'))
// by default it will see all the views in view folder
console.log(app.get('views'))
//but we can change this
// app.set('views',path.resolve(__dirname)+'/templates')
// console.log(app.get('views'))


// static middleware

app.use(express.static("public"));
app.use(mainRouter)

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