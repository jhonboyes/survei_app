import {db} from "../configdb/dbconnect.js"
import {v4 as uuidv4} from "uuid"


const SignUpAdmin = async (username, password) => {
const { data, error } = await db
  .from('admin')
  .insert([
    { username: username, password: password, role: "admin" },
  ]);
  if (error) {
    console.log(error)
    throw new Error(error.message)
  }
  console.log(data)
  return data
}

const LoginAdmin = async (username, password) => {
const { data, error } = await db
 .from('admin')
 .select('*')
 .eq('username', username)
 .eq('password', password)
 if (error) {
    throw new Error(error.message)
  }
  return data
}

export {SignUpAdmin, LoginAdmin}
