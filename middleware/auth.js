import admin from "firebase-admin"
import { auth } from "../configdb/dbconnect.js"

const verifyToken = async (req, res, next) => {
 const token = req.headers.authorization?.split(" ")[1]
 if (!token) {
  return res.status(401).json({error: "Unauthorized"})
 }

 try {
  const decoded = await auth.verifyIdToken(token)
  req.user = decoded
  next()
 } catch (err) {
  return res.status(401).json({error: "Invalid token"})
 }
}

export default verifyToken
