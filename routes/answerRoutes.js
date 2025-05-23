import express from "express"
import AnswerController from "../controllers/answerController.js"

const router = express.Router()

router.post("/", AnswerController.CreateAnswerDataHandler)
router.post("/batch", AnswerController.CreateBatchAnswersHandler)
router.get("/", AnswerController.getAllAnswerDataHandler)
router.get("/answer", AnswerController.getAnswersHandler)
router.get("/answer/:answer_id", AnswerController.getAnswerByIdHandler)
router.get("/question", AnswerController.getAllAnswerWithQuestionHandler)
router.get("/question/:question_id", AnswerController.getAnswersByQuestionIdWithQuestionDataHandler)
router.get("/subquestion", AnswerController.getAllSubAnswerBySubQuestionHandler)
router.get("/subquestion/question", AnswerController.getAllSubAnswerWithQuestionAndSubquestionHandler)
router.get("/subquestion/subquestion/:subquestion_id", AnswerController.getSubAnswerBySubQuestionIdHandler)
router.get("/subquestion/subquestion/:subquestion_id/:question_id", AnswerController.getSubAnswerBySubQuestionIdAndQuestionIdHandler)
router.get("/respondent", AnswerController.getAnswerByRespondentHandler)
router.get("/respondent/:respondent_id", AnswerController.getAnswersByRespondentIdHandler)
router.get("/surveyor/question", AnswerController.getAnswerWithQuestionByRespondentWithSurveyorHandler)
router.get("/batch", AnswerController.getAnswerWithQuestionByRespondentWithSurveyorPaginationHandler)
router.put("/update/:code", AnswerController.updateAnswerHandler)
router.delete("/delete/:code", AnswerController.deleteAnswerHandler)

//router.get("/question/:question_id", AnswerController.getAllAnswerByQuestionIdHandler)
//router.get("/answer/:answer_id", AnswerController.getAnswerByIdHandler)
//router.get("/question/:question_id", AnswerController.getAllAnswerByQuestionIdHandler)
//router.get("/question/question/:question_id", AnswerController.getAllAnswerByQuestionIdHandler)
//router.get("/answer/question", AnswerController.getAllAnswerWithQuestionHandler)
// router.post("/", AnswerController.submitAllAnswersHandler)
// router.get("/", AnswerController.getAllAnswersHandler)
// router.get("/:Id", AnswerController.getAnswerByIdHandler)
// router.get("/question", AnswerController.getAnswerswithQuestionsHandler)
// router.get("/question/:questionId", AnswerController.getAnswersByQuestionIdHandler)
// router.get("/question/parent/:Id", AnswerController.getAnswersByParentIdHandler)
// router.get("/respondent/:Id", AnswerController.getAnswersByRespondentIdHandler) // Corrected typo in handler name
// router.put("/update/:Id", AnswerController.updateAnswerByIdHandler)
// router.delete("delete/:Id", AnswerController.deleteAnswerByIdHandler)

export default router
