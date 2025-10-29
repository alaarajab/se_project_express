const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

// All routes below require authentication
router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;
