import React from "react";

import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
