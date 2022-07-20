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
        case create:
            queryText = `INSERT INTO tasks (title, text, dateofcreate, priority) VALUES (${data.title ? data.title : ''}, ${data.text ? data.text : ''}, ${data.dateofcreate}, ${data.priority ? data.priority : 0})`
            break;
        case comment:
            queryText = ``
            break;
        case close:
            queryText = ``
            break;    
    }    

    client.query(queryText, (err, res) => {
        console.log(err, res)
        client.end()
    })
}
module.exports.query = query