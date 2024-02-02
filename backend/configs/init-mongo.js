const dbName = "todo-test";
const todoDB = db.getSiblingDB(dbName);
console.log("found the sibling db: " + todoDB);

console.log("Creating a user in mongodb");
todoDB.createUser({
  user: "todo-user",
  pwd: "w3rvNEgfKRz2NEl7",
  roles: [
    {
      role: "readWrite",
      db: dbName,
    },
  ],
});
