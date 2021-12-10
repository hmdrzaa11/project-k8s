let express = require("express");
let keys = require("./keys");
let cors = require("cors");

let app = express();
app.use(cors());
app.use(express.json());

let { Pool } = require("pg");
let pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("error", () => console.log("Lost PG connection"));

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values(number INT)")
    .catch((err) => console.log(err));
});

let redis = require("redis");
let redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

let redisPublisher = redisClient.duplicate();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values/all", async (req, res) => {
  let values = await pgClient.query("SELECT * FROM values;");
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  let index = req.body.index;
  if (parseInt(index) > 40) return res.status(422).send("Index too high");
  redisClient.hset("values", index, "Nothing yet");
  redisPublisher.publish("insert", index);
  await pgClient.query("INSERT INTO values (number) VALUES ($1)", [index]);
  res.send({ working: true });
});

app.listen(5000, () => console.log("Listening..."));
