const router=require('express').Router()

const ErrorHandler = require('../errors/ErrorHandler');
const apiKeyMiddleware=require('../middlewares/apiKey')
let products=require('../productData')


module.exports=router;


//this is for the view products
router.get('/products',(request,response)=>{
    response.render('products',{
        title:'My product page'
    })

})

router.get('/api/products',(request,response)=>{
    response.json(products)
})
router.post('/api/products',apiKeyMiddleware,(request,response,next)=>{

    // try{
    //     console.log(city)
    // }catch(error){
    //     next(ErrorHandler.serverError(error.message))
    // }
    const {name,price}=request.body

    if(!name||!price){
        //422 un progressable request
       // return response.status(422).json({error:'All fields are required'})


       next(ErrorHandler.validationError('Name and price field are required'))
    //    throw new Error('All fields are required')
    }

    const product={

        name:name,
        price:price,
        id:new Date().getTime().toString()
    }
    products.push(product)


    console.log(request.body)
    response.json(product)
}) 

router.delete('/api/products/:productid',(request,response)=>{


    products=products.filter((product)=>request.params.productid  !==product.id)
    response.json({status:'ok'})


})