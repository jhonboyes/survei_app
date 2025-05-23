import surveyorService from "../services/surveyorService.js"

class SurveyorController {
 createSurveyorHandler = async (req, res) => {
  try {
   const {surveyor_id, assignedrange, name} = req.body
   const surveyorData = await surveyorService.createSurveyorService({surveyor_id, assignedrange, name})
   res.status(201).json(surveyorData)
  } catch (err) {
   res.status(400).json({message: err.message})
  }
 }

 getSurveyorHandler = async (req, res) => {
  try {
   const surveyor = await surveyorService.getSurveyorDataService(req.query)
   return res.status(200).json(surveyor)
  } catch (err) {
   res.status(404).json({message: err.message})
  }
 }

 getSurveyorByIdHandler = async (req, res) => {
  try {
   const {surveyor_id} = req.params
   const surveyor = await surveyorService.getSurveyorDataByIdService(surveyor_id)
   return res.status(200).json(surveyor)
  } catch (err) {
   res.status(404).json({message: err.message})
  }
 }
 updateSurveyorNameHandler = async (req, res) => {
  try {
   const {surveyor_id} = req.params
   const {name} = req.body
   const surveyor = await surveyorService.updateSurveyorNameService(surveyor_id, name)
   return res.status(200).json(surveyor)
  } catch (err) {
   res.status(400).json({message: err.message})
  }
 }

 updateSurveyorDataHandler = async (req, res) => {
  try {
   const {surveyor_id} = req.params
   const {code, assignedrange, name} = req.body
   const surveyor = await surveyorService.updateSurveyorDataService(surveyor_id, code, assignedrange, name)
   return res.status(200).json(surveyor)
  } catch (err) {
   res.status(400).json({message: err.message})
  }
 }

 deleteSurveyorHandler = async (req, res) => {
  try {
   const {surveyor_id} = req.params
   const surveyor = await surveyorService.deleteSurveyorService(surveyor_id)
   return res.status(200).json(surveyor)
  } catch (err) {
   res.status(400).json({message: err.message})
  }
 }

 //fungsi login surveyor
 loginSurveyorHandler = async (req, res) => {
  try {
   const {surveyor_id, code} = req.body
   const surveyor = await surveyorService.loginSurveyorService({surveyor_id, code})
   return res.status(200).json({"message": "Login Success", data: surveyor})
  } catch (err) {
   console.log(err)
   res.status(400).json({message: err.message})
  }
 }
}

export default new SurveyorController()

// const getSurveyorHandler = async (req, res) => {
//     try {
//         const { Id, name } = req.query
//         const surveyorData = await surveyorService.getSurveyor(Id, name)
//         return res.status(200).json(surveyorData)
//     } catch (err) {
//         res.status(404).json({ message: err.message })
//     }
// }

// const updateSurveyorNameHandler = async (req, res) => {
//     try {
//         const { Id } = req.params // Get Id from URL params
//         const { name } = req.body // Get name from request body
//         const surveyor = await surveyorService.updateSurveyorName(Id, name)
//         return res.status(200).json(surveyor)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// }

// const getAllSurveyorHandler = async (req, res) => {
//     try {
//         const surveyor = await surveyorService.getAllSurveyors()
//         return res.status(200).json(surveyor)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }

// const updateSurveyorHandler = async (req, res) => {
//     try {
//         const { Id } = req.params
//         const { code, assignedRange, name } = req.body
//         const surveyorData = await surveyorService.updateSurveyor({ Id, code, assignedRange, name })
//         res.status(200).json(surveyorData)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// }

// const deleteSurveyorHandler = async (req, res) => {
//     try {
//         const { Id } = req.params
//         if (!Id) {
//             return res.status(400).json({ message: "Surveyor Id is required" })
//         }
//         const result = await surveyorService.deleteSurveyor(Id)
//         res.status(200).json(result)
//     } catch (err) {
//         const statusCode = err.message.includes("not found") ? 404 : 400
//         res.status(statusCode).json({ message: err.message })
//     }
// }

// const searchSurveyorHandler = async (req, res) => {
//     try {
//         const { Id, name, code, assignedRange, start, end } = req.query
//         const surveyorData = await surveyorService.searchSurveyors({ Id, name, code, assignedRange, start, end })
//         return res.status(200).json(surveyorData)
//     } catch (err) {
//         res.status(404).json({ message: err.message })
//     }
// }

// export default {
//     createSurveyorHandler,
//     getSurveyorHandler,
//     updateSurveyorNameHandler,
//     getAllSurveyorHandler,
//     updateSurveyorHandler,
//     deleteSurveyorHandler,
//     searchSurveyorHandler
// }
//
