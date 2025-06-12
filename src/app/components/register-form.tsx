"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { FormInput } from "./form-input"
import { Button } from "../components/ui/button"
import { registerUser } from "../sevice/api"
import { Alert } from "../components/ui/alert"
import Image from "next/image"

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    document: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    email: z.string().email("Email inválido"),
    role: z.string().min(1, "Cargo é obrigatório"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format CPF as user types
    if (name === "document") {
      const digits = value.replace(/\D/g, "")
      let formattedValue = ""

      if (digits.length <= 3) {
        formattedValue = digits
      } else if (digits.length <= 6) {
        formattedValue = `${digits.slice(0, 3)}.${digits.slice(3)}`
      } else if (digits.length <= 9) {
        formattedValue = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
      } else {
        formattedValue = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formattedValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    try {
      registerSchema.parse(formData)
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
    setSuccess(false)

    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...apiData } = formData
      await registerUser(apiData)
      setSuccess(true)

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      setApiError(error.message || "Falha ao registrar. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <Image
          src="/placeholder.svg?height=40&width=150"
          alt="Portas Abertas Logo"
          width={150}
          height={40}
          className="mx-auto mb-4"
        />
        <h2 className="text-lg font-medium">Novo cadastro</h2>
      </div>

      {apiError && (
        <Alert variant="destructive" className="mb-4">
          {apiError}
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-100 text-green-800">
          Cadastro realizado com sucesso! Redirecionando para o login...
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <FormInput
          label="Nome completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormInput
          label="CPF"
          name="document"
          value={formData.document}
          onChange={handleChange}
          error={errors.document}
          placeholder="000.000.000-00"
          required
        />

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
          label="Cargo"
          name="role"
          value={formData.role}
          onChange={handleChange}
          error={errors.role}
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

        <FormInput
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Realizar cadastro"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Já tem uma conta?{" "}
          <Link href="/login" className="text-purple-700 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
