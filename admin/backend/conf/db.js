const mongoes = require("mongoose");

const connect = async () => {
  try {
    const db = await mongoes.connect(process.env.DB_URI);
    console.log(
      `success connect to db ${db.connection.host} ${db.connection.port}`
    );
  } catch (error) {
   console.log("unable to connect to server in connect", error.message);
   throw error;
  }
};

module.exports = connect