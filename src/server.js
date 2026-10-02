import express from "express";
import cors from "cors";
import helmet from "helmet";
import { readFileSync } from "node:fs";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import studentsRoutes from "./routes/studentsRoutes.js";

const swaggerDocument = JSON.parse(
  readFileSync(new URL("../swagger.json", import.meta.url), "utf8"),
);

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
