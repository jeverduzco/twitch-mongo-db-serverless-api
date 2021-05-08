const { MongoClient } = require("mongodb");
const url = process.env["CosmosDBString"];
const client = new MongoClient(url);

module.exports = async function (context, req) {
    if (req.body && req.body._id) {
        await client.connect();
        const database = client.db("mylife");
        const collection = database.collection("tasks");
        await collection.insertOne(req.body);
      
        return (context.res = {
          status: 200,
          body: "Tarea guardada con éxito",
        });
    } else {
        return (context.res = {
            status: 400,
            body: "Debe ser un documento válido",
          });
    }
};