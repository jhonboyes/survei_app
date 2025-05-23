import QuestionModel from "../models/questionModel.js"

class QuestionService {
    // fungsi logik membuat pertanyaan baru
    async CreateQuestionService({ question_id, question, type, options = [] }) {
        try {
            if (type === "text") {
                options = null; // Kosongkan jika pertanyaan bertipe teks
            }

            // const existing = await QuestionModel.getQuestionById(question_id);
            // if (existing) {
            //     throw new Error(`Pertanyaan dengan id ${question_id} sudah ada`);
            // }
            // Validasi: wajib isi semua field dasar
            if (!question_id || !question || !type) {
                throw new Error("question_id, question, and type are required");
            }

            // Validasi tambahan: jika bukan text, maka options wajib ada dan tidak kosong
            if (type !== "text" && (!options || options.length === 0)) {
                throw new Error("Options are required for non-text type questions");
            }

            if (["radio", "checkbox"].includes(type) && (!Array.isArray(options) || options.length === 0)) {
                throw new Error("Options are required for radio and checkbox questions")
            }
            return await QuestionModel.CreateQuestionData({ question_id, question, type, options })
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

// class QuestionService {
//  async createQuestionService({Id, question, type, options = [], parentId = null, triggerOption = null}) {
//   if (!question || !type) {
//    throw new Error("question and type are required")
//   }
//   if (!Id) {
//    throw new Error("Id is Required")
//   }
//   if (!parentId && !/^\d{3}$/.test(Id)) {
//    throw new Error("ID untuk pertanyaan utama harus 3 angka, contoh: 001")
//   }

//   if (parentId && !/^[a-z]$/.test(Id)) {
//    throw new Error("ID untuk sub-pertanyaan harus 1 huruf kecil, contoh: a, b, c")
//   }
//   if (["radio", "checkbox"].includes(type) && (!Array.isArray(options) || options.length === 0)) {
//    throw new Error("Options are required for radio and checkbox questions")
//   }
//   if (type === "text") {
//    options = null
//   }
//   if (parentId && !triggerOption) {
//    throw new Error("Trigger option is required for parent questions")
//   }
//   return await CreateQuestion({Id, question, type, options, parentId, triggerOption})
//  }

//  async getAllQuestionService() {
//   return await getAllQuestion()
//  }

//  async getQuestionService(Id) {
//   if (!Id) {
//    throw new Error("Id is not found")
//   }
//   return await getQuestionById(Id)
//  }

//  async getQuestionByQuestionService(question) {
//   if (!question) {
//    throw new Error("question is not found")
//   }
//   return await searchQuestion({ question: question })
//  }

//  async updateQuestionService(questionId, change) {
//   try {
//    console.log("Updating ID:", questionId)
//    const question = await updateQuestion(questionId, change)
//    if (!question) throw new Error("Question not found")
//    return question
//   } catch (error) {
//    console.error("Error in updateQuestionService:", error) // Log the original error
//    throw new Error(error.message || "Failed to update question") // Throw original message
//   }
//  }

//  async getSubQuestionService(parentId) {
//   try {
//    const subQuestions = await getSubQuestion(parentId)
//    if (!subQuestions) throw new Error("Sub questions not found")
//    return subQuestions
//   } catch (error) {
//    throw new Error("Failed to get sub questions")
//   }
//  }

//  // Fungsi baru untuk memperbarui sub-pertanyaan spesifik
//  async updateSpecificSubQuestionService(parentId, subId, change) {
//   try {
//    const updatedSubQuestion = await updateSpecificSubQuestion(parentId, subId, change)
//    if (!updatedSubQuestion) throw new Error("Specific sub-question not found")
//    return updatedSubQuestion
//   } catch (error) {
//    // Periksa apakah error berasal dari model karena sub-pertanyaan tidak ditemukan
//    if (error.message === "Specific sub-question not found") {
//     throw error // Lemparkan kembali error spesifik
//    }
//    console.error("Error updating specific sub-question in service:", error)
//    throw new Error("Failed to update specific sub-question")
//   }
//  }

//  // Fungsi baru untuk mengambil sub-pertanyaan spesifik
//  async getSpecificSubQuestionService(parentId, subId) {
//   try {
//    const subQuestion = await getSpecificSubQuestion(parentId, subId)
//    if (!subQuestion) throw new Error("Specific sub-question not found")
//    return subQuestion
//   } catch (error) {
//    console.error("Error in getSpecificSubQuestionService:", error)
//    throw new Error(error.message || "Failed to get specific sub-question")
//   }
//  }

//  async updateSubQuestionService(parentId, change) {
//   try {
//    const subQuestions = await updateSubQuestion(parentId, change)
//    if (!subQuestions) throw new Error("Sub questions not found")
//    return subQuestions
//   } catch (error) {
//    throw new Error("Failed to update sub questions")
//   }
//  }

//  async deleteQuestionService(questionId) {
//   if (!questionId) {
//    // Corrected typo: id -> questionId
//    throw new Error("questionId is required")
//   }
//   await deleteQuestion(questionId)
//   return {message: "Question deleted successfully"}
//  }

//  async deleteSubQuestionService(parentId) {
//   try {
//    await deleteSubQuestion(parentId) // Call the model function to delete
//    return {message: "Sub questions deleted successfully"} // Return a success message
//   } catch (error) {
//    // Check if the error is the specific 'Sub questions not found' from the model
//    if (error.message === "Sub questions not found") {
//     throw error // Re-throw the specific error if sub-questions were indeed not found
//    }
//    // Log other potential errors from the model
//    console.error("Error deleting sub questions in service:", error)
//    throw new Error("Failed to delete sub questions") // Throw a generic error for other issues
//   }
//  }

//  // Fungsi baru untuk menghapus sub-pertanyaan spesifik
//  async deleteSpecificSubQuestionService(parentId, subId) {
//   try {
//    await deleteSpecificSubQuestion(parentId, subId)
//    return {message: "Specific sub-question deleted successfully"}
//   } catch (error) {
//    // Check if the error is the specific 'Sub question not found' from the model
//    if (error.message === "Specific sub-question not found") {
//     throw error // Re-throw the specific error
//    }
//    console.error("Error deleting specific sub-question in service:", error)
//    throw new Error("Failed to delete specific sub-question")
//   }
//  }

//  async searchQuestionService(filters) {
//   try {
//    const questions = await searchQuestion(filters)
//    if (!questions) throw new Error("Questions not found")
//    return questions
//   } catch (error) {
//    throw new Error("Failed to search questions")
//   }
//  }
// }

// export default new QuestionService()
