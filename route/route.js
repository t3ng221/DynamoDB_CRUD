const Router = require("koa-router");
const {
  getUser,
  removeUser,
  updateUser,
  createUser,
  getUserByEmail,
} = require("../controller/users");
const router = new Router();

router.get("/user/:email", getUserByEmail);
router.get("/user/:id", getUser);

router.post("/create", createUser);
router.delete("/delete/:id", removeUser);
router.put("/update/:id", updateUser);

module.exports = router;
