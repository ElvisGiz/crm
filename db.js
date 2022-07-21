const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tasks',
    password: 'admin347',
    port: 5432,
  })

function query(query, data, callback){
    
    client.connect()
    let queryText = ``
    switch(query){
        case "create":
            queryText = `INSERT INTO tasks (title, text, dateofcreate, priority) 
            VALUES ('${data.title}', '${data.text ? data.text : ""}', 
            '${data.dateofcreate ? data.dateofcreate : ""}', '${data.priority ? data.priority : 0}')`
            break;
        case "comment":
            queryText = `UPDATE tasks SET comment = '${data.comment}' WHERE id='${data.id}';`
            break;
        case "close":
            queryText = `UPDATE tasks
            SET dateofclose = '${data.dateofclose}' WHERE id='${data.id}';`
            break;    
        case "select":
            queryText = `SELECT * FROM tasks`
            break;      
    }    
    
    client.query(queryText, (err, res) => {
        if(err){
            console.log(err)
        }else{
            callback(res.rows)
            console.log("сообщение от модуля"+" "+res.rows)
        }
        client.end()
    })
}
module.exports.query = query