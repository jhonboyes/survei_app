import {SignUpAdmin, LoginAdmin} from "../models/adminmodel.js"
import {db} from "../configdb/dbconnect.js"

// Mocking db.collection, db.doc, and doc.get/set
jest.mock("../firebase") // Mengmock seluruh firebase module

describe("AdminModel", () => {
 afterEach(() => {
  jest.clearAllMocks() // Clear mocks after each test
 })

 describe("SignUpAdmin", () => {
  it("should throw an error if username or password is missing", async () => {
   await expect(SignUpAdmin()).rejects.toThrow("Username dan password diperlukan")
   await expect(SignUpAdmin("admin")).rejects.toThrow("Username dan password diperlukan")
   await expect(SignUpAdmin(undefined, "password")).rejects.toThrow("Username dan password diperlukan")
  })

  it("should create an admin if valid username and password are provided", async () => {
   const mockAdmin = {username: "admin", password: "password"}

   // Mocking the db interaction, return an admin document
   db.collection.mockReturnValue({
    doc: jest.fn().mockReturnValue({
     set: jest.fn().mockResolvedValue(mockAdmin) // Mocking set() to resolve successfully
    })
   })

   const result = await SignUpAdmin("admin", "password")
   expect(result).toEqual(mockAdmin) // Ensure the returned value is as expected
   expect(db.collection).toHaveBeenCalledWith("admin") // Check if collection is being accessed correctly
   expect(db.collection().doc).toHaveBeenCalledWith("admin--admin") // Check if doc ID is correct
   expect(db.collection().doc().set).toHaveBeenCalledWith(mockAdmin) // Ensure set is called with correct admin data
  })
 })

 describe("LoginAdmin", () => {
  it("should throw an error if username or password is missing", async () => {
   await expect(LoginAdmin()).rejects.toThrow("Username dan password diperlukan")
   await expect(LoginAdmin("admin")).rejects.toThrow("Username dan password diperlukan")
   await expect(LoginAdmin(undefined, "password")).rejects.toThrow("Username dan password diperlukan")
  })

  it("should return admin data if valid username and password are provided", async () => {
   const mockAdmin = {username: "admin", password: "password"}

   // Mocking the db interaction to simulate the admin existing
   db.collection.mockReturnValue({
    where: jest.fn().mockReturnValue({
     get: jest.fn().mockResolvedValue({
      docs: [
       {
        data: jest.fn().mockReturnValue(mockAdmin)
       }
      ]
     })
    })
   })

   const result = await LoginAdmin("admin", "password")
   expect(result).toEqual(mockAdmin) // Ensure the returned value is as expected
   expect(db.collection).toHaveBeenCalledWith("admin") // Ensure collection name is correct
   expect(db.collection().where).toHaveBeenCalledWith("username", "==", "admin") // Ensure where clause is correct
   expect(db.collection().where().get).toHaveBeenCalled() // Ensure get is called to fetch the document
  })

  it("should throw an error if admin not found", async () => {
   db.collection.mockReturnValue({
    where: jest.fn().mockReturnValue({
     get: jest.fn().mockResolvedValue({
      empty: true // Simulating no admin found
     })
    })
   })

   await expect(LoginAdmin("admin", "wrongpassword")).rejects.toThrow("Admin not found")
  })
 })
})
