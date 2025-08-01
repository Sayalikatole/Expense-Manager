const http = require('http');

const userData=[{
    id: 1,
    name: "John Doe", 
    email: "john@123",
    age: 30,
},
{
    id: 2,
    name: "John Doe", 
    email: "john@223",
    age: 30,
},
{
    id: 3,
    name: "John Doe", 
    email: "john@123",
    age: 30,
},
]

http.createServer((req,resp)=>{
    resp.setHeader('Content-Type', 'application/json');
resp.write(JSON.stringify(userData));
resp.end();
}).listen(3000)