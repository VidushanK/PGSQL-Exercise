
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);

const knex = require("knex") ({
  client:'pg',
  connection: {
    socketPath : settings.port,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

knex('famous_people')
  .where(function() {
    this.where('first_name', args[0])
  })
  .orWhere({
    last_name : args[0]
  }).then(function (result){
    for(let i = 0; i < result.length; i++) {
      const output = result[i];
      console.log(`- ${output.id} : ${output.first_name} ${output.last_name}, born '${output.birthdate}'`);
    }
  });
