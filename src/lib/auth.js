import { cookies } from "next/headers";
import User from "@/models/User";
import { verifyToken } from "./jwt";

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return null;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};