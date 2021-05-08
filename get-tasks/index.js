const { MongoClient, ObjectId } = require("mongodb");
const url = process.env["CosmosDBString"];
const client = new MongoClient(url);

module.exports = async function (context, req) {
        await client.connect();
        const database = client.db("mylife");
        const collection = database.collection("tasks");
        const tasks = await collection.find({}).toArray();

        if (tasks != 0){
            return (context.res = {
                status: 200,
                body: tasks,
              });
        } else {
            return (context.res = {
                status: 204
              });
        }
};