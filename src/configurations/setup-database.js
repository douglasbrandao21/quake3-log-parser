db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "quake3",
    },
  ],
});

db.createCollection("games");
