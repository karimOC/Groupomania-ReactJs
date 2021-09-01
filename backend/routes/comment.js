const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/:id/comments", auth, commentCtrl.getAllComments);
router.post("/:id/comment/", auth, commentCtrl.createComment);
router.delete("/:idMessages/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
