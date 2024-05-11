const Router = require("koa-router");
const {
  getUser,
  removeUser,
  updateUser,
  createUser,
} = require("../controller/users");
const router = new Router();

router.get("/user/:id", getUser);
router.put("/create", createUser);
router.delete("/delete/:id", removeUser);
router.put("/update/:id", updateUser);

module.exports = router;
