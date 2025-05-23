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
//  createQuestion = async ({Id, question, type, options = [], triggerOption = null}) => {
//   const questionId =  `question-${Id}`

//   const {data, error} = await db
//    .from("question")
//    .insert([{Id: questionId, question, type, options, triggerOption}])
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data
//  }

//  createSubQuestion = async ({Id, questionId, question, type, options = [], triggerOption = null}) => {
//   const SubquestionId = `question-${questionId}-${Id}`
//   const {data, error} = await db
//   .from("subquestion")
//   .insert([{Id: SubquestionId, questionId, question, type, options, triggerOption}])
//  if (error) {
//   throw new Error(error.message)
//  }
//  return data
//  }

//  getAllQuestion = async () => {
//   const {data, error} = await db.from("question").select("*")
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data
//  }

//  getQuestionById = async (Id) => {
//   const questionId = `question-${Id}`
//   const {data, error} = await db.from("question").select("*").eq("Id", questionId).single()
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data
//  }

//  getQuestionByQuestion = async (question) => {
//   const {data, error} = await db.from("question").select("*").eq("question", question)
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data
//  }
// }

//  getSubQuestion = async (parentId) => {
//   const { data, error } = await db
//  .from('subquestion')
//  .select('*')
//  .eq('parentId', parentId)
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data
//  }

//  getSpecificSubQuestion = async (parentId, subId) => {
//   const questionId = `question-${parentId}-${subId}`
//   const { data, error } = await db
//             .from('question')
//            .select('*')
//            .eq('Id', questionId)
//            .single()
//   if (error) {
//    throw new Error(error.message)
//   }
//   return data

//  }

// // const questionCollection = db.collection("question")

// // const CreateQuestion = async ({Id, question, type, options = [], parentId = null, triggerOption = null}) => {
// //  const questionId = parentId ? `question-${parentId}-${Id}` : `question-${Id}`

// //  const isSubQuestion = !!parentId
// //  const questionRef = questionCollection.doc(questionId)
// //  const exists = (await questionRef.get()).exists
// //  if (exists) {
// //   throw new Error("Question already exists")
// //  }
// //  const questionData = {
// //   Id: questionId,
// //   question,
// //   type,
// //   options,
// //   parentId: isSubQuestion ? parentId : null,
// //   triggerOption
// //  }
// //  console.log("Data yang disimpan ke Firestore:", questionData)
// //  await questionRef.set(questionData)
// //  return questionData
// // }

// // const getAllQuestion = async () => {
// //  const snapshot = await questionCollection.get()
// //  return snapshot.docs.map((doc) => doc.data())
// // }

// // const getQuestionById = async (Id) => {
// //  const questionId = `question-${Id}`
// //  const doc = await questionCollection.doc(questionId).get()
// //  if (!doc.exists) throw new Error("Question Not Found")
// //  return doc.data()
// // }

// // // Fungsi baru untuk mengambil sub-pertanyaan spesifik
// // const getSpecificSubQuestion = async (parentId, subId) => {
// //  const questionId = `question-${parentId}-${subId}`
// //  const doc = await questionCollection.doc(questionId).get()
// //  if (!doc.exists) throw new Error("Specific sub-question not found")
// //  return doc.data()
// // }

// // // Fungsi baru untuk mengambil pertanyaan berdasarkan pertanyaan
// // const getQuestionByQuestion = async (question) => {
// //  const query = questionCollection.where("question", "==", question)
// //  const snapshot = await query.get()
// //  if (snapshot.empty) throw new Error("Question not found")
// //  return snapshot.docs.map((doc) => doc.data())
// // }

// // const updateQuestion = async (Id, change) => {
// //  const questionId = `question-${Id}`
// //  const questionRef = questionCollection.doc(questionId)
// //  const doc = await questionRef.get()
// //  if (!doc.exists) throw new Error("Question not found")
// //  delete change.Id
// //  await questionRef.update(change)
// //  const updatedDoc = await questionRef.get() // Fetch the updated document
// //  return updatedDoc.data() // Return the updated data
// // }

// // const getSubQuestion = async (parentId) => {
// //  const query = questionCollection.where("parentId", "==", parentId)
// //  const snapshot = await query.get()
// //  if (snapshot.empty) throw new Error("Sub questions not found")
// //  return snapshot.docs.map((doc) => doc.data())
// // }

// // const updateSubQuestion = async (parentId, change) => {
// //  const query = questionCollection.where("parentId", "==", parentId)
// //  try {
// //   const snapshot = await query.get()
// //   if (snapshot.empty) throw new Error("Sub questions not found")
// //   const batch = db.batch()
// //   snapshot.docs.forEach((doc) => {
// //    batch.update(doc.ref, change)
// //   })
// //   await batch.commit()
// //   const updatedSnapshot = await query.get()
// //   return updatedSnapshot.docs.map((doc) => doc.data()) // Return updated data
// //  } catch (error) {
// //   console.error("Error updating sub questions in model:", error) // Log the specific error
// //   throw new Error("Failed to update sub questions")
// //  }
// // }

// // const deleteQuestion = async (Id) => {
// //  // Renamed parameter for clarity
// //  const questionId = `question-${Id}` // Construct the correct document ID
// //  const questionRef = questionCollection.doc(questionId)
// //  const doc = await questionRef.get()
// //  if (!doc.exists) throw new Error("Question not found")
// //  await questionRef.delete()
// // }

// // const deleteSubQuestion = async (parentId) => {
// //  const query = questionCollection.where("parentId", "==", parentId)
// //  try {
// //   const snapshot = await query.get()
// //   if (snapshot.empty) throw new Error("Sub questions not found")
// //   const batch = db.batch()
// //   snapshot.docs.forEach((doc) => {
// //    batch.delete(doc.ref)
// //   })
// //   await batch.commit()
// //  } catch (error) {
// //   throw new Error("Failed to delete sub questions")
// //  }
// // }

// // // Fungsi baru untuk menghapus sub-pertanyaan spesifik
// // const deleteSpecificSubQuestion = async (parentId, subId) => {
// //  const questionId = `question-${parentId}-${subId}`
// //  const questionRef = questionCollection.doc(questionId)
// //  const doc = await questionRef.get()
// //  if (!doc.exists) throw new Error("Specific sub-question not found")
// //  await questionRef.delete()
// // }

// // const searchQuestion = async (filters = {}) => {
// //  let query = questionCollection
// //  if (filters.text) query = query.where("text", "==", filters.text)
// //  if (filters.type) query = query.where("type", "==", filters.type)
// //  if (filters.parentId) query = query.where("parentId", "==", filters.parentId)
// //  const snapshot = await query.get()
// //  try {
// //   if (snapshot.empty) throw new Error("Questions not found")
// //   return snapshot.docs.map((doc) => doc.data())
// //  } catch (error) {
// //   throw new Error("Failed to search questions")
// //  }
// // }

// // // Fungsi baru untuk memperbarui sub-pertanyaan spesifik
// // const updateSpecificSubQuestion = async (parentId, subId, change) => {
// //  const questionId = `question-${parentId}-${subId}`
// //  const questionRef = questionCollection.doc(questionId)
// //  const doc = await questionRef.get()
// //  if (!doc.exists) throw new Error("Specific sub-question not found")
// //  // Hapus ID dari data perubahan jika ada, karena ID tidak boleh diubah
// //  delete change.Id
// //  await questionRef.update(change)
// //  const updatedDoc = await questionRef.get() // Ambil dokumen yang diperbarui
// //  return updatedDoc.data() // Kembalikan data yang diperbarui
// // }

// // export {
// //  CreateQuestion,
// //  getQuestionByQuestion,
// //  getAllQuestion,
// //  getQuestionById,
// //  getSubQuestion,
// //  getSpecificSubQuestion, // Tambahkan ekspor baru
// //  updateQuestion,
// //  updateSubQuestion,
// //  deleteQuestion,
// //  deleteSubQuestion,
// //  deleteSpecificSubQuestion, // Tambahkan ekspor baru
// //  updateSpecificSubQuestion, // Tambahkan ekspor baru
// //  searchQuestion
// // }
