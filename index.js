const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middle wares
app.use(cors());
app.use(express.json());

// -->

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x6ceglb.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// =>
async function run() {
  try {
    const serviceCollection = client.db("serviceReview").collection("services");

    app.get("/home", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).limit(3);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));
// --<
app.get("/", (req, res) => {
  res.send("Service review server is running");
});

app.listen(port, () => {
  console.log("Service review Server is running on port:", port);
});

module.exports = app;
