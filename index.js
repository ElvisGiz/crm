const fs = require("fs");
const db = require("./db");
const fastify = require("fastify")();
fastify.register(require("@fastify/cors"), {
  // put your options here
});

fastify.get("/", function (request, reply) {
  let data = fs.readFileSync("./public/index.html", "utf-8");
  reply.type("text/html");
  reply.send(data);
});

fastify.post("/", function (request, reply) {
  reply.type("aplication/json");
  reply.send(request.body);
});

fastify
  .post("/db", function (request, reply) {
    reply.type("aplication/json");
    try {
      db.query(request.headers.query, request.body);
    } catch (err) {
      reply.send(err);
    }
    console.log("ПОСТ ДБ ЗАПРОС");
  })
  .get("/db", function (request, reply) {
    reply.type("aplication/json");
    db.query("select", "", (res) => {
      reply.send(res);
    });

    console.log("ГЕТ ДБ ЗАПРОС");
  })
  .get("/db/comments", function (request, reply) {
    reply.type("aplication/json");
    db.query("selectComments", "", (res) => {
      reply.send(res);
    });

    console.log("ГЕТ ДБ ЗАПРОС");
  });
// Run the server!
fastify.listen({ port: 80 }, function (err, address) {
  console.log(address);
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
