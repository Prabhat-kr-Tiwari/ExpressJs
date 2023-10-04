const router = require("express").Router();
const apikeyMiddleware=require('../middlewares/apiKey')
module.exports = router;


//router middleware
// router.use(apikeyMiddleware)

router.get("/", (request, response) => {
  response.render("index", {
    title: "my home page",
  });
});

router.get("/about", (request, response) => {
  response.render("about", {
    title: "my about page",
  });
});

router.get("/download",(request,response)=>{

    response.download(path.resolve(__dirname)+'/about.html');


})


// multiple middleware
// router.get("/api/products",[apikeyMiddleware,apikeyMiddleware],(request,response)=>{
  
// router.get("/api/products",apikeyMiddleware,(request,response)=>{

//     response.json(

//         [
//             {
//                 id:'123',
//                 name:'Chrome',
//             },
//             {
//                 id:'124',
//                 name:'Firefox',
//             }
//         ]
//     );


// })
