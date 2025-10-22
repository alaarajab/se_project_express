const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateUserProfile,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
router.post("/signup", createUser); // signup route
router.post("/signin", login); // login route

// Protected routes (require auth)
router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUserProfile);

module.exports = router;
