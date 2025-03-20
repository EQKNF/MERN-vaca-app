import HttpError from "../models/httpError.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

let DUMMY_PLACES = [
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

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

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

export {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
