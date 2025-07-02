// creating a server using http

const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end("radhe radhe")
    }

    if(req.url==='/profile'){
        res.end("hello word")
    }
})


server.listen(3000)