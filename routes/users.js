const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
// import validator
const {
  validateUserBody,
  validateUserUpdateBody,
} = require("../middlewares/validation");

// All routes below require authentication
router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdateBody, updateUserProfile); // validate body before updating

module.exports = router;
