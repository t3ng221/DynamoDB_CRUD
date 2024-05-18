const Router = require("koa-router");
const {
  getUser,
  removeUser,
  updateUser,
  createUser,
  getUserByEmail,
} = require("../controller/users");
const router = new Router();

router.get("/users/email/:email", getUserByEmail);
router.get("/user/:id", getUser);

router.post("/registration", createUser);
router.delete("/delete/:id", removeUser);
router.put("/user/update/:id", updateUser);

module.exports = router;
