import answerService from "../services/answerService.js"
// // Potentially import respondentService if needed to also save respondent data
// import respondentService from "../services/respondentService.js"

// Implementasi rate limiting sederhana
const rateLimiter = {
 // Menyimpan timestamp permintaan terakhir untuk setiap IP
 requestTimestamps: {},
 // Menyimpan jumlah permintaan dalam jendela waktu untuk setiap IP
 requestCounts: {},
 // Batas permintaan per jendela waktu (misalnya 50 permintaan per menit)
 maxRequestsPerWindow: 50,
 // Jendela waktu dalam milidetik (1 menit)
 windowMs: 60 * 1000,

 // Memeriksa apakah permintaan melebihi batas
 isRateLimited: function (ip) {
  const now = Date.now()

  // Inisialisasi jika IP belum ada dalam tracking
  if (!this.requestCounts[ip]) {
   this.requestCounts[ip] = 0
   this.requestTimestamps[ip] = now
  }

  // Reset counter jika jendela waktu telah berlalu
  if (now - this.requestTimestamps[ip] > this.windowMs) {
   this.requestCounts[ip] = 0
   this.requestTimestamps[ip] = now
  }

  // Periksa apakah melebihi batas
  if (this.requestCounts[ip] >= this.maxRequestsPerWindow) {
   return true
  }

  // Tambah counter
  this.requestCounts[ip]++
  return false
 }
}

class AnswersController {
 //fungsi handler membuat jawaban
 async CreateAnswerDataHandler(req, res) {
  try {
   const {respondent_id, question_id, is_sub_question, subquestion_id, answer} = req.body
   const result = await answerService.CreateAnswerDataService({
    respondent_id,
    question_id,
    is_sub_question,
    subquestion_id,
    answer
   })
   res.status(201).json({message: "Jawaban telah dibuat.", data: result})
  } catch (error) {
   //res.status(400).json({message: "Jawaban dengan id tersebut sudah ada.", error: error.message})
   res.status(400).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler membuat jawaban secara batch (multiple jawaban sekaligus)
 async CreateBatchAnswersHandler(req, res) {
  try {
   // Implementasi rate limiting
   const clientIp = req.ip || req.headers["x-forwarded-for"] || "unknown"
   if (rateLimiter.isRateLimited(clientIp)) {
    return res.status(429).json({
     message: "Terlalu banyak permintaan. Silakan coba lagi nanti.",
     retryAfter: Math.ceil(rateLimiter.windowMs / 1000)
    })
   }

   const {answers} = req.body

   if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({message: "Format data tidak valid. Dibutuhkan array jawaban."})
   }

   // Batasi jumlah jawaban yang dapat dikirim dalam satu permintaan
   if (answers.length > 50) {
    return res.status(400).json({ message: "Jumlah jawaban terlalu banyak. Maksimal 50 jawaban per permintaan."})
   }

   const results = await answerService.CreateBatchAnswersService(answers)
   res.status(201).json({message: `${results.length} jawaban telah dibuat.`})
  } catch (error) {
   console.error(`Error in answer controller - batch create: ${error.message}`)
   res.status(400).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mengambil semua jawaban beserta sub jawaban dari pertanyaan dan sub pertanyaan
 async getAllAnswerDataHandler(req, res) {
  try {
   const answers = await answerService.getAllAnswerDataService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get all: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mendapatkan semua jawaban
 async getAnswersHandler(req, res) {
  try {
   const answers = await answerService.getAnswersDataService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get all: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mendapatkan jawaban berdasarkan ID
 async getAnswerByIdHandler(req, res) {
  try {
   const {answer_id} = req.params
   const answer = await answerService.getAnswerByIdService(answer_id)
   res.status(200).json({data: answer})
  } catch (error) {
   console.error(`Error in answer controller - get by id: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mendapatkan semua jawaban berdasarkan pertanyaan
 async getAllAnswerWithQuestionHandler(req, res) {
  try {
   const answers = await answerService.getAllAnswerWithQuestionService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get with questions: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mendapatkan jawaban berdasarkan ID pertanyaan
 //  async getAllAnswerByQuestionIdHandler(req, res) {
 //   try {
 //    const {question_id} = req.params
 //    const answers = await answerService.getAllAnswerByQuestionIdService(question_id)
 //    res.status(200).json({data: answers})
 //   } catch (error) {
 //    console.error(`Error in answer controller - get by question: ${error.message}`)
 //    res.status(500).json({message: "Internal server error.", error: error.message})
 //   }
 //  }

 //fungsi handler mendapatkan jawaban berdasarkan id pertanyaan dari pertanyaan
 async getAnswersByQuestionIdWithQuestionDataHandler(req, res) {
  try {
   const {question_id} = req.params
   const answers = await answerService.getAnswersByQuestionIdWithQuestionDataService(question_id)
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by question: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 // fungsi handler mendappatkan semua sub jawaban dari subquestion
 async getAllSubAnswerBySubQuestionHandler(req, res) {
  try {
   const {subquestion_id} = req.params
   const answers = await answerService.getAllSubAnswerBySubquestionService(subquestion_id)
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by subquestion: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 async getAllSubAnswerWithQuestionAndSubquestionHandler(req, res) {
  try {
   const answers = await answerService.getAllSubAnswerWithQuestionAndSubquestionService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by subquestion: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handeler mendapatkan sub jawaban berdasarkan id dari subquestion
 async getSubAnswerBySubQuestionIdHandler(req, res) {
  try {
   const {subquestion_id} = req.params
   const answers = await answerService.getSubAnswerBySubquestionIdService(subquestion_id)
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by subquestion: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 // fungsi handler mendapatkan sub jawaban berdasarkan id subpertanayaan dan pertanyaan
 async getSubAnswerBySubQuestionIdAndQuestionIdHandler(req, res) {
  try {
   const {subquestion_id, question_id} = req.params
   const answers = await answerService.getSubQuestionBySubquestionIdAndQuestionIdService(subquestion_id, question_id)
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by subquestion: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 // fungsi handler mendapatkan jawaban berdasarkan jawaban berdasarkan respondent
 async getAnswerByRespondentHandler(req, res) {
  try {
   const answers = await answerService.getAnswersByRespondentDataService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by respondent: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 // fungsi handler mendapatkan jawaban dan pertanyaan beserta respondent dan surveyor
 async getAnswerWithQuestionByRespondentWithSurveyorHandler(req, res) {
  try {
   const answers = await answerService.getAnswerWithQuestionByRespondentWithSurveyorService()
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by respondent: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi hanler untuk mendapakan jawaban perbatch
 async getAnswerWithQuestionByRespondentWithSurveyorPaginationHandler(req, res) {
  try {
   const page = parseInt(req.query.page) || 1
   const limit = parseInt(req.query.limit) || 100
   const result = await answerService.getAnswerWithQuestionByRespondentWithSurveyorPaginationService(page, limit)
   res.status(200).json({
    success: true,
    data: result.data,
    totalCount: result.totalCount,
    page,
    limit
   })
  } catch (error) {
   console.error(`Error in answer controller - get by respondent: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler mendapatkan jawaban berdasarkan jawaban berdasarkan respondent id
 async getAnswersByRespondentIdHandler(req, res) {
  try {
   const {respondent_id} = req.params
   const answers = await answerService.getAnswersByRespondentIdService(respondent_id)
   res.status(200).json({data: answers})
  } catch (error) {
   console.error(`Error in answer controller - get by respondent: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler update jawaban berdasarkan ID
 async updateAnswerHandler(req, res) {
  try {
   const code = req.params.code
   const updatedAnswer = req.body
   const result = await answerService.updateAnswerService(code, updatedAnswer)
   res.status(200).json({message: "Jawaban berhasil diupdate.", data: result})
  } catch (error) {
   console.error(`Error in answer controller - update: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }

 //fungsi handler delete jawaban berdasarkan ID
 async deleteAnswerHandler(req, res) {
  try {
   const {code} = req.params
   const result = await answerService.deleteAnswerService(code)
   res.status(200).json({message: "Jawaban berhasil dihapus.", data: result})
  } catch (error) {
   console.error(`Error in answer controller - delete: ${error.message}`)
   res.status(500).json({message: "Internal server error.", error: error.message})
  }
 }
}

export default new AnswersController()
