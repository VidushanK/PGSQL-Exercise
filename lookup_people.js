const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const args = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text",   args, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    for(let i = 0; i < result.rows.length ; i++){
      const output = result.rows[i];
      console.log(`- ${output.id} : ${output.first_name}, born '${output.birthdate}'`);
    }
    client.end();
  });
});
