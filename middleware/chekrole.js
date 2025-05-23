import { db } from "../configdb/dbconnect.js"

const checkUserRole = (roles = []) => {
 return (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
   return res.status(403).json({message: "Forbidden: Akses tidak diizinkan"})
  }
  next()
 }
}

export default checkUserRole
