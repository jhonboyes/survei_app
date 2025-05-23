import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import adminRoutes from "./routes/adminRoutes.js"
import surveyorRoutes from "./routes/surveyorRoutes.js"
import respondentRoutes from "./routes/respondentRoutes.js"
import questionRoutes from "./routes/questionRoutes.js"
import answerRoutes from "./routes/answerRoutes.js" // Import answer routes
// import respondentRoutes from "./routes/respondentRoutes.js" // Import respondent routes
//import submissionRoutes from "./routes/submissionRoutes.js" // Import submission routes
// import anwersRoutes from "./routes/asnswerRoutes.js"
// import questionRoutes from "./routes/questionRoutes.js"
// import responsesRoutes from "./routes/responsesRoutes.js"
// import surveyorRoutes from "./routes/surveyorRoutes.js"
// import dashboardRoutes from "./routes/dashboardRoutes.js"
// questionRoutes.js" // Question routes

// Inisialisasi dotenv untuk variabel lingkungan
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
// const ip = http://103.4.54.131

// Middleware
//app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/admin", adminRoutes)
app.use("/surveyor", surveyorRoutes)
app.use("/respondent", respondentRoutes) 
app.use("/question", questionRoutes)
app.use("/answer", answerRoutes) // Use answer routes with /answers path
// app.use("/respondent", respondentRoutes) // Use respondent routes
//app.use("/", submissionRoutes) // Use submission routes (e.g., POST /submit)
// app.use("/questions", questionRoutes)
// app.use("/responses", responsesRoutes)
// app.use("/surveyors", surveyorRoutes)
// app.use("/dashboard", dashboardRoutes)

app.use((err, req, res, next) => {
 console.error(err.stack)
 res.status(500).json({
  success: false,
  message: "Terjadi kesalahan pada server",
  error: process.env.NODE_ENV === "development" ? err.message : undefined
 })
})

app.listen(port, "0.0.0.0", () => {
 console.log(`Server is running on http://0.0.0.0:${port}`)
})
