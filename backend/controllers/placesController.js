import { validationResult } from "express-validator";

import HttpError from "../models/httpError.js";
import getCoordsForAddress from "../util/location.js";
import Place from "../models/place.js";

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(err);
  }

  if (!place) {
    const err = new HttpError(
      "Could not find a place with place id: " + placeId,
      404
    );
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userPlaces;
  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError(
      "Fetching place with id: " + userId + " Failed, please try again later",
      500
    );
    return next(err);
  }

  if (!userPlaces || userPlaces.length === 0) {
    return next(
      new HttpError("Could not find a place with user id: " + userId, 404)
    );
  }

  res.status(200).json({
    places: userPlaces.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description, address, creator } = req.body;

  let coords;
  try {
    coords = getCoordsForAddress();
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    location: coords,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    creator,
  });

  try {
    await newPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating placed failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: newPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Updating place with id: " + placeId + " Failed, please try again later",
      500
    );
    return next(err);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(err);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);

    if (!place) {
      const err = new HttpError(`Place with id ${placeId} not found.`, 404);
      return next(err);
    }
  } catch (error) {
    const err = new HttpError(
      "Fetching place failed, please try again later.",
      500
    );
    return next(err);
  }

  try {
    await place.deleteOne();
  } catch (error) {
    const err = new HttpError(
      `Something went wrong, could not delete place with id ${placeId}.`,
      500
    );
    return next(err);
  }

  res.status(200).json({ message: "Deleted place." });
};

export {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
