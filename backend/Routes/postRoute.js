import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import { create, deleteposts, getposts, updateposts } from "../Controllers/postController.js"

const router = express.Router()

router.post("/create", verifyToken, create)
router.get("/getposts", getposts)
router.delete("/deleteposts/:postId/:userId", verifyToken, deleteposts)
router.put("/updateposts/:postId/:userId", verifyToken, updateposts)

export default router