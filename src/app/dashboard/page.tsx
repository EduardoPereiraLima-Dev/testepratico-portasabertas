"use client" // Indica que este componente é um cliente React

import { Button } from "../components/ui/button" // Importa o componente de botão
import { useRouter } from "next/navigation" // Importa o hook useRouter do Next.js para navegação
import { useEffect, useState } from "react" // Importa hooks do React para gerenciamento de estado e efeitos colaterais

// Componente principal da página do dashboard
export default function DashboardPage() {
  const router = useRouter() // Inicializa o roteador
  const [user, setUser] = useState<{ name: string; email: string } | null>(null) // Estado para armazenar os dados do usuário

  useEffect(() => {
    // Verifica se o usuário está logado
    const userData = localStorage.getItem("user") // Tenta obter os dados do usuário do localStorage
    if (!userData) {
      router.push("/login") // Redireciona para a página de login se não houver dados
      return
    }

    try {
      setUser(JSON.parse(userData)) // Define os dados do usuário no estado
    } catch (error) {
      console.error("Failed to parse user data", error) // Log de erro se a análise falhar
      router.push("/login") // Redireciona para a página de login em caso de erro
    }
  }, [router]) // Dependência do useEffect para garantir que o roteador seja atualizado corretamente

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    localStorage.removeItem("user") // Remove os dados do usuário do localStorage
    router.push("/login") // Redireciona para a página de login
  }

  // Exibe um carregando enquanto os dados do usuário não estão disponíveis
  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // Renderiza a interface do dashboard quando o usuário está logado
  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="mx-auto w-full max-w-4xl rounded-lg border p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
        <div className="mb-8 rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">Bem-vindo!</h2>
          <p className="mb-2">
            <span className="font-medium">Nome:</span> {user.name} {/* Exibe o nome do usuário */}
          </p>
          <p className="mb-4">
            <span className="font-medium">Email:</span> {user.email} {/* Exibe o email do usuário */}
          </p>
          <p className="text-gray-600">Login realizado com sucesso.</p> {/* Mensagem de sucesso */}
        </div>
        <Button onClick={handleLogout} variant="destructive"> {/* Botão para logout */}
          Sair
        </Button>
      </div>
    </div>
  )
}
