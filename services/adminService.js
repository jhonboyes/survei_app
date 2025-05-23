import { SignUpAdmin, LoginAdmin } from "../models/adminModel.js"

class AdminService {
    async createAdmin(username, password) {
        if (!username || !password) {
            throw new Error("Username dan password diperlukan")
        }
        return await SignUpAdmin(username, password)
    }

    async loginAdmin(username, password) {
        if (!username || !password) {
            throw new Error("Username dan password diperlukan")
        }
        const adminData = await LoginAdmin(username, password)
        if (!adminData || adminData.length === 0) {
            throw new Error("Username atau password salah")
        }
        return adminData
    }
}

export default new AdminService()
