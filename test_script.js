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

client.connect((err) => {
    console.log(err);
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result); //output: 1
    client.end();
  });
});