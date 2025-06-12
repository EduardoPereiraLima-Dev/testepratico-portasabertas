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

  // Função para lidar com mudanças nos campos do formulário
  // Atualiza o estado do formulário e limpa erros específicos do campo alterado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setApiError("")
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Função para validar o formulário usando o schema do Zod
  // Retorna true se válido, senão define os erros e retorna false
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

  // Função chamada ao submeter o formulário
  // Valida os dados, faz login via API e redireciona em caso de sucesso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await loginUser(formData)

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.name || "Usuário",
          email: formData.email,
        })
      )

      router.push("/dashboard")
    } catch (error: any) {
      setApiError(error.message || "Falha ao fazer login. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ConfigChecker />

      {/* logotipo */}
      <div className="flex justify-center mb-6 text-gray-900">
        <Image
          src="/Logotipo.png"
          alt="Logo Portal Alerta"
          width={180}
          height={60}
          priority
        />
      </div>

      {apiError && (
        <Alert variant="destructive" className="mb-4">
          {apiError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 text-gray-900">
          <FormInput
            label="Email" 
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-amber-50 bg-purple-700 hover:bg-purple-800"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/register"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </>
  )
}
