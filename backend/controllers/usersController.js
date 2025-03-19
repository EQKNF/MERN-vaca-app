import { v4 as uuidv4 } from "uuid";
import HttpError from "../models/httpError.js";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Matt",
    email: "matt@gmail.com",
    password: "password",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exist", 422)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError("Could not identify user, wrong credentials", 401)
    );
  }

  res.status(200).json({ message: "Login successful" });
};

export { getUsers, signup, login };
