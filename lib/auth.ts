import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function getSession() {
  // ⏳ await cookies() — Next.js 15 requirement
  const cookieStore = await cookies();
  const token = cookieStore.get("zealthy_session")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string };
    return decoded;
  } catch (err) {
    console.error("Invalid session token", err);
    return null;
  }
}
