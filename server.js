//import express
const express =require('express')
const app=express()



const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`listeneing on port ${PORT}`)
})

app.get('/',(request,response)=>{

    response.send('Hello From Express')

})