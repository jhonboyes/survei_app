import {db} from "../configdb/dbconnect.js"
import {formatName} from "../utils/utils.js"
import respondentController from "../controllers/respondentController.js"
// //import { FieldValue } from 'firebase-admin/firestore';

class AnswerModel {
 // fungsi membuat jawaban baru
 async CreateAnswerData({respondent_id, question_id, subquestion_id = null, is_sub_question = false, answer}) {
  const answerId = `${respondent_id}-${question_id}${subquestion_id ? `-${subquestion_id}` : ""}`
  const answerCode = `Answer-${respondent_id}-${question_id}${subquestion_id ? `-${subquestion_id}` : ""}`
  const formattedanswer = formatName(answer)

  // Melakukan upsert untuk menyimpan atau memperbarui jawaban
  const {data, error} = await db.from("answers").upsert(
   [
    {
     answer_id: answerId,
     code: answerCode,
     respondent_id,
     question_id,
     subquestion_id,
     is_sub_question,
     answer: formattedanswer
    }
   ],
   {onConflict: ["answer_id"], returning: false}
  )
  if (error) {
   throw new Error("Failed to create answer: " + error.message)
  }
  const answerData = {
   answer_id: answerId,
   code: answerCode,
   respondent_id,
   question_id,
   subquestion_id,
   is_sub_question,
   answer: formattedanswer
  }
  return answerData
 }

 // fungsi membuat multiple jawaban sekaligus (batch processing)
 async CreateBatchAnswersData(answersArray) {
  try {
   // Batasi ukuran batch untuk mengurangi beban database
   const MAX_BATCH_SIZE = 50
   const results = []

   // Bagi array jawaban menjadi batch-batch kecil
   for (let i = 0; i < answersArray.length; i += MAX_BATCH_SIZE) {
    const currentBatch = answersArray.slice(i, i + MAX_BATCH_SIZE)

    // Mempersiapkan array untuk upsert batch
    const batchData = currentBatch.map(
     ({respondent_id, question_id, subquestion_id = null, is_sub_question = false, answer}) => {
      const answerId = `${respondent_id}-${question_id}${subquestion_id ? `-${subquestion_id}` : ""}`
      const answerCode = `Answer-${respondent_id}-${question_id}${subquestion_id ? `-${subquestion_id}` : ""}`
      const formattedanswer = formatName(answer)

      return {
       answer_id: answerId,
       code: answerCode,
       respondent_id,
       question_id,
       subquestion_id: is_sub_question ? subquestion_id : null,
       is_sub_question,
       answer: formattedanswer
      }
     }
    )

    // Melakukan upsert batch dengan opsi yang dioptimalkan
    const {data, error} = await db.from("answers").upsert(batchData, {
     onConflict: ["answer_id"],
     returning: false // Tidak perlu mengembalikan data untuk menghemat bandwidth
    })

    if (error) {
     throw new Error("Failed to create batch answers: " + error.message)
    }

    // Tambahkan hasil batch ke array hasil
    results.push(...batchData)

    // Tambahkan jeda kecil antara batch untuk mengurangi beban server
    if (i + MAX_BATCH_SIZE < answersArray.length) {
     await new Promise((resolve) => setTimeout(resolve, 200))
    }
   }

   return results
  } catch (error) {
   console.error("Batch processing error:", error)
   throw new Error(`Error in batch processing: ${error.message}`)
  }
 }

 // fungsi mendapatkan semua jawaban termasuk sub jawaban berdasarkan pertanyaan dan sub pertanyaan
 async getAllAnswerData() {
  const {data, error} = await db
   .from("questions")
   .select(
    `
    question_id,
    question,
    answers:answers (
      answer_id,
      answer,
      is_sub_question
    ),
    subquestions (
      subquestion_id,
      question,
      answers:answers (
        answer_id,
        answer,
        subquestion_id
      )
    )
  `
   )
   .eq("answers.is_sub_question", false)
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 //fungsi mendapatkan semua jawaban
 async getAnswerData() {
  const {data, error} = await db.from("answers").select("*")
  if (error) {
   throw new Error("Failed to fetch answers: " + error.message)
  }
  return data
 }

 // Fungsi mendapatkan jawaban berdasarkan ID
 async getAnswerByIdData(answer_id) {
  const {data, error} = await db.from("answers").select("*").eq("answer_id", answer_id).single()
  if (error) {
   throw new Error("Failed to fetch answer: " + error.message)
  }
  return data
 }

 // fungsi mendapatkan jawaban berdasarkan respondent question
 async getAllAnswerWithQuestionData() {
  const {data, error} = await db.from("questions").select(`
  question_id,
  question,
  type,
  options,
  answers (
    answer_id,
    respondent_id,
    answer,
    is_sub_question,
    subquestion_id
  )
`)
  if (error) {
   console.error("Supabase error:", error.message)
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 // fungsi mendapatkan jawaban berdasarkan id pertanyaan
 //  async getAnswersByQuestionIdService(question_id) {
 //   const {data, error} = await db
 //   .from("answers")
 //   .select("*")
 //   .eq("question_id", question_id)
 //   .single()
 //   if (error) {
 //    throw new Error("Failed to fetch answers: " + error.message)
 //   }
 //   return data
 //  }

 // fungsi mendapatkan jawaban berdarakan id pertanyaan dari pertanyaan
 async getAnswersByQuestionIdWithQuestionIdData(question_id) {
  const {data, error} = await db
   .from("questions")
   .select(
    `
      question_id,
      question,
      type,
      options,
      answers (
        answer_id,
        answer,
        respondent_id,
        is_sub_question,
        subquestion_id
      )
    `
   )
   .eq("question_id", question_id)
   .limit(1)
   .single()
  if (error) {
   console.log("model", error)
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 //fungsi mendapatkan semua sub jawaban berdasarkan semua sub pertanyaan
 async getallSubAnswerBySubQuestion() {
  const {data, error} = await db.from("subquestions").select(`
     question_id,
     subquestion_id,
     question,
     type,
     options,
     answers (
       answer_id,
       respondent_id,
       answer,
       is_sub_question,
       subquestion_id
     )
     `)
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 //fungsi mendapatkan semua sub jawaban dengan sub pertanyaan dan pertanyaan dan
 async getAllSubAnswerWithQuestionAndSubQuestionData() {
  const {data, error} = await db.from("questions").select(`
  question_id,
  question,
  options,
  subquestions (
    subquestion_id,
    question,
    options,
    answers (
      answer_id,
      respondent_id,
      answer
    ))`)
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 //fungsi mendapatkan sub jawaban berdasarkan id subpertanyaan
 async getSubAnswerBySubQuestionIdData(subquestion_id) {
  const {data, error} = await db
   .from("subquestions")
   .select(
    `
    question_id,
    subquestion_id,
    question,
    type,
    options,
    answers (
      answer_id,
      respondent_id,
      answer,
      is_sub_question,
      subquestion_id
    )
    `
   )
   .eq("subquestion_id", subquestion_id)
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 // fungsi mendapatkan sub jawaban berdasarkan id subpertanayaan dan pertanyaan
 async getSubAnswerBySubQuestionIdAndQuestionIdData(subquestion_id, question_id) {
  const {data, error} = await db
   .from("subquestions")
   .select(
    `
  question_id,
  subquestion_id,
  question,
  type,
  options,
  answers (
    answer_id,
    respondent_id,
    answer,
    is_sub_question,
    subquestion_id
  )
  `
   )
   .eq("subquestion_id", subquestion_id)
   .eq("question_id", question_id)
   .single()
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 // fungsi mendapatkan jawaban berdasarkan respondent
 async getAnswersByRespondentData() {
  const {data, error} = await db.from("respondents").select(`
      respondent_id,
      answers (
        code,
        question_id,
        answer,
        is_sub_question,
        subquestion_id
      )
    `)

  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  return data
 }

 // fungsi mendapatkan jawaban beserta pertanyaan berdasarkan respondent
 async getAnwserWithQuestionByRespondentWithSurveyorData() {
  const {data, error} = await db.from("surveyor").select(`
      surveyor_id,
      name,
      respondents:respondents(
        respondent_id,
        surveyor_id,
        status,
        name,
        gender,
        usia,
        kelurahan,
        kecamatan,
        status_respondent,
        photo_url,
        answers:answers(
          question_id,
          respondent_id,
          answer,
          question:questions(
            question_id,
            question,
            type,
            options
          )
        )
      )
    `)
  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }

  return data
 }

 //fungsi get answer per batch 100
 async getAnwserWithQuestionByRespondentWithSurveyorPaginationData(page, limit = 100) {
  const fromindex = (page - 1) * limit
  const toindex = fromindex + limit - 1

  // Query ambil data sesuai range
  const {data, error} = await db
   .from("respondents")
   .select(
    `
        respondent_id,
        surveyor_id,
        status,
        name,
        gender,
        usia,
        kelurahan,
        kecamatan,
        status_respondent,
        photo_url,
        surveyor:surveyor(
          surveyor_id,
          name
        ),
        answers:answers(
          question_id,
          respondent_id,
          answer,
          question:questions(
            question_id,
            question,
            type,
            options
          )
        )
      `
   )
   .range(fromindex, toindex)

  if (error) {
   throw new Error("Failed to fetch paginated respondent answers: " + error.message)
  }

  // Query hitung total count (sekali jalan di sini)
  const {count, error: countError} = await db.from("respondents").select("respondent_id", {count: "exact", head: true})

  if (countError) {
   throw new Error("Failed to count respondents: " + countError.message)
  }

  return {data, totalCount: count}
 }

 // fungsi mendapatkan jawaban berdasarkan respondent id
 async getAnswersByRespondentIdData(respondent_id) {
  const {data, error} = await db
   .from("respondents")
   .select(
    `
      respondent_id,
      surveyor_id,
      status,
      name,
      gender,
      status_respondent,
      answers (
        code,
        question_id,
        answer,
        is_sub_question,
        subquestion_id,
        question:questions(
            question_id,
            question,
            type,
            options
        )
      )
    `
   )
   .eq("respondent_id", respondent_id)
   .single()

  if (error) {
   throw new Error("Failed to fetch answers with questions: " + error.message)
  }
  console.log(data)
  return data
 }

 // fungsi update jawaban berdasarkan id jawaban
 async updateAnswerData(code, updatedAnswerData) {
  const {data, error} = await db.from("answers").update(updatedAnswerData).eq("code", code).select() // Include the updated data in the respons
  if (error) {
   console.error("Supabase error:", error.message)
   throw new Error("Failed to update answer: " + error.message)
  }
  return data
 }

 // fungsi delete jawaban berdasarkan code jawaban
 async deleteAnswerData(code) {
  const {data, error} = await db.from("answers").delete().eq("code", code)
  if (error) {
   throw new Error("Failed to delete answer: " + error.message)
  }
  return data
 }
}

export default new AnswerModel()
