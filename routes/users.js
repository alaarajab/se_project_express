const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
// import validator
const { validateUserBody } = require("../middlewares/validation");

// All routes below require authentication
router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateUserProfile); // validate body before updating

module.exports = router;
