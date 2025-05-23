import SurveyorModel from "../models/surveyorModel.js"

// import {isRangeOverlap} from "../utils/utils.js"

class SurveyorService {
    async createSurveyorService({ surveyor_id, assignedrange, name = "" }) {
        if (!surveyor_id || !assignedrange || typeof assignedrange.start !== "number" || typeof assignedrange.end !== "number") {
            throw new Error("Surveryor data tidak lengkap")
        }

        // Optional: validasi ID harus 3 digit angka
        // if (typeof surveyor_id !== "string" || !/^\d{3}$/.test(surveyor_id)) {
        //     throw new Error("surveyor_id untuk pertanyaan utama harus 3 angka, contoh: 001")
        // }

        const newStart = assignedrange.start
        const newEnd = assignedrange.end
        if (newStart > newEnd) {
            throw new Error("Rentang awal tidak boleh lebih besar dari rentang akhir")
        }
        if (newStart === newEnd) {
            throw new Error("Rentang awal tidak boleh sama dengan rentang akhir")
        }

        const allSurveyors = await SurveyorModel.getSurveyorData()

        const isDuplicate = allSurveyors.some(s => s.surveyor_id === surveyor_id)
        if (isDuplicate) {
            throw new Error(`Surveyor dengan id ${surveyor_id} sudah ada`)
        }

        // 🔁 Cek overlap range
        for (const surveyor of allSurveyors) {
            const existingAssignedRange = surveyor.assignedrange
            if (!existingAssignedRange) continue

            const existingStart = existingAssignedRange.start
            const existingEnd = existingAssignedRange.end

            if (newStart <= existingEnd && newEnd >= existingStart) {
                throw new Error(
                    `rentang ${newStart}-${newEnd} tumpang tindih dengan rentang ${existingStart}-${existingEnd} milik surveyor ${surveyor.surveyor_id}`
                )
            }
        }

        return await SurveyorModel.CreateSurveyorData({ surveyor_id, assignedrange, name })
    }

    getSurveyorDataService() {
        return SurveyorModel.getSurveyorData()
    }


    async getSurveyorDataByIdService(surveyor_id) {
        if (!surveyor_id) {
            throw new Error("Surveyor id is required")
        }
        const surveyor = await SurveyorModel.getSurveyorDataById(surveyor_id)
        if (!surveyor) {
            throw new Error("Surveyor not found")
        }
        return surveyor

    }

    async updateSurveyorNameService(surveyor_id, name) {
        if (!surveyor_id || !name) {
            throw new Error("Invalid surveyor data")
        }
        return await SurveyorModel.updateSurveyorName(surveyor_id, name)
    }

    async updateSurveyorDataService(surveyor_id, code, assignedrange, name) {
        if (!surveyor_id || !code || !assignedrange || !name) {
            throw new Error("Invalid surveyor data")
        }
        return await SurveyorModel.updateSurveyorData(surveyor_id, code, assignedrange, name)
    }

    async deleteSurveyorService(surveyor_id) {
        if (!surveyor_id) {
            throw new Error("Surveyor id is required")
        }
        return await SurveyorModel.deleteSurveyor(surveyor_id)
    }

    // fungsi logic login surveyor
    async loginSurveyorService({ code, surveyor_id }) {
        if (!surveyor_id || !code) {
            throw new Error("surveyor_id and code are required")
        }
        const surveyor = await SurveyorModel.loginSurveyor({ surveyor_id, code })
        if (!surveyor || surveyor.length === 0) {
            throw new Error("Surveyor not found")
        }
        if (!surveyor) {
            throw new Error("Surveyor ID atau kode tidak cocok");
        }

        return surveyor
    }

}

export default new SurveyorService()

//     async getSurveyor(Id, name) {
//         if (!Id && !name) {
//             throw new Error("Id or name is required")
//         }
//         return await surveyorModel.getSurveyorUuid(Id, name)
//     }

//     async updateSurveyorName(Id, name) {
//         if (!Id || !name) {
//             throw new Error("Id and name are required")
//         }
//         if (!name) {
//             return res.status(400).json({ message: "Name is required in the request body." })
//         }
//         return await surveyorModel.updateSurveyorName(Id, name)
//     }

//     async getAllSurveyors() {
//         return await surveyorModel.GetAllSurveyor()
//     }

//     async updateSurveyor({ Id, code, assignedRange, name }) {
//         if (!Id) {
//             throw new Error("Surveyor Id is required")
//         }

//         // Prepare update data object
//         const updateData = { Id }
//         let hasUpdateField = false

//         if (code !== undefined) {
//             updateData.code = code
//             hasUpdateField = true
//         }
//         if (name !== undefined) {
//             updateData.name = name
//             hasUpdateField = true
//         }
//         if (assignedRange !== undefined) {
//             if (typeof assignedRange.start !== "number" || typeof assignedRange.end !== "number") {
//                 throw new Error("Invalid assignedRange data: start and end must be numbers")
//             }
//             const newStart = assignedRange.start
//             const newEnd = assignedRange.end
//             if (newStart > newEnd) {
//                 throw new Error("Start range cannot be greater than end range")
//             }
//             if (newStart === newEnd) {
//                 throw new Error("Start range cannot be equal to end range")
//             }

//             // Check for overlap with other surveyors
//             const allSurveyors = await surveyorModel.GetAllSurveyor()
//             for (const surveyor of allSurveyors) {
//                 // Skip checking against the surveyor being updated
//                 if (surveyor.Id === Id) continue

//                 const existingAssignedRange = surveyor.assignedRange
//                 if (!existingAssignedRange) continue

//                 const existingStart = existingAssignedRange.start
//                 const existingEnd = existingAssignedRange.end

//                 if (newStart <= existingEnd && newEnd >= existingStart) {
//                     throw new Error(
//                         `Assigned range [${newStart}-${newEnd}] overlaps with existing range [${existingStart}-${existingEnd}] for surveyor ${surveyor.Id}`
//                     )
//                 }
//             }
//             updateData.assignedRange = assignedRange
//             hasUpdateField = true
//         }

//         if (!hasUpdateField) {
//             throw new Error("At least one field (code, assignedRange, name) must be provided for update")
//         }

//         console.log("FROM MOIDEL", updateData)
//         return await surveyorModel.UpdateSurveyor(updateData)
//     }

//     async deleteSurveyor(Id) {
//         if (!Id) {
//             throw new Error("Id and name are required")
//         }
//         await surveyorModel.deleteSurveyor(Id)
//         return { message: "Surveyor deleted successfully" }
//     }

//     async searchSurveyors({ Id, name, code, assignedRange, start, end }) {
//         const surveyorData = await surveyorModel.searchSurveyor({ Id, name, code, assignedRange, start, end })
//         if (surveyorData.length === 0) {
//             throw new Error("No surveyors found")
//         }
//         return surveyorData
//     }
// }

// export default new SurveyorService()
