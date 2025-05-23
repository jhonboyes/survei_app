import adminService from "../services/adminService.js"

const createAdmin = async (req, res) => {
      const { username, password } = req.body
      try {
            const adminId = await adminService.createAdmin(username, password)
            res.status(201).json({ message: "Admin created successfully", adminId })
      } catch (err) {
            res.status(400).json({ message: err.message })
      }
}

const adminLogin = async (req, res) => {
      const { username, password } = req.body
      try {
            const adminData = await adminService.loginAdmin(username, password)
            res.status(200).json({ message: "Login successful", adminData })
      } catch (err) {
            res.status(401).json({ message: err.message })
      }
}

export default { createAdmin, adminLogin }