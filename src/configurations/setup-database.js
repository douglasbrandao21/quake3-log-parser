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

db = db.getSiblingDB("test-quake3");
db.createUser({
  user: "admin-test",
  pwd: "admin-test",
  roles: [{ role: "readWrite", db: "test-quake3" }],
});
db.createCollection("games");
