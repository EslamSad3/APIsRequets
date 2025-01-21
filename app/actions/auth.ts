"use server"

import { z } from "zod"
import { cookies } from "next/headers"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function loginUser(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Make API request to your authentication endpoint
    const response = await fetch("https://api.your-backend.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      return {
        error: "Invalid credentials",
      }
    }

    const data = await response.json()

    // Set authentication cookie
    cookies().set("auth-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 1 week
    })

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      error: "An error occurred during login",
    }
  }
}

export async function logoutUser() {
  cookies().delete("auth-token")
  return {
    success: true,
  }
}

