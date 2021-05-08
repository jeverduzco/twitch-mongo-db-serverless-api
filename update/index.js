const { MongoClient, ObjectId } = require("mongodb");
const url = process.env["CosmosDBString"];
const client = new MongoClient(url);

module.exports = async function (context, req) {
    if (req.body && req.body._id) {
        await client.connect();
        const database = client.db("mylife");
        const collection = database.collection("tasks");
        await collection.replaceOne({"_id": req.body._id}, req.body);
      
        return (context.res = {
          status: 200,
          body: "Tarea actualizada con éxito",
        });
    } else {
        return (context.res = {
            status: 400,
            body: "Debe ser un ID válido",
          });
    }
};