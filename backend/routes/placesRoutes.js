import express from "express";

import HttpError from "../models/httpError.js";

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire States Building",
    description: "Building in NYC",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "123 Main St",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find a place with place id: " + placeId, 404)
    );
  }

  res.status(200).json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (userPlaces.length === 0) {
    return next(
      new HttpError("Could not find a place with user id: " + userId, 404)
    );
  }

  res.status(200).json({ places: userPlaces });
});

router.use((req, res, next) => {
  return next(new HttpError("Error, route not found ", 404));
});

export default router;
