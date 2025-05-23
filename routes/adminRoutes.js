import express from "express"
import adminController from "../controllers/adminController.js"

const router = express.Router()


router.post("/signup", adminController.createAdmin)
router.post("/login", adminController.adminLogin)

// app.use("/admin", router)


export default router
