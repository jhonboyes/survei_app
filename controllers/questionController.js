import QuestionService from "../services/questionService.js"

class QuestionController {
    // fungsi membuat pertanyaan baru
    async CreateQuestionHandler(req, res) {
        try {
            const { question_id, question, type, options = [] } = req.body
            const result = await QuestionService.CreateQuestionService({
                question_id,
                question,
                type,
                options
            })
            return res.status(201).json({ message: "Pertanyaan berhasil dibuat", data: result })
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: "id for question_id already exists" })
        }
    }

    // fungsi membuat sub-pertanyaan baru
    //  async CreateSubQuestionHandler(req, res) {
    //   try {
    //    const {subquestion_id, question_id, question, type, options = [], trigger_option = null} = req.body
    //    const result = await QuestionService.CreateSubQuestionService({
    //     subquestion_id,
    //     question_id,
    //     question,
    //     type,
    //     options,
    //     trigger_option
    //    })
    //    return res.status(201).json({message: "Subquestion created successfully", data: result})
    //   } catch (error) {
    //    console.log("print", error)
    //    return res.status(400).json({message: error.message})
    //   }
    //  }

    // fungsi mendapatkan semua pertanyaan
    async getQuestionDataHandler(req, res) {
        try {
            const questions = await QuestionService.getQuestionDataService()
            return res.status(200).json(questions)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi mendapatkan pertanyaan berdasarkan ID
    async getQuestionByIdHandler(req, res) {
        try {
            const { question_id } = req.params
            const question = await QuestionService.deleteQuestionService(question_id)
            return res.status(200).json(question)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk mendapatkan semua sub-pertanyaan
    async getSubQuestionHandler(req, res) {
        try {
            const subQuestions = await QuestionService.getSubQuestionService()
            return res.status(200).json(subQuestions)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    //fungsi handler untuk mendapatkan sub-pertanyaan berdasarkan ID
    async getSubQuestionByIdHandler(req, res) {
        try {
            const { subquestion_id, question_id } = req.params
            const subQuestion = await QuestionService.getSubQuestionByIdService(parseInt(subquestion_id), parseInt(question_id))
            return res.status(200).json(subQuestion)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    //fungsi handler untuk mendapatkan sub pertanyaan berdasarkan pertanyan utama
    async getSubQuestionByQuestionIdHandler(req, res) {
        try {
            const { question_id } = req.params
            const subQuestions = await QuestionService.getSubQuestionByQuestionIdService(question_id)
            return res.status(200).json(subQuestions)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk menampilkan semua petanyaan termasuk sub-pertanyaan
    async getAllQuestionWithSubQuestionHandler(req, res) {
        try {
            const questions = await QuestionService.getAllQuestionWithSubQuestionService()
            return res.status(200).json(questions)
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk memperbarui pertanyaan
    async updateQuestionHandler(req, res) {
        try {
            const { question_id } = req.params
            const { question, type, options } = req.body
            const result = await QuestionService.updateQuestionService(question_id, { question, type, options })
            return res.status(200).json({ message: "question data update successfully.", data: result })
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk memperbarui sub-pertanyaan
    async updateSubQuestionHandler(req, res) {
        try {
            const { subquestion_id, question_id } = req.params
            const { question, type, options, trigger_option } = req.body
            const result = await QuestionService.updateSubQuestionService(subquestion_id, question_id, { question, type, options, trigger_option })
            return res.status(200).json({ message: "subquestion data update successfully.", data: result })
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk menghapus pertanyaan
    async deleteQuestionHandler(req, res) {
        try {
            const { question_id } = req.params
            const result = await QuestionService.deleteQuestionService(question_id)
            return res.status(200).json({ message: "question data deleted successfully.", data: result })
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk menghapus sub-pertanyaan
    async deleteSubQuestionHandler(req, res) {
        try {
            const { subquestion_id, question_id } = req.params
            const result = await QuestionService.deleteSubQuestionService(subquestion_id, question_id)
            return res.status(200).json({ message: "subquestion data deleted successfully.", data: result })
        } catch (error) {
            console.log("print", error)
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new QuestionController()

// //Cretate Question
// const CreateQuestionHandler = async (req, res) => {
//     try {
//         const { Id, question, type, options, parentId, triggerOption } = req.body
//         const questionData = await QuestionService.createQuestionService({
//             Id,
//             question,
//             type,
//             options,
//             parentId,
//             triggerOption
//         })
//         return res.status(201).json(questionData)
//     } catch (error) {
//         console.log("print", error)
//         return res.status(400).json({ message: error.message })
//     }
// }

// const getAllQuestionHandler = async (req, res) => {
//     try {
//         const questions = await QuestionService.getAllQuestionService()
//         return res.status(200).json(questions)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Get Question
// const getQuestionHandler = async (req, res) => {
//     try {
//         const { Id } = req.params
//         const questionData = await QuestionService.getQuestionService(Id)
//         return res.status(200).json(questionData)
//     } catch (err) {
//         res.status(404).json({ message: err.message })
//     }
// }

// //Update Question
// const updateQuestionHandler = async (req, res) => {
//     const questionId = req.params.questionId
//     const questionData = req.body
//     try {
//         const question = await QuestionService.updateQuestionService(questionId, questionData)
//         return res.status(200).json(question)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Get Sub Question
// const getSubQuestionHandler = async (req, res) => {
//     const parentId = req.params.parentId
//     try {
//         const subQuestions = await QuestionService.getSubQuestionService(parentId)
//         if (!subQuestions) throw new Error("Sub questions not found")
//         return res.status(200).json(subQuestions)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// // Handler baru untuk mengambil sub-pertanyaan spesifik
// const getSpecificSubQuestionHandler = async (req, res) => {
//     const { parentId, subId } = req.params
//     try {
//         const subQuestion = await QuestionService.getSpecificSubQuestionService(parentId, subId)
//         return res.status(200).json(subQuestion)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Get Question By Question
// const getQuestionByQuestionHandler = async (req, res) => {
//     const { question } = req.query
//     try {
//         const questionData = await QuestionService.getQuestionByQuestionService(question)
//         return res.status(200).json(questionData)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// // Handler baru untuk memperbarui sub-pertanyaan spesifik
// const updateSpecificSubQuestionHandler = async (req, res) => {
//     const { parentId, subId } = req.params
//     const change = req.body
//     try {
//         const updatedSubQuestion = await QuestionService.updateSpecificSubQuestionService(parentId, subId, change)
//         return res.status(200).json(updatedSubQuestion)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Update Sub Question
// const updateSubQuestionHandler = async (req, res) => {
//     const parentId = req.params.parentId
//     const subQuestionData = req.body
//     try {
//         const subQuestions = await QuestionService.updateSubQuestionService(parentId, subQuestionData)
//         return res.status(200).json(subQuestions)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Delete Question
// const deleteQuestionHandler = async (req, res) => {
//     const questionId = req.params.questionId
//     try {
//         const question = await QuestionService.deleteQuestionService(questionId)
//         return res.status(200).json(question)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Delete Sub Question
// const deleteSubQuestionHandler = async (req, res) => {
//     const parentId = req.params.parentId
//     try {
//         const subQuestions = await QuestionService.deleteSubQuestionService(parentId)
//         return res.status(200).json(subQuestions)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// // Handler baru untuk menghapus sub-pertanyaan spesifik
// const deleteSpecificSubQuestionHandler = async (req, res) => {
//     const { parentId, subId } = req.params
//     try {
//         const result = await QuestionService.deleteSpecificSubQuestionService(parentId, subId)
//         return res.status(200).json(result)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// //Search Question
// const searchQuestionHandler = async (req, res) => {
//     const filters = req.query
//     try {
//         const questions = await QuestionService.searchQuestionService(filters)
//         return res.status(200).json(questions)
//     } catch (error) {
//         return res.status(404).json({ message: error.message })
//     }
// }

// export default {
//     CreateQuestionHandler,
//     getQuestionByQuestionHandler,
//     getAllQuestionHandler,
//     getQuestionHandler,
//     getSubQuestionHandler,
//     getSpecificSubQuestionHandler, // Tambahkan ekspor baru
//     updateQuestionHandler,
//     updateSubQuestionHandler,
//     deleteQuestionHandler,
//     deleteSubQuestionHandler,
//     deleteSpecificSubQuestionHandler, // Tambahkan ekspor baru
//     updateSpecificSubQuestionHandler, // Tambahkan ekspor baru
//     searchQuestionHandler
// }
