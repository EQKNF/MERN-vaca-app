import HttpError from "../models/httpError.js";
import { v4 as uuidv4 } from "uuid";

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find a place with place id: " + placeId, 404)
    );
  }

  res.status(200).json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (userPlaces.length === 0) {
    return next(
      new HttpError("Could not find a place with user id: " + userId, 404)
    );
  }

  res.status(200).json({ places: userPlaces });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const newPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(newPlace);

  res.status(201).json({ places: newPlace });
};

export { getPlaceById, getPlaceByUserId, createPlace };
