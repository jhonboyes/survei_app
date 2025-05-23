import express from "express"
import QuestionController from "../controllers/questionController.js"

const router = express.Router()

router.post("/", QuestionController.CreateQuestionHandler)
// router.post("/subquestion", QuestionController.CreateSubQuestionHandler)
router.get("/", QuestionController.getQuestionDataHandler)
router.get("/getall", QuestionController.getAllQuestionWithSubQuestionHandler)
router.get("/:question_id", QuestionController.getQuestionByIdHandler)
router.get("/subquestion/subquestion", QuestionController.getSubQuestionHandler)
router.get("/subquestion/subquestion/:question_id/:subquestion_id", QuestionController.getSubQuestionByIdHandler)
router.get("/subquestion/subquestion/:question_id", QuestionController.getSubQuestionByQuestionIdHandler)
router.put("/update/:question_id", QuestionController.updateQuestionHandler)
router.put("/update/:question_id/:subquestion_id", QuestionController.updateSubQuestionHandler)
router.delete("/delete/:question_id", QuestionController.deleteQuestionHandler)
router.delete("/delete/:question_id/:subquestion_id", QuestionController.deleteSubQuestionHandler)

//router.get("/getall", QuestionController.getAllQuestionWithSubQuestionHandler) 
// router.get("/subquestion/subquestion/:subquestion_id", QuestionController.getSubQuestionByIdHandler)

// router.get("/:Id", questionController.getQuestionHandler)

// router.get("/", questionController.getAllQuestionHandler)

// router.get("/question/Id", questionController.getQuestionByQuestionHandler)

// router.put("/update/:questionId", questionController.updateQuestionHandler)

// router.post("/subquestion", questionController.CreateQuestionHandler)

// router.get("/subquestion/:parentId", questionController.getSubQuestionHandler)

// router.get("/subquestion/:parentId/:subId", questionController.getSpecificSubQuestionHandler)

// router.put("/subquestion/:parentId", questionController.updateSubQuestionHandler)

// router.put("/subquestion/:parentId/:subId", questionController.updateSpecificSubQuestionHandler) // Ganti handler ke yang spesifik

// router.delete("/delete/:questionId", questionController.deleteQuestionHandler)

// router.delete("/delete/subquestion/:parentId", questionController.deleteSubQuestionHandler)

// router.delete("/delete/subquestion/:parentId/:subId", questionController.deleteSpecificSubQuestionHandler)

// router.get("/search", questionController.searchQuestionHandler)

export default router
