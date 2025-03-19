import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/placesRoutes.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use("/api/places", placesRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
