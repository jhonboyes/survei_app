import adminService from "../services/adminService.js"
import * as adminModel from "../models/adminmodel.js" // mock model functions

jest.mock("../models/adminmodel.js") // Jest akan memock modul ini

describe("AdminService", () => {
 describe("createAdmin", () => {
  it("should throw error if username or password is missing", async () => {
   await expect(adminService.createAdmin(null, "password")).rejects.toThrow("Username dan password diperlukan")
   await expect(adminService.createAdmin("username", null)).rejects.toThrow("Username dan password diperlukan")
  })

  it("should call SignUpAdmin with correct arguments", async () => {
   adminModel.SignUpAdmin.mockResolvedValue("mockedAdminId")

   const result = await adminService.createAdmin("testuser", "testpass")
   expect(adminModel.SignUpAdmin).toHaveBeenCalledWith("testuser", "testpass")
   expect(result).toBe("mockedAdminId")
  })
 })

 describe("loginAdmin", () => {
  it("should throw error if username or password is missing", async () => {
   await expect(adminService.loginAdmin(null, "password")).rejects.toThrow("Username dan password diperlukan")
   await expect(adminService.loginAdmin("username", null)).rejects.toThrow("Username dan password diperlukan")
  })

  it("should call LoginAdmin and return data", async () => {
   const mockData = {id: 1, username: "testuser"}
   adminModel.LoginAdmin.mockResolvedValue(mockData)

   const result = await adminService.loginAdmin("testuser", "testpass")
   expect(adminModel.LoginAdmin).toHaveBeenCalledWith("testuser", "testpass")
   expect(result).toEqual(mockData)
  })
 })
})
