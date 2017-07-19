
const settings = require("./settings"); // settings.json
const knex = require("knex") ({
  client:'pg',
  connection: {
    socketPath : settings.port,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
  }
});
function addpeople (firstname, lastname, birthdate){
knex('famous_people')
.insert([{
  first_name: firstname,
  last_name: lastname,
  birthdate: birthdate
}])
.then(function(err, result){
  console.log('finished adding');
})
}
addpeople(process.argv[2],process.argv[3],process.argv[4]);
