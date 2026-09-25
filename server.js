import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(helmet());

app.use((req, res, next) => {
  console.log("logRequest", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("logTime", new Date().toLocaleTimeString());
  next();
});

app.use((req, res, next) => {
  console.log("Збираємо аналітику!!!");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get("/products", (req, res) => {
  res.status(200).json([]);
});

app.get("/products/:productId", (req, res) => {
  const { productId } = req.params;
  res.status(200).json({ id: productId });
});

app.get("/get-error", (req, res) => {
  throw new Error("Super bad error");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  // localhost - оточення розробки DEV error.stack
  // vercel/render - оточення продакшена PROD error.message

  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    error: isProduction ? error.message : error.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
