const express = require("express");
const controllers = require("../controllers/auth");
const router = express.Router();
const token = require("../middleware/checToken");
const images = require("../middleware/file");
const { check } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "images" });

router.post(
  "/login",
  [
    check("email", "All fields must be filled").notEmpty(),
    check("password", "All fields must be filled").notEmpty(),
  ],
  controllers.login
);
router.post(
  "/register",
  [
    check("email", "All fields must be filled").notEmpty(),
    check("password", "All fields must be filled").notEmpty(),
    check("name", "All fields must be filled").notEmpty(),
    check("dob", "All fields must be filled").notEmpty(),
  ],
  controllers.register
);
router.get("/get", token.tokenChecking, controllers.getUsers);
router.post(
  "/update",
  [check("oldPassword", "All fields must be filled").notEmpty()],
  token.tokenChecking,
  controllers.update
);
router.delete("/delete", token.tokenChecking, controllers.delete);
router.get("/bytoken", token.tokenChecking, controllers.getToken);
// router.post("/upload", controllers.addImages);
router.post("/user", upload.single("file"), controllers.uploadAvatar);

module.exports = router;
