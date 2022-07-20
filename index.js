const fs = require("fs")
//const db = require("./db")
const fastify = require('fastify')()
fastify.register(require('@fastify/cors'), { 
    // put your options here
  })
  
  fastify.get('/', function (request, reply) {
    let data = fs.readFileSync("./public/index.html", "utf-8")
    reply.type('text/html')
    reply.send(data)
  })

  fastify.post("/", function (request, reply) {
    reply.type("aplication/json")
    reply.send(request.body)
  })

  fastify.post("/db", function (request, reply) {
    reply.type("aplication/json")
    try{
      query("create", request.body)
      reply.send(request.body)
    }catch(err){
      reply.send(err)
    }
      
    
  })
  const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tasks',
    password: 'admin347',
    port: 5432,
  })

function query(query, data){
    
    client.connect()
    let queryText = ``
    switch(query){
        case "create":
            queryText = `INSERT INTO tasks (title, text, dateofcreate, priority) VALUES ('${data.title}', '${data.text ? data.text : ""}', '${data.dateofcreate ? data.dateofcreate : ""}', '${data.priority ? data.priority : 0}')`
            break;
        case "comment":
            queryText = ``
            break;
        case "close":
            queryText = ``
            break;    
    }    

    client.query(queryText, (err, res) => {
        console.log(err, res)
        client.end()
    })
}
  // Run the server!
  fastify.listen({ port: 80 }, function (err, address) {
    console.log(address)
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })