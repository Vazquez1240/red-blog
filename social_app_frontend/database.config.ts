import Dexie from "dexie";

const database = new Dexie("database");

database.version(1).stores({
  users: "access, refresh, uuid, user_id, is_superuser",
});

export const userTable = database.table("users");

export default database;
