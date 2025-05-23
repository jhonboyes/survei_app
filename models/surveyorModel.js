import { db } from "../configdb/dbconnect.js"
import { formatName } from "../utils/utils.js"

class SurveyorModel {
    async CreateSurveyorData({ surveyor_id, assignedrange, name = "" }) {
        //const surveyorId = `surveyor-${surveyor_id}`
        const code = `Surveyor-${surveyor_id}`
        const formattedName = formatName(name)

        const { data, error } = await db
            .from("surveyor")
            .insert([
                { surveyor_id, code, assignedrange, name: formattedName },
            ])

        if (error) {
            throw new Error(error.message)
        }

        const validrange = {
            start: assignedrange.start,
            end: assignedrange.end
        }

        const surveyorData = {
            surveyor_id,
            code,
            assignedrange: validrange,
            name: formattedName,
        }
        return surveyorData
    }

    async getSurveyorData() {
        const { data, error } = await db
            .from("surveyor")
            .select("*")
        if (error) {
            throw new Error(error.message)
        }
        return data
    }

    async getSurveyorDataById(surveyor_id) {
        const surveyor = `${surveyor_id}`
        const { data, error } = await db
            .from("surveyor")
            .select("*")
            .eq("surveyor_id", surveyor)

        if (error) {
            throw new Error(error.message)
        }
        return data
    }

    async updateSurveyorName(surveyor_id, name) {
        const surveyor = `${surveyor_id}`
        const formattedName = formatName(name)
        const { data, error } = await db
            .from("surveyor")
            .update({ name: formattedName })
            .eq("surveyor_id", surveyor)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return { message: "Surveyor name updated successfully", data }

    }

    async updateSurveyorData(surveyor_id, code, assignedrange, name) {
        const surveyor = `${surveyor_id}`
        const formattedName = formatName(name)
        const { data, error } = await db
            .from("surveyor")
            .update({ code, assignedrange, name: formattedName })
            .eq("surveyor_id", surveyor)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return { message: "Surveyor updated successfully", data }
    }

    async deleteSurveyor(surveyor_id) {
        const surveyor = `${surveyor_id}`
        const { error } = await db
            .from("surveyor")
            .delete()
            .eq("surveyor_id", surveyor)

        if (error) {
            throw new Error(error.message)
        }

        return { message: "Surveyor deleted successfully" }
    }

    //fungsi login surveyor    
    async loginSurveyor({surveyor_id, code}) {
        const { data, error } = await db
           .from("surveyor")
           .select("*")
           .eq("surveyor_id", surveyor_id)
           .eq("code", code)
           console.log(data)

        if (error) {
            throw new Error(error.message)
        }
        return data
    }
 

}

export default new SurveyorModel()

//     async getSurveyorUuid(Id) {
//         const surveyorId = `surveyor-${Id}`
//         const { data, error } = await db
//             .from("surveyor")
//             .select("*")
//             .eq("Id", surveyorId)

//         if (error) {
//             throw new Error(error.message)
//         }

//         return data
//     }

//     async updateSurveyorName(Id, name) {
//         const surveyorId = `surveyor-${Id}`
//         const { data, error } = await db
//            .from("surveyor")
//            .update({ name })
//            .eq("Id", surveyorId)

//         if (error) {
//             throw new Error(error.message)
//         }

//         return { message: "Surveyor name updated successfully", data }
//     }

//     async GetAllSurveyor() {
//         const { data, error } = await db
//            .from("surveyor")
//            .select("*")

//         if (error) {
//             throw new Error(error.message)
//         }

//         return data
//     }

//     async UpdateSurveyor({ Id, code, assignedRange, name }) {
//         const surveyorId = `surveyor-${Id}`
//         const { data, error } = await db
//           .from("surveyor")
//           .update({ code, assignedRange, name })
//           .eq("Id", surveyorId)

//         if (error) {
//             throw new Error(error.message)
//         }

//         return { message: "Surveyor updated successfully", data }
//     }

//     async deleteSurveyor(Id) {
//         const surveyorId = `surveyor-${Id}`
//         const { error } = await db
//           .from("surveyor")
//           .delete()
//           .eq("Id", surveyorId)

//         if (error) {
//             throw new Error(error.message)
//         }

//         return { message: "Surveyor deleted successfully" }
//     }

//     searchSurveyor = async ({ Id, name, code, assignedRange, start, end }) => {
//         let query = db.from("surveyor")

//         if (Id) {
//             const surveyorId = Id.startsWith("surveyor-") ? Id : `surveyor-${Id}`
//             query = query.eq("Id", surveyorId)
//         }

//         if (name) {
//             query = query.eq("name", name)
//         }

//         if (code) {
//             query = query.eq("code", code)
//         }

//         if (assignedRange) {
//             query = query.eq("assignedRange", assignedRange)
//         }

//         if (start !== undefined && end !== undefined) {
//             query = query.gte("assignedRange.start", start).lte("assignedRange.end", end)
//         }

//         const { data, error } = await query.select("*")

//         if (error) {
//             throw new Error(error.message)
//         }

//         return data

//     }
// }

// export default new surveyorModel()