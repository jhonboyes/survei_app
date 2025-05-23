import { db } from "../configdb/dbconnect.js"

class QuestionModel {
  // fungsi membuat pertanyaan baru
  async CreateQuestionData({ question_id, question, type, options = [] }) {
    const questionCode = `question-${question_id}`
    const { data, error } = await db.from("questions").insert([{ question_id, code: questionCode, question, type, options }])
    if (error) {
      throw new Error(error.message)
    }
    // if (data.length > 0) {
    //   throw new Error(`Pertanyaan dengan id ${question_id} sudah ada`);
    // }
    const questionData = {
      question_id,
      code: questionCode,
      question,
      type,
      options
    }
    return questionData
  }

  // fungsi membuat sub pertanyaan baru
  //  async CreateSubQuestionData({subquestion_id, question_id, question, type, options = [], trigger_option = null}) {
  //   const subquestionCode = `question-${question_id}-${subquestion_id}`
  //   const {data, error} = await db
  //    .from("subquestions")
  //    .insert([{subquestion_id, code: subquestionCode, question_id, question, type, options, trigger_option}])
  //   if (error) {
  //    throw new Error(error.message)
  //   }
  //   const subquestionData = {
  //    subquestion_id,
  //    code: subquestionCode,
  //    question_id,
  //    question,
  //    type,
  //    options,
  //    trigger_option
  //   }
  //   return subquestionData
  //  }

  // fungsi mendapatkan semua pertanyaan
  async getQuestionData() {
    const { data, error } = await db.from("questions").select("*")
    if (error) {
      throw new Error(error.message)
    }
    //   const formatDataQeuestion = {
    //    question_id: `Q-${question_id}`,
    //    question,
    //    type,
    //    options,
    //   }
    return data || []
  }

  // fungsi mendapatkan pertanyaan berdasarkan ID
  async getQuestionById(question_id) {
    const { data, error } = await db.from("questions").select("*").eq("question_id", question_id).single()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  // fungsi mendapatkan semua sub pertanyaan berdasarkan
  async getSubQuestionData() {
    const { data, error } = await db.from("subquestions").select("*")
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  // fungsi mendapatkan sub pertanyaan berdasarkan ID
  async getSubQuestionById(subquestion_id, question_id) {
    const { data, error } = await db
      .from("subquestions")
      .select("*")
      .eq("subquestion_id", subquestion_id)
      .eq("question_id", question_id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    const formattedData = {
      subquestion_id: `Q${question_id}-${subquestion_id}`, // Format ID Q1-1, Q1-2, dst
      question: data.question, // Menyertakan teks pertanyaan
      inputType: data.type,
      options: data.options, // Menyertakan tipe input (misalnya "text", "number", dll)
      triggerOption: data.trigger_option, // Menyertakan opsi yang akan memicu tampilan sub-pertanyaan
    }
    return formattedData
  }

  // fungsi mendapatkan sub pertanyaan berdasarkan pertanyaan
  async getSubQuestionByQuestionId(question_id) {
    const { data, error } = await db.from("subquestions").select("*").eq("question_id", question_id)
    if (error) {
      throw new Error(error.message)
    }
    const formattedData = {
      question_id: question_id, // Menyertakan question_id yang digunakan
      subquestions: data.map((subquestion) => ({
        subquestion_id: `Q${question_id}-${subquestion.subquestion_id}`, // Format ID Q1-1, Q1-2, dst
        text: subquestion.question, // Menyertakan teks pertanyaan
        inputType: subquestion.type,
        options: subquestion.options, // Menyertakan tipe input (misalnya "text", "number", dll)
        triggerOption: subquestion.trigger_option, // Menyertakan opsi yang akan memicu tampilan sub-pertanyaan
      }))
    }
    return formattedData
  }

  //fungsi mendapatkan semua pertanyaan beserta sub pertanyaannya
  async getAllQuestionWithSubquestionData() {
    const { data, error } = await db
      .from('questions')
      .select(`
    question_id,
    question,
    type,
    options,
    subquestions (
      subquestion_id,
      question,
      type,
      options,
      trigger_option
    )
  `)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  //fungsi update pertanyaan
  async updateQuestionData(question_id, updatedData) {
    const { data, error } = await db
      .from("questions")
      .update(updatedData)
      .eq("question_id", question_id)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  //fungsi update sub pertanyaan
  async updateSubQuestionData(subquestion_id, question_id, updatedData) {
    const { data, error } = await db
      .from("subquestions")
      .update(updatedData)
      .eq("subquestion_id", subquestion_id)
      .eq("question_id", question_id)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  //fungsi delete pertanyaan
  async deleteQuestionData(question_id) {
    const { data, error } = await db.from("questions").delete().eq("question_id", question_id).select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  //fungsi delete sub pertanyaan
  async deleteSubQuestionData(subquestion_id, question_id) {
    const { data, error } = await db
      .from("subquestions")
      .delete()
      .eq("subquestion_id", subquestion_id)
      .eq("question_id", question_id)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}

export default new QuestionModel()