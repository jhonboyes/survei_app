// import { messaging } from "firebase-admin"
import RespondentService from "../services/respondentService.js"
// //import surveyorService from "../services/surveyorService.js"

class RespondentController {
    // fungsi handler membuat respondent
    async CreateRespondentDataHandler(req, res) {
        try {

            const { respondent_id, surveyor_id, name, gender, usia, kecamatan, kelurahan, telp, status_respondent } = req.body
            const result = await RespondentService.CreateRespondentDataService({
                respondent_id,
                surveyor_id,
                name,
                gender,
                usia,
                kecamatan,
                kelurahan,
                telp,
                status_respondent
            })
            return res.status(201).json({ message: "Respondent data saved successfully by Admin.", data: result })
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    async CreateRespondentDataFromSurveyor(req, res) {
        try {
            const { respondent_id, surveyor_id, name, gender, usia, kecamatan, kelurahan, telp, status_respondent } = req.body
            const result = await RespondentService.CreateRespondentDataService({
                respondent_id,
                surveyor_id,
                name,
                gender,
                usia,
                kecamatan,
                kelurahan,
                telp,
                status: "progress",
                status_respondent
            })
            return res.status(201).json({ message: "Respondent data saved successfully by Surveyor", data: result })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler mendapatkan semua respondent
    async getRerespondentDataHandler(req, res) {
        try {
            const result = await RespondentService.getRespondentDataService()
            return res.status(200).json(result)
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler mendapatkan respondent berdasarkan id respondent
    async getRespondentByIdHandler(req, res) {
        try {
            const { respondent_id } = req.params
            const result = await RespondentService.getRespondentByIdService(respondent_id)
            return res.status(200).json(result)
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    // fungsi handler mendapatkan semua respondent dengan surveyor
    async getRespondentWithSurveyorDataHandler(req, res) {
        try {
            const result = await RespondentService.getRespondentWithSurveyorDataService()
            return res.status(200).json(result)
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    //fungsi handler mendapatkan semua respondent berdasarkan id surveyor
    async getRespondentBySurveyorIdHandler(req, res) {
        try {
            const { surveyor_id } = req.params
            const result = await RespondentService.getRespondentBySurveyorIdService(surveyor_id)
            return res.status(200).json(result)
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    //fungsi handler update respondent berdasarkan id respondent
    async updateRespondentDataHandler(req, res) {
        try {
            const { respondent_id } = req.params
            const updatedData = req.body
            const result = await RespondentService.updateRespondentDataService(respondent_id, updatedData)
            return res.status(200).json({ message: "Respondent data updated successfully.", data: result })
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    //fungsi handler update status
    async updateStatusRespondentHandler(req, res) {
        try {
            const { respondent_id } = req.params
            const { status } = req.body
            const result = await RespondentService.updateStatusRespondentService(respondent_id, status)
            return res.status(201).json({ message: "status update", data: result })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    //fungsi handler delete respondent berdasarkan id respondent
    async deleteRespondentDataHandler(req, res) {
        try {
            const { respondent_id } = req.params
            const result = await RespondentService.deleteRespondentByIdService(respondent_id)
            return res.status(200).json({ message: "Respondent data deleted successfully.", data: result })
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }

    async uploadRespondentPhotoHandler(req, res) {
        try {
            const { respondent_id } = req.params
            const file = req.file
            if (!file) {
                return res.status(400).json({ message: "No file uploaded" })
            }
            const fileBuffer = file.buffer
            const mimeType = file.mimetype
            const result = await RespondentService.UploadRespondentPhotoService(fileBuffer, respondent_id, mimeType)
            return res.status(200).json({ message: "Respondent photo uploaded successfully.", data: result })
        } catch (error) {
            console.error("FROM CONTROLLER:", error.message)
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new RespondentController()