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
            return res.status(201).json({ message: "Pertanyaan berhasil dibuat" })
        } catch (error) {
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk mendapatkan semua sub-pertanyaan
    async getSubQuestionHandler(req, res) {
        try {
            const subQuestions = await QuestionService.getSubQuestionService()
            return res.status(200).json(subQuestions)
        } catch (error) {
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler untuk menampilkan semua petanyaan termasuk sub-pertanyaan
    async getAllQuestionWithSubQuestionHandler(req, res) {
        try {
            const questions = await QuestionService.getAllQuestionWithSubQuestionService()
            return res.status(200).json(questions)
        } catch (error) {
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
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
            console.log("FROM CONTROLLER", error)
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new QuestionController()