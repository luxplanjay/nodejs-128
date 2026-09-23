import express from "express";
import fs from "node:fs/promises";
import path from "node:path";

const carsPath = path.join(import.meta.dirname, "assets", "cars.json");
const carsJson = await fs.readFile(carsPath, { encoding: "utf-8" });
const cars = JSON.parse(carsJson);

const app = express();

// GET /
app.get("/", (req, res) => {
  // controller
  res.status(200).json({ message: "Hello World!" });
});

// GET /cars
app.get("/cars", (req, res) => {
  res.status(200).json(cars);
});

// POST /cars
app.post("/cars", (req, res) => {
  console.log(req.method, req.url);
  res.status(201).json({});
});

app.listen(3005, () => {
  console.log(`Server is running on localhost:3005`);
});
