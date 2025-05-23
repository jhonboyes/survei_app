// adminController.test.js
import adminController from "../controllers/adminController.js"
import adminService from "../services/adminService.js"

jest.mock("../../services/adminService.js")

const mockReq = (body) => ({body})
const mockRes = () => {
 const res = {}
 res.status = jest.fn().mockReturnValue(res)
 res.json = jest.fn().mockReturnValue(res)
 return res
}

describe("adminController", () => {
 describe("createAdmin", () => {
  it("should return 201 on success", async () => {
   const req = mockReq({username: "admin", password: "pass"})
   const res = mockRes()

   adminService.createAdmin.mockResolvedValue("mockAdminId")

   await adminController.createAdmin(req, res)

   expect(res.status).toHaveBeenCalledWith(201)
   expect(res.json).toHaveBeenCalledWith({
    message: "Admin created successfully",
    adminId: "mockAdminId"
   })
  })

  it("should return 400 on error", async () => {
   const req = mockReq({username: "", password: ""})
   const res = mockRes()

   adminService.createAdmin.mockRejectedValue(new Error("Error"))

   await adminController.createAdmin(req, res)

   expect(res.status).toHaveBeenCalledWith(400)
   expect(res.json).toHaveBeenCalledWith({message: "Error"})
  })
 })

 describe("adminLogin", () => {
  it("should return 200 on success", async () => {
   const req = mockReq({username: "admin", password: "pass"})
   const res = mockRes()

   adminService.loginAdmin.mockResolvedValue({id: 1, username: "admin"})

   await adminController.adminLogin(req, res)

   expect(res.status).toHaveBeenCalledWith(200)
   expect(res.json).toHaveBeenCalledWith({
    message: "Login successful",
    adminData: {id: 1, username: "admin"}
   })
  })

  it("should return 401 on error", async () => {
   const req = mockReq({username: "", password: ""})
   const res = mockRes()

   adminService.loginAdmin.mockRejectedValue(new Error("Login gagal"))

   await adminController.adminLogin(req, res)

   expect(res.status).toHaveBeenCalledWith(401)
   expect(res.json).toHaveBeenCalledWith({message: "Login gagal"})
  })
 })
})
