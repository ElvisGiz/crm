const { Client, Pool } = require('pg')
const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tasks',
    password: 'admin347',
    port: 5432,
  })
client.connect()
function query(query, data, callback){
    //if(client)
    
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
        case "track":
            queryText = `UPDATE tasks SET spenttime = '${data.spenttime}' WHERE id='${data.id}';`
            break;    
        case "close":
            queryText = `UPDATE tasks
            SET dateofclose = '${data.dateofclose}' WHERE id='${data.id}';`
            break;    
        case "select":
            queryText = `SELECT * FROM tasks WHERE dateofclose is NULL`
            break;      
    }    
    
    client.query(queryText, (err, res) => {
            if(err){
                console.log(err)
            }else{
                if(callback){
                    callback(res.rows)
                }
            }
            
        })
        
    
}
module.exports.query = query