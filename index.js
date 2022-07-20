const fs = require("fs")
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
    reply.send(request.body)
  })
  
  // Run the server!
  fastify.listen({ port: 80 }, function (err, address) {
    console.log(address)
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })