const express= require("express");
const App=express()
App.get('/',(request,response)=>{
    response.setHeader("content-type","text/html").send("<h1>hello world</h1>")
    // response.setHeader('Content-Type', 'text/html').send("<h1>hello world</h1>")
})

App.listen('3001',()=>{
    console.log("server listening 3001")
})