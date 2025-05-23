import express from "express"
import surveyorController from "../controllers/surveyorController.js"

const router = express.Router()

router.post("/", surveyorController.createSurveyorHandler)
router.get("/", surveyorController.getSurveyorHandler)
router.get("/:surveyor_id", surveyorController.getSurveyorByIdHandler)
router.put("/update/name/:surveyor_id", surveyorController.updateSurveyorNameHandler)
router.put("/update/:surveyor_id", surveyorController.updateSurveyorDataHandler)
router.delete("/delete/:surveyor_id", surveyorController.deleteSurveyorHandler)
router.post("/login", surveyorController.loginSurveyorHandler)
 // Name is now expected in req.body
// router.get("/getAll", surveyorController.getAllSurveyorHandler)
// router.put("/update/:Id", surveyorController.updateSurveyorHandler)
// router.delete("/delete/:Id", surveyorController.deleteSurveyorHandler)
// router.get("/search", surveyorController.searchSurveyorHandler)

export default router
