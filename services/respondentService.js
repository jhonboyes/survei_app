import RespondentModel from "../models/respondentModel.js"
import SurveyorModel from "../models/surveyorModel.js" // Import function to get surveyor data

class RespondentService {
    // fungsi logic membuat respondent
    async CreateRespondentDataService({
        respondent_id,
        surveyor_id,
        status,
        gender,
        name,
        usia,
        kecamatan,
        kelurahan,
        telp,
        status_respondent
    }) {
        try {
            const surveyorArray = await SurveyorModel.getSurveyorDataById(surveyor_id)
            if (!surveyorArray || surveyorArray.length === 0) {
                throw new Error(`Surveyor with ID ${surveyor_id} not found.`)
            }
            const surveyorData = surveyorArray[0] // Access the first element of the array
            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }
            //    if (
            //     !surveyorData.assignedrange ||
            //     typeof surveyorData.assignedrange.start === "undefined" ||
            //     typeof surveyorData.assignedrange.end === "undefined"
            //    ) {
            //     throw new Error(`Assigned range is not properly defined for surveyor ${surveyor_id}.`)
            //    }
            const surveyorrangestart = surveyorData.assignedrange.start
            const surveyorrangeend = surveyorData.assignedrange.end
            if (respondent_id < surveyorrangestart || respondent_id > surveyorrangeend) {
                throw new Error(
                    `Respondent ${respondent_id} tidak dalam range yang ditentukan ${surveyorrangestart}-${surveyorrangeend}, ${surveyor_id} masukkan responden no responden yang benar.`
                )
            }
            return await RespondentModel.CreateRespondentData({
                respondent_id,
                surveyor_id,
                status,
                name,
                gender,
                usia,
                kecamatan,
                kelurahan,
                telp,
                status_respondent
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // fungsi logic mendapatkan respondent data
    async getRespondentDataService() {
        try {
            const respondents = await RespondentModel.getRespondentData()
            if (!respondents || respondents.length === 0) {
                return [] // Return an empty array if no respondents are found
            }
            return respondents
        } catch (error) {
            console.error("Error in respondent service - get all:", error.message)
            throw error
        }
    }

    //fungsi logic mendapatkan respondent by id
    async getRespondentByIdService(respondent_id) {
        try {
            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }
            const respondent = await RespondentModel.getRespondentById(respondent_id)
            return respondent // Might be null if not found
        } catch (error) {
            console.error("Error in respondent service - get by ID:", error.message)
            throw error
        }
    }

    //fungsi mendapatkan semua respodent berdasarkan semua surveyor
    async getRespondentWithSurveyorDataService() {
        try {
            const respondents = await RespondentModel.getRespondentWithSurveyorData()
            if (!respondents || respondents.length === 0) {
                throw new Error("No respondents found.")
            }
            return respondents
        } catch (error) {
            console.error("Error in respondent service - get all with surveyor data:", error.message)
            throw error
        }
    }

    //fungsi logic mendapatkan semua respondent dengan surveyorid
    async getRespondentBySurveyorIdService(surveyor_id, status) {
        try {
            if (!surveyor_id) {
                throw new Error("Surveyor ID is required.")
            }
            const respondents = await RespondentModel.getRespondentBySurveyorId(surveyor_id, status)
            return respondents // Might be null if not found
        } catch (error) {
            console.error("Error in respondent service - get by surveyor ID:", error.message)
            throw error
        }
    }

    // fungsi logic update respondent
    async updateRespondentDataService(respondent_id, updatedData) {
        try {
            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }
            const result = await RespondentModel.updateRespondentData(respondent_id, updatedData)
            //    if (!result) {
            //     throw new Error("Respondent not found")
            //    }
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //fungsi logic update status
    async updateStatusRespondentService(respondent_id, status) {
        try {
            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }

            const updatedRespondent = await RespondentModel.updateStatusRespondent(respondent_id, status)

            if (["not_started", "in_progress", "completed"].includes(status)) {
                return updatedRespondent
            }

            throw new Error("Invalid status value.")
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //fungsi logic delete respondent
    async deleteRespondentByIdService(respondent_id) {
        try {
            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }
            const result = await RespondentModel.deleteRespondentById(respondent_id)
            return result
        } catch (error) {
            console.error("Error in respondent service - delete:", error.message)
            throw error
        }
    }

    async UploadRespondentPhotoService(fileBuffer, respondent_id, mimeType) {
        try {

            if (!respondent_id) {
                throw new Error("Respondent ID is required.")
            }
            const MAX_FILE_SIZE = 200 * 1024 // 200 KB in bytes

            if (fileBuffer.length > MAX_FILE_SIZE) {
                throw new Error("file terlalu besar")
            }

            const upload = await RespondentModel.uploadRespondentPhoto(fileBuffer, respondent_id, mimeType)

            if (!upload) {
                throw new Error("Failed to upload photo.")
            }

            return upload
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default new RespondentService()
