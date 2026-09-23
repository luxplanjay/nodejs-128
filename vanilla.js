import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const carsPath = path.join(import.meta.dirname, "assets", "cars.json");
const carsJson = await fs.readFile(carsPath, { encoding: "utf-8" });
const cars = JSON.parse(carsJson);

const server = http.createServer((req, res) => {
  // GET /
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Hello World!" }));
  }

  // GET /cars
  if (req.method === "GET" && req.url === "/cars") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(cars));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3005, () => {
  console.log("Server is running on localhost:3005");
});
