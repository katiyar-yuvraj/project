const mongoes = require("mongoose");

const connect = async () => {
  try {
    const connection = await mongoes.connect(process.env.DB_URI);
    console.log(
      `success to connect to db ${connection.Collection.collectionName}`
    );
  } catch (error) {
    console.log("unable to connect to server ");
  }
};

module.exports = connect