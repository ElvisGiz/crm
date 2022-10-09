const { Client, Pool } = require("pg");
const generateUUID = require("./generateUUID");
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tasks",
  password: "admin347",
  port: 5432,
});
client.connect();
function query(query, data, callback) {
  //if(client)

  let queryText = ``;
  let uuid = generateUUID.generateUUID();
  switch (query) {
    case "create":
      queryText = `INSERT INTO tasks (title, text, dateofcreate, priority, uuid) 
            VALUES ('${data.title}', '${data.text ? data.text : ""}', 
            '${data.dateofcreate ? data.dateofcreate : ""}', '${
        data.priority ? data.priority : 0
      }', '${uuid}')`;
      break;
    case "comment":
      queryText = `INSERT INTO comments (uuid, comment) VALUES ('${data.uuid}', '${data.comment}')`;
      break;
    case "track":
      queryText = `UPDATE tasks SET spenttime = '${data.spenttime}' WHERE id='${data.id}';`;
      break;
    case "close":
      queryText = `UPDATE tasks
            SET dateofclose = '${data.dateofclose}' WHERE id='${data.id}';`;
      break;
    case "select":
      queryText = `SELECT * FROM tasks WHERE dateofclose is NULL`;
      break;
    case "selectComments":
      queryText = `SELECT * FROM comments`;
      break;
  }

  client.query(queryText, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (callback) {
        callback(res.rows);
      }
    }
  });
}
module.exports.query = query;
