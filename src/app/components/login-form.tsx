"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { FormInput } from "./form-input"
import { Button } from "./ui/button"
import { loginUser } from "../sevice/api"
import { Alert } from "../components/ui/alert"
import { ConfigChecker } from "./config-checker"
import Image from "next/image"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

export function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await loginUser(formData)

      // Store user data in localStorage (in a real app, you'd use a more secure method)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.name || "Usuário",
          email: formData.email,
        }),
      )

      router.push("/dashboard")
    } catch (error: any) {
      setApiError(error.message || "Falha ao fazer login. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <Image src="/images/logo.svg" alt="Portas Abertas Logo" width={150} height={40} className="mx-auto mb-4" />
        <h2 className="text-lg font-medium">Entre na sua Conta</h2>
      </div>

      <ConfigChecker />

      {apiError && (
        <Alert variant="destructive" className="mb-4">
          {apiError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar na conta"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Não tem uma conta?{" "}
          <Link href="/register" className="text-purple-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
