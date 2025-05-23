import express from "express"
import multer from "multer"
import RespondentController from "../controllers/respondentController.js"

const router = express.Router()

// // Route to create or update respondent data (e.g., POST /respondents)
// // Using POST for simplicity, could also be PUT if respondentId is in URL
router.post("/", RespondentController.CreateRespondentDataHandler)
router.post("/surveyor", RespondentController.CreateRespondentDataFromSurveyor)
router.get("/", RespondentController.getRerespondentDataHandler)
router.get("/respondent", RespondentController.getRespondentWithSurveyorDataHandler)
router.get("/respondent/:respondent_id", RespondentController.getRespondentByIdHandler)

router.get("/respondent/surveyor/:surveyor_id", RespondentController.getRespondentBySurveyorIdHandler)
router.put("/update/:respondent_id", RespondentController.updateRespondentDataHandler)
router.patch("/update/:respondent_id/status", RespondentController.updateStatusRespondentHandler)
router.delete("/delete/:respondent_id", RespondentController.deleteRespondentDataHandler)
router.post(
    "/upload/:respondent_id",
    multer({ storage: multer.memoryStorage() }).single("file"),
    RespondentController.uploadRespondentPhotoHandler
)

// // Route to get respondent data by ID (e.g., GET /respondents/:respondentId)
// router.get("/:Id", respondentController.getRespondentByIdHandler)

// // Route to get all respondents (e.g., GET /respondents)
// router.get("/", respondentController.getAllRespondentHandler)

// router.put("/update/:Id", respondentController.updateRespondentHandler)

// router.delete("/delete/:Id", respondentController.deleteRespondentByIdHandler)

export default router
