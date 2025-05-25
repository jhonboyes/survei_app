import QuestionModel from "../models/questionModel.js"

class QuestionService {
 // fungsi logik membuat pertanyaan baru
 async CreateQuestionService({question_id, question, type, options = []}) {
  try {
   if (type === "text") {
    options = null // Kosongkan jika pertanyaan bertipe teks
   }

   if (!question_id || !question || !type) {
    throw new Error("question_id, question, and type are required")
   }

   // Validasi tambahan: jika bukan text, maka options wajib ada dan tidak kosong
   if (type !== "text" && (!options || options.length === 0)) {
    throw new Error("Options are required for non-text type questions")
   }

   if (["radio", "checkbox"].includes(type) && (!Array.isArray(options) || options.length === 0)) {
    throw new Error("Options are required for radio and checkbox questions")
   }
   return await QuestionModel.CreateQuestionData({question_id, question, type, options})
  } catch (error) {
   console.log("FROM SERVICE", error)
   throw new Error(error.message || "Failed to create question")
  }
 }

 //fungsi logic membuat sub-pertanyaan baru
 // async CreateSubQuestionService({ subquestion_id, question_id, question, type, options = [], trigger_option = null }) {
 //     try {
 //         if (!subquestion_id || !question_id || !question || !type || !options || !trigger_option) {
 //             throw new Error("subquestion_id, question_id, question, type, options, and triggerOption are required")
 //         }
 //         if (["radio", "checkbox"].includes(type) && (!Array.isArray(options) || options.length === 0)) {
 //             throw new Error("Options are required for radio and checkbox questions")
 //         }
 //         if (type === "text") {
 //             options = null
 //         }
 //         if (!trigger_option) {
 //             throw new Error("Trigger option is required for parent questions")
 //         }
 //         return await QuestionModel.CreateSubQuestionData({
 //             subquestion_id,
 //             question_id,
 //             question,
 //             type,
 //             options,
 //             trigger_option
 //         })
 //     } catch (error) {
 //         throw new Error(error.message || "Failed to create sub question")
 //     }
 // }

 //fungsi logic mendapatkan semua pertanyaan
 async getQuestionDataService() {
  try {
   const questions = await QuestionModel.getQuestionData()
   // if (!questions || questions.length === 0) {
   //     throw new Error("No questions found.")
   // }
   return questions
  } catch (error) {
   console.error("Error in question service - get all:", error.message)
   throw error
  }
 }

 //fungsi logic mendapatkan pertanyaan berdasarkan ID
 async getQuestionByIdService(question_id) {
  try {
   if (!question_id) {
    throw new Error("Question ID is required.")
   }
   const question = await QuestionModel.getQuestionById(question_id)
   if (!question) {
    throw new Error("Question not found")
   }
   return question
  } catch (error) {
   console.error("Error in question service - get by ID:", error.message)
   throw error
  }
 }

 //fungsi logic mendapatkan semua sub-pertanyaan
 async getSubQuestionService() {
  try {
   const subQuestions = await QuestionModel.getSubQuestionData()
   //    if (!subQuestions || subQuestions.length === 0) {
   //     throw new Error("No sub questions found.")
   //    }
   return subQuestions
  } catch (error) {
   console.error("Error in question service - get all sub questions:", error.message)
   throw error
  }
 }

 //fungsi logic mendapatkan sub-pertanyaan berdasarkan ID
 async getSubQuestionByIdService(subquestion_id, question_id) {
  try {
   if (!subquestion_id || !question_id) {
    throw new Error("Subquestion ID and Question ID are required.")
   }
   const subQuestion = await QuestionModel.getSubQuestionById(subquestion_id, question_id)
   // if (!subquestion_id) {  <-- This check is now redundant due to the one above
   //  throw new Error("Subquestion ID is required.")
   // }
   if (!subQuestion) {
    throw new Error("Subquestion not found")
   }
   return subQuestion
  } catch (error) {
   console.error("Error in question service - get by ID:", error.message)
   throw error
  }
 }

 // fungsi logic mendapatkan subpertanyaan berdasarkan pertanyaan
 async getSubQuestionByQuestionIdService(question) {
  try {
   const subQuestions = await QuestionModel.getSubQuestionByQuestionId(question)
   if (!subQuestions || subQuestions.length === 0) {
    throw new Error("No sub questions found for the given question.")
   }
   return subQuestions
  } catch (error) {
   console.error("Error in question service - get sub questions by question ID:", error.message)
   throw error
  }
 }

 //fungsi logic mengambil semua pertanya termasuk subpertanyaan
 async getAllQuestionWithSubQuestionService() {
  try {
   const questions = await QuestionModel.getAllQuestionWithSubquestionData()
   if (!questions || questions.length === 0) {
    throw new Error("No questions found.")
   }
   return questions
  } catch (error) {
   console.error("Error in question service - get all questions with sub questions:", error.message)
   throw error
  }
 }

 //fungsi logic memperbarui pertanyaan
 async updateQuestionService(question_id, updatedData) {
  try {
   if (!question_id) {
    throw new Error("Question ID is required.")
   }
   const updatedQuestion = await QuestionModel.updateQuestionData(question_id, updatedData)
   if (!updatedQuestion) {
    throw new Error("Question not found")
   }
   return updatedQuestion
  } catch (error) {
   console.error("Error in question service - update:", error.message)
   throw new Error(error.message || "Failed to update question")
  }
 }

 // fungsi logic update subpertanyaan
 async updateSubQuestionService(subquestion_id, question_id, updatedData) {
  try {
   if (!subquestion_id || !question_id) {
    throw new Error("Subquestion ID required.")
   }
   const updatedSubQuestion = await QuestionModel.updateSubQuestionData(subquestion_id, question_id, updatedData)
   if (!updatedSubQuestion) {
    throw new Error("Subquestion not found")
   }
   return updatedSubQuestion
  } catch (error) {
   console.error("Error in question service - update sub question:", error.message)
   throw new Error(error.message || "Failed to update sub question")
  }
 }

 //fungsi logic menghapus pertanyaan
 async deleteQuestionService(question_id) {
  try {
   if (!question_id) {
    throw new Error("Question ID is required.")
   }
   const deletedQuestion = await QuestionModel.deleteQuestionData(question_id)
   if (!deletedQuestion) {
    throw new Error("Question not found")
   }
   return deletedQuestion
  } catch (error) {
   console.error("Error in question service - delete:", error.message)
   throw new Error(error.message || "Failed to delete question")
  }
 }

 //fungsi logic menghapus subpertanyaan
 async deleteSubQuestionService(subquestion_id, question_id) {
  try {
   if (!subquestion_id || !question_id) {
    throw new Error("Subquestion ID required.")
   }
   const deletedSubQuestion = await QuestionModel.deleteSubQuestionData(subquestion_id, question_id)
   if (!deletedSubQuestion || deletedSubQuestion.length === 0) {
    throw new Error("Subquestion not found")
   }
   return deletedSubQuestion
  } catch (error) {
   console.error("Error in question service - delete sub question:", error.message)
   throw new Error(error.message || "Failed to delete sub question")
  }
 }
}

export default new QuestionService()
