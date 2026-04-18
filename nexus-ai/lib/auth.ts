import { User } from "../models/user/user";

export async function getCurrentUser() {
  // simple demo user
  return await User.findOne({ email: "admin@test.com" });
}