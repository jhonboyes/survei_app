import { stat } from "fs"
import { db } from "../configdb/dbconnect.js"
import { formatName, formatTempat } from "../utils/utils.js"

// const respondentCollection = db.collection("respondents")

class RespondentModel {
  // fungsi membuat respondent id
  async CreateRespondentData({
    respondent_id,
    surveyor_id,
    status = "not started",
    name,
    gender,
    usia,
    kecamatan,
    kelurahan,
    telp,
    status_respondent
  }) {
    const respondentCode = `Respondent-${respondent_id}` // ID yang unik untuk responden
    const formattedNama = formatName(name)
    const formattedKecamatan = formatTempat(kecamatan)
    const formattedKelurahan = formatTempat(kelurahan)

    const { data, error } = await db.from("respondents").upsert(
      [
        {
          respondent_id,
          code: respondentCode,
          surveyor_id,
          status,
          name: formattedNama,
          gender,
          usia,
          kecamatan: formattedKecamatan,
          kelurahan: formattedKelurahan,
          telp,
          status_respondent
        }
      ],
      { onConflict: ["surveyor_id", "respondent_id"] }
    )
    if (error) {
      throw new Error(error.message)
    }

    const respondentData = {
      respondent_id,
      code: respondentCode,
      surveyor_id,
      status,
      name: formattedNama,
      gender,
      usia,
      kecamatan: formattedKecamatan,
      kelurahan: formattedKelurahan,
      telp,
      status_respondent
    }
    return respondentData
  }

  // fungsi mendapatkan respondent data
  async getRespondentData() {
    const { data, error } = await db.from("respondents").select("*")

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  // fungsi mendapatkan respondent id
  async getRespondentById(respondent_id) {
    const { data, error } = await db.from("respondents").select("*").eq("respondent_id", respondent_id).single()

    if (error) {
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error("Respondent not found")
    }
    return data
  }

  //fungsi mendapatkan semua respondet berdasarkan surveyor
  async getRespondentWithSurveyorData() {
    const { data, error } = await db.from("surveyor").select(`
      surveyor_id,
      name,
      respondents:respondents(
      respondent_id,
      name,
      code,
      status
      )
      `)
    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  //fungsi mendapatkan respondent dengan surveyor id
  async getRespondentBySurveyorId(surveyor_id) {
    const { data, error } = await db
      .from("surveyor")
      .select(
        `
      surveyor_id,
      name,
      respondents (
        respondent_id,
        code,
        name,
        status
      )
    `
      )
      .eq("surveyor_id", surveyor_id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data // Kembalikan hasil yang didapat
  }

  //fungsi updata respondent
  async updateRespondentData(respondent_id, updatedData) {
    const respondentCode = `Respondent-${respondent_id}`

    const finalData = {
      ...updatedData,
      code: respondentCode
    }

    const { data, error } = await db.from("respondents").update(finalData).eq("respondent_id", respondent_id).select("*")

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  //fungsi update status
  async updateStatusRespondent(respondent_id, status) {
    const { data, error } = await db
      .from("respondents")
      .update({ status })
      .eq("respondent_id", respondent_id)
      .select()
      .single()

    if (error) {
      throw new Error("Failed to update status: " + error.message)
    }

    return data
  }

  // fungsi delete respondent
  async deleteRespondentById(respondent_id) {
    const { data, error } = await db.from("respondents").delete().eq("respondent_id", respondent_id)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async uploadRespondentPhoto(fileBuffer, respondent_id, mimeType) {
    // Generate fileName dengan respondent_id dan timestamp supaya unik
    const fileName = `respondents/respondent-${respondent_id}-${Date.now()}.jpg`

    // Upload file ke bucket 'survei'
    const { data, error: uploadError } = await db.storage.from("survei").upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: true
    })

    if (uploadError) {
      throw new Error("Failed to upload file: " + uploadError.message)
    }

    // Dapatkan public URL
    const { data: publicUrlData, error: urlError } = db.storage.from("survei").getPublicUrl(fileName)

    if (urlError) {
      throw new Error("Failed to get public URL: " + urlError.message)
    }

    const photoUrl = publicUrlData.publicUrl

    // Update kolom photo_url di tabel respondents
    const { error: updateError } = await db
      .from("respondents")
      .update({ photo_url: photoUrl }) // sesuaikan nama kolom dengan DB-mu
      .eq("respondent_id", respondent_id)

    if (updateError) {
      throw new Error("Failed to update respondent photo URL: " + updateError.message)
    }

    return photoUrl
  }
}

export default new RespondentModel()

// const createOrUpdateRespondent = async ({Id, surveyorId}) => {
//  const respondentId = `respondent-${Id}` // ID yang unik untuk responden
//  const respondentRef = respondentCollection.doc(respondentId)

//  const exists = (await respondentRef.get()).exists
//  if (exists) {
//   throw new Error("Respondent already exists")
//  }

//  const respondentData = {
//   Id: respondentId,
//   surveyorId: `surveyor-${surveyorId}`,
//   createdAt: Date.now()
//  }

//  await respondentRef.set(respondentData, {merge: true}) // Gunakan merge: true agar data baru masuk atau update
//  return respondentData
// }

// const getRespondentById = async (Id) => {
//  const respondentId = `respondent-${Id}`
//  const respondentRef = respondentCollection.doc(respondentId)
//  const doc = await respondentRef.get()
//  if (!doc.exists) {
//   throw new Error("Respondent not found")
//  }
//  return doc.data()
// }

// const getAllRespondent = async () => {
//  const snapshot = await respondentCollection.get()
//  if (snapshot.empty) {
//   throw new Error("No respondents found")
//  }
//  return snapshot.docs.map((doc) => doc.data())
// }

// const updateRespondent = async (Id, updatedData) => {
//  const respondentId = `respondent-${Id}`
//  const respondentRef = respondentCollection.doc(respondentId)
//  const doc = await respondentRef.get()
//  if (!doc.exists) {
//   throw new Error("Respondent not found")
//  }
//  delete updatedData.Id // Hapus Id dari data yang diupdate
//  delete updatedData.surveyorId // Hapus surveyorId dari data yang diupdate
//  await respondentRef.update(updatedData)
//  const updatedRespondent = await respondentRef.get()
//  return updatedRespondent.data()
// }

// const deleteRespondentById = async (Id) => {
//  const respondentId = `respondent-${Id}`
//  const respondentRef = respondentCollection.doc(respondentId)
//  const doc = await respondentRef.get()
//  if (!doc.exists) {
//   throw new Error("Respondent not found")
//  }
//  await respondentRef.delete()
//  return "Respondent deleted successfully"
// }

// export {createOrUpdateRespondent, getRespondentById, getAllRespondent, updateRespondent, deleteRespondentById}
