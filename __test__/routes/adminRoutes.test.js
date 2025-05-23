import request from "supertest"
import express from "express"
import adminRoutes from "../../routes/adminRoutes.js"
import adminService from "../../services/adminService.js"

jest.mock("../services/adminService.js") // mock service layer

const app = express()
app.use(express.json())
app.use("/", adminRoutes)

describe("Admin Routes", () => {
 describe("POST /signup", () => {
  it("should return 201 if admin created", async () => {
   adminService.createAdmin.mockResolvedValue("mockedAdminId")

   const res = await request(app).post("/signup").send({
    username: "testuser",
    password: "testpass"
   })

   expect(res.statusCode).toBe(201)
   expect(res.body).toEqual({
    message: "Admin created successfully",
    adminId: "mockedAdminId"
   })
  })

  it("should return 400 if error", async () => {
   adminService.createAdmin.mockRejectedValue(new Error("Invalid data"))

   const res = await request(app).post("/signup").send({
    username: "",
    password: ""
   })

   expect(res.statusCode).toBe(400)
   expect(res.body).toEqual({message: "Invalid data"})
  })
 })

 describe("POST /login", () => {
  it("should return 200 if login successful", async () => {
   adminService.loginAdmin.mockResolvedValue({id: 1, username: "testuser"})

   const res = await request(app).post("/login").send({
    username: "testuser",
    password: "testpass"
   })

   expect(res.statusCode).toBe(200)
   expect(res.body).toEqual({
    message: "Login successful",
    adminData: {id: 1, username: "testuser"}
   })
  })

  it("should return 401 if login fails", async () => {
   adminService.loginAdmin.mockRejectedValue(new Error("Login gagal"))

   const res = await request(app).post("/login").send({
    username: "wrong",
    password: "wrong"
   })

   expect(res.statusCode).toBe(401)
   expect(res.body).toEqual({message: "Login gagal"})
  })
 })
})
