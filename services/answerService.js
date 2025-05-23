import answerModel from "../models/answerModel.js"
import QuestionModel from "../models/questionModel.js"
// import {getAllQuestion, getQuestionById} from "../models/questionModel.js" // Assuming getQuestionById exists and is the correct method

class AnswerService {
 // fungsi logic untuk membuat data surveyor
 async CreateAnswerDataService({respondent_id, question_id, subquestion_id, is_sub_question = null, answer}) {
  try {
   if (!respondent_id || !question_id || answer === undefined || answer === null) {
    throw new Error("Invalid answer data")
   }
   if (!respondent_id || !question_id) {
    throw new Error("respondent and question not found")
   }
   if (is_sub_question === false && subquestion_id) {
    throw new Error("Subquestion ID is not allowed for non-subquestion answers")
   }
   const questionData = await QuestionModel.getQuestionById(question_id)
   let subQuestionData = null
   if (is_sub_question && subquestion_id) {
    subQuestionData = await QuestionModel.getSubQuestionById(subquestion_id, question_id)
   }
   let questionType = is_sub_question ? subQuestionData?.inputType : questionData?.type
   if (is_sub_question && questionType === "chekbox") {
    questionType = "checkbox"
   }

   // if (["radio", "checkbox"].includes(questionType)) {
   //     if (!Array.isArray(answer)) {
   //         throw new Error("Answer must be an array for radio or checkbox question")
   //     }
   //     if (answer.length === 0) {
   //         throw new Error("At least one answer is required for radio or checkbox")
   //     }
   //     const options = is_sub_question ? subQuestionData?.options : questionData?.options
   //     if (!Array.isArray(options) || options.length === 0) {
   //         throw new Error(
   //             `Options are not defined or empty for ${is_sub_question ? "subquestion" : "question"} ID ${is_sub_question ? subquestion_id : question_id
   //             }`
   //         )
   //     }
   //     const validOptions = options
   //     const isValid = answer.every((ans) => validOptions.includes(ans))
   //     if (!isValid) {
   //         throw new Error(
   //             `Invalid answer option for ${is_sub_question ? "subquestion" : "question"} of type radio or checkbox`
   //         )
   //     }
   // }
   return answerModel.CreateAnswerData({
    respondent_id,
    question_id,
    is_sub_question,
    subquestion_id: is_sub_question ? subquestion_id : null,
    answer
   })
  } catch (error) {
   throw new Error(`Error creating Answer: ${error.message}`)
  }
 }

 // fungsi logic untuk membuat multiple jawaban sekaligus (batch processing)
 async CreateBatchAnswersService(answersArray) {
  try {
   if (!Array.isArray(answersArray) || answersArray.length === 0) {
    throw new Error("Invalid answers data: Expected non-empty array")
   }

   // Validasi semua jawaban sebelum memproses
   for (const answerData of answersArray) {
    const {respondent_id, question_id, is_sub_question, subquestion_id, answer} = answerData

    if (!respondent_id || !question_id || answer === undefined || answer === null) {
     throw new Error("Invalid answer data in batch")
    }

    if (is_sub_question === false && subquestion_id) {
     throw new Error("Subquestion ID is not allowed for non-subquestion answers")
    }
   }

   // Proses semua jawaban sekaligus menggunakan batch processing
   const results = await answerModel.CreateBatchAnswersData(answersArray)
   return results
  } catch (error) {
   throw new Error(`Error creating batch answers: ${error.message}`)
  }
 }

 //fungsi logic mengambil semua jawaban beserta sub jawaban dengan pertanyaan dan sub pertanyaan
 async getAllAnswerDataService() {
  try {
   const answers = await answerModel.getAllAnswerData()

   if (!answers || answers.length === 0) {
    return []
   }

   return answers
  } catch (error) {
   // Sebaiknya log error spesifik dari model jika ada, atau error umum jika tidak
   console.error("Error in getAllAnswerDataService: ", error.message)
   throw new Error("Error fetching all answers: " + error.message) // Menyertakan pesan error asli
  }
 }

 // fungsi logic mendapatkan semua jawaban
 async getAnswersDataService() {
  try {
   const answers = await answerModel.getAnswerData()
   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching all answers")
  }
 }

 // fungsi logic mendapatkan jawaban berdasarkan ID
 async getAnswerByIdService(answer_id) {
  try {
   if (!answer_id) {
    throw new Error("Answer ID is required")
   }
   const answer = await answerModel.getAnswerByIdData(answer_id)
   if (!answer) {
    throw new Error("Answer not found")
   }
   return answer
  } catch (error) {
   throw new Error("Error fetching answer by ID")
  }
 }

 //fungsi logic mendapatkan semua jawaban berdasarkan pertanyaan
 async getAllAnswerWithQuestionService() {
  try {
   const answers = await answerModel.getAllAnswerWithQuestionData()
   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching answers with questions")
  }
 }

 // fungsi logic mendapatkan semua jawaban berdasarkan ID pertanyaan
 //  async getAllAnswerByQuestionIdService(question_id) {
 //   try {
 //    if (!question_id) {
 //     throw new Error("Question ID is required")
 //    }
 //    const answers = await answerModel.getAllAnswerByQuestionIdData(question_id)
 //    if (!answers || answers.length === 0) {
 //     return []
 //    }
 //   } catch (error) {
 //    throw new Error("Error fetching answers by question ID")
 //   }
 //  }

 // fungsi logic mendapatkan jawaban berdarakan id pertanyaan dari pertanyaan
 async getAnswersByQuestionIdWithQuestionDataService(question_id) {
  try {
   const answers = await answerModel.getAnswersByQuestionIdWithQuestionIdData(question_id)

   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching answers by question ID with question ID")
  }
 }

 //fungsi logic mendapatkan semua subjawaban
 async getAllSubAnswerBySubquestionService() {
  try {
   const answers = await answerModel.getallSubAnswerBySubQuestion()
   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching all subanswers")
  }
 }

 //fungsi logic mendapatkan sub jawaban berdasarkan sub pertanyaan dan pertanyaan
 async getAllSubAnswerWithQuestionAndSubquestionService() {
  try {
   //    if (!subquestion_id) {
   //     throw new Error("Subquestion ID is required")
   //    }
   const answers = await answerModel.getAllSubAnswerWithQuestionAndSubQuestionData()
   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching subanswers with questions")
  }
 }

 // fungsi logic mendapatkan sub jawaban berdasarkan id  subpertanyaan
 async getSubAnswerBySubquestionIdService(subquestion_id) {
  try {
   if (!subquestion_id) {
    throw new Error("Subquestion ID is required")
   }
   const answers = await answerModel.getSubAnswerBySubQuestionIdData(subquestion_id)
   if (!answers || answers.length === 0) {
    return []
   }
   return answers
  } catch (error) {
   throw new Error("Error fetching subanswers by subquestion ID")
  }
 }

 // fungsi logic mendapatkan sub jawaban berdasarkan id subpertanayaan dan pertanyaan
 async getSubQuestionBySubquestionIdAndQuestionIdService(subquestion_id, question_id) {
  try {
   if (!subquestion_id || !question_id) {
    throw new Error("Subquestion ID and Question ID are required")
   }
   const resultData = await answerModel.getSubAnswerBySubQuestionIdAndQuestionIdData(subquestion_id, question_id)
   return resultData
  } catch (error) {
   throw new Error(
    `Failed to fetch subquestion data for subquestion_id '${subquestion_id}' and question_id '${question_id}'. Reason: ${errormessage}`
   )
  }
 }

 // fungsi logic mendapatkan jawaban berdasarkan respondent
 async getAnswersByRespondentDataService() {
  try {
   const respondents = await answerModel.getAnswersByRespondentData()

   if (!respondents || respondents.length === 0) {
    return []
   }

   const processed = respondents.map((respondent) => {
    const allAnswers = respondent.answers || []

    // Ambil semua jawaban utama
    const mainAnswers = allAnswers.filter((ans) => ans.is_sub_question === false)

    // Untuk setiap jawaban utama, cari sub-answer-nya
    const enrichedAnswers = mainAnswers.map((main) => {
     const subAnswers = allAnswers.filter((sub) => sub.is_sub_question === true && sub.question_id == main.question_id)

     return {
      ...main,
      subAnswers: subAnswers.map((sub) => ({
       answer_id: sub.answer_id,
       question_id: sub.question_id,
       answer: sub.answer,
       subquestion_id: sub.subquestion_id
      }))
     }
    })

    return {
     respondent_id: respondent.respondent_id,
     answers: enrichedAnswers
    }
   })

   return processed
  } catch (error) {
   throw new Error("Error fetching answers by respondent: " + error.message)
  }
 }

 // fungsi logic mendapatkan jawaban dan pertanyaan beserta respondent dan surveyor
 async getAnswerWithQuestionByRespondentWithSurveyorService() {
  try {
   const result = await answerModel.getAnwserWithQuestionByRespondentWithSurveyorData()

   // Cek apakah result ada dan bukan array kosong
   if (!result || !Array.isArray(result) || result.length === 0) {
    return []
   }
   return result
  } catch (error) {
   throw new Error("Error fetching answers with questions and respondents: " + error.message)
  }
 }

 //fungsi logic mendapatkan jawaban berdasarkan surveyor per batch
 async getAnswerWithQuestionByRespondentWithSurveyorPaginationService(page, limit = 100) {
  try {
   if (!page || isNaN(page) || page <= 0) {
    throw new Error("Invalid page number")
   }
   if (!limit || isNaN(limit) || limit <= 0) {
    throw new Error("Invalid limit number")
   }
   if (limit > 100) {
    throw new Error("Limit cannot exceed 100")
   }
   // Panggil model dengan offset dan limit
   const result = await answerModel.getAnwserWithQuestionByRespondentWithSurveyorPaginationData(page, limit)
   return result
  } catch (error) {
   throw new Error("Error fetching answers with questions and respondents: " + error.message)
  }
 }

 // fungsi logic mendapatkan jawaban berdasarkan respondent ID
 async getAnswersByRespondentIdService(respondent_id) {
  try {
   if (!respondent_id) {
    throw new Error("Respondent ID is required")
   }

   const respondentData = await answerModel.getAnswersByRespondentIdData(respondent_id)

   if (!respondentData) {
    // Respondent tidak ditemukan atau tidak ada data yang dikembalikan.
    return null
   }

   // Pastikan respondentData.answers adalah array, default ke array kosong jika null/undefined
   const allAnswers = respondentData.answers || []

   // Ambil semua jawaban utama (filter pertanyaan utama)
   const mainAnswers = allAnswers.filter((ans) => ans.is_sub_question === false)

   // Untuk setiap jawaban utama, cari dan lampirkan sub-jawabannya
   const enrichedAnswers = mainAnswers.map((main) => {
    const subAnswers = allAnswers.filter((sub) => sub.is_sub_question === true && sub.question_id == main.question_id)

    return {
     ...main, // Sebarkan properti dari jawaban utama (misalnya, code, question_id, answer)
     subAnswers: subAnswers.map((sub) => ({
      answer_id: sub.answer_id, // Ini mungkin undefined jika tidak dipilih dalam model
      question_id: sub.question_id,
      answer: sub.answer,
      subquestion_id: sub.subquestion_id
     }))
    }
   })

   return {
    ...respondentData,
    answers: enrichedAnswers
   }
  } catch (error) {
   console.error(`Error in getAnswersByRespondentIdService for respondent_id '${respondent_id}': ${error.message}`)
   throw new Error("Error fetching answers by respondent ID: " + error.message)
  }
 }

 //fungsi logic update jawaban
 async updateAnswerService(code, updatedAnswerData) {
  try {
   if (!code) {
    throw new Error("Answer code is required")
   }
   if (!updatedAnswerData || Object.keys(updatedAnswerData).length === 0) {
    throw new Error("No fields to update")
   }
   const updatedAnswer = await answerModel.updateAnswerData(code, updatedAnswerData)
   return updatedAnswer
  } catch (error) {
   console.error("Error in updateAnswerService:", error.message)
   throw new Error(`Error updating answer: ${error.message}`)
  }
 }

 //fungsi logic menghapus jawaban
 async deleteAnswerService(code) {
  try {
   if (!code) {
    throw new Error("Answer code is required")
   }
   const deletedAnswer = await answerModel.deleteAnswerData(code)
   return deletedAnswer
  } catch (error) {
   throw new Error(`Error deleting answer: ${error.message}`)
  }
 }
}

export default new AnswerService()
// //import questionModel from "../models/questionModel.js" // Added import for questionModel
// // import respondentModel from "../models/respondentModel.js"; // Not directly used in this version
// //import { db } from "../configdb/dbconnect.js";

// class AnswerService {
//  async submitAllAnswersService(respondentId, answers) {
//   try {
//    if (!respondentId) throw new Error("Invalid respondentId provided.")
//    if (!Array.isArray(answers) || answers.length === 0) throw new Error("Invalid or empty answers array provided.")

//    const answerData = answers.map((ans) => {
//     const {questionId, parentId, answer} = ans
//     if (!questionId) throw new Error(`Invalid questionId: ${JSON.stringify(ans)}`)
//     if (!ans.hasOwnProperty("answer")) throw new Error(`Missing answer: ${JSON.stringify(ans)}`)

//     return {
//      respondentId,
//      questionId,
//      answer,
//      parentId: parentId || null,
//      createdAt: new Date(),
//      updatedAt: new Date()
//     }
//    })

//    const results = await Promise.all(answerData.map((item) => answerModel.SubmitAnswer(item)))

//    return {message: "Jawaban berhasil di simpan.", data: results}
//   } catch (error) {
//    throw new Error(`SubmitAnswer error: ${error.message}`)
//   }
//  }

//  async getAllAnswersService() {
//   try {
//    const answers = await answerModel.getAllAnswers()
//    if (!answers || answers.length === 0) {
//     return []
//    }
//    return answers
//   } catch (error) {
//    throw new Error("Error fetching all answers")
//   }
//  }

//  async getAnswersByIdService(answerId) {
//   try {
//    const answer = await answerModel.getAnswerById(answerId)
//    if (!answer) {
//     throw new Error("Answer not found.")
//    }
//    return answer
//   } catch (error) {
//    throw new Error("Error fetching answer by ID")
//   }
//  }

//  async getAllAnswerswithQuestionService() {
//   try {
//    const answers = await answerModel.getAllAnswers()
//    const questions = await getAllQuestion()

//    const questionsMap = new Map(questions.map((q) => [q.Id, q.question]))

//    const answersWithQuestions = answers.map((answer) => {
//     return {
//      ...answer,
//      question: questionsMap.get(answer.question) || "Question not found"
//     }
//    })
//    return answersWithQuestions
//   } catch (error) {
//    console.error("Error in getAllAnswerswithQuestionService:", error.message)
//    throw new Error(`Failed in getAllAnswerswithQuestionService: ${error.message}`)
//   }
//  }

//  async getAnswersByQuestionIdService(questionId) {
//   try {
//    const answers = await answerModel.getAnswersByIdQuestion(questionId)
//    if (!answers || answers.length === 0) {
//     return []
//    }
//    return answers
//   } catch (error) {
//    console.error(`Error in answer service - get by question: ${error.message}`)
//    throw new Error("Error fetching answers by question ID")
//   }
//  }

//  async getAnswersByParentIdService(parentId) {
//   try {
//    const answers = await answerModel.getAnswersByParentId(parentId)
//    if (!answers || answers.length === 0) {
//     return []
//    }
//    return answers
//   } catch (error) {
//    throw new Error("Error fetching answers by parent ID")
//   }
//  }

//  async getAnswersByRespondentIdService(respondentId) {
//   try {
//    const answers = await answerModel.getAnswersByRespondent(respondentId)
//    if (!answers || answers.length === 0) {
//     return []
//    }
//    return answers
//   } catch (error) {
//    throw new Error("Error fetching answers by respondent ID")
//   }
//  }

//  async updateAnswerService(answerId, updatedAnswer) {
//   try {
//    const answer = await answerModel.getAnswerById(answerId, updatedAnswer)
//    if (!answer) {
//     throw new Error("Answer not found.")
//    }
//    return await answerModel.updateAnswer(answerId, updatedAnswer)
//   } catch (error) {
//    throw new Error("Error updating answer")
//   }
// //   try {
// //    // console.log(`[Service] updateAnswerService - Received answerId: '${answerId}' (Type: ${typeof answerId})`);
// //    if (!answerId || typeof answerId !== 'string' || answerId.trim() === '') {
// //     const errMsg = `[Service] updateAnswerService - Invalid answerId: '${answerId}'. It must be a non-empty string.`;
// //     console.error(errMsg);
// //     throw new Error(errMsg);
// //    }
// //    const existingAnswer = await answerModel.getAnswerById(answerId); // First, check if the answer exists
// //    if (!existingAnswer) {
// //     throw new Error("Answer not found for update.");
// //    }

// //    const dataToUpdate = {...updatedAnswerData, updatedAt: new Date()};
// //    const updatedAnswer = await answerModel.updateAnswer(answerId, dataToUpdate);
// //    // Assuming updateAnswer returns the updated document or a confirmation
// //    // If it returns a status or specific structure, adjust the return accordingly
// //    if (!updatedAnswer) {
// //     // This case might indicate the update failed at the model level for some reason
// //     throw new Error("Failed to update answer in the model.");
// //    }
// //    return {success: true, message: "Answer updated successfully.", data: updatedAnswer };
// //   } catch (error) {
// //    console.error("Error in updateAnswerService:", error.message);
// //    throw new Error(`Error updating answer: ${error.message}`);
// //   }
//  }

//  async deleteAnswersService(answerId) {
//   try {
//    const existingAnswer = await answerModel.deleteAnswer(answerId)
//    if (!existingAnswer) {
//     throw new Error("Answer not found for deletion.")
//    }
//    await answerModel.deleteAnswer(answerId)
//    return {success: true, message: "Answer deleted successfully."}
//   } catch (error) {
//    throw new Error("Error deleting answer")
//   }
//  }
// }

// export default new AnswerService()
