import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import HttpError from "./models/httpError.js";
import placesRoutes from "./routes/placesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const PORT = 5000;

const app = express();

app.use(express.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(new HttpError("could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.e6fjc.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
