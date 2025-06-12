// Configuração da API usando variáveis de ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://sandbox.api.alianca.portasabertas.org.br"
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// Validação das variáveis de ambiente
if (!TOKEN) {
  console.error("❌ ERRO: Token da API não configurado!")
  console.error("📝 Configure a variável NEXT_PUBLIC_API_TOKEN no arquivo .env.local")
}

if (!API_BASE_URL) {
  console.error("❌ ERRO: URL da API não configurada!")
  console.error("📝 Configure a variável NEXT_PUBLIC_API_BASE_URL no arquivo .env.local")
}

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  document: string
  role: string
  password: string
}

interface ApiResponse {
  success: boolean
  message?: string
  data?: unknown
  name?: string
}

export async function loginUser(data: LoginData): Promise<ApiResponse> {
  if (!TOKEN) {
    throw new Error("Token da API não configurado. Verifique o arquivo .env.local")
  }

  try {
    console.log("🔐 Tentando fazer login com:", { email: data.email })
    console.log("🌐 URL da API:", API_BASE_URL)

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    })

    console.log("📡 Status da resposta:", response.status)

    const result = await response.json()
    console.log("📄 Resposta da API:", result)

    if (!response.ok) {
      // Tratamento específico para diferentes tipos de erro
      if (response.status === 401) {
        throw new Error("Token de autorização inválido ou expirado")
      } else if (response.status === 400) {
        throw new Error("Dados de login inválidos")
      } else if (response.status === 404) {
        throw new Error("Usuário não encontrado")
      } else {
        throw new Error(result.message || `Erro ${response.status}: Falha na autenticação`)
      }
    }

    return result
  } catch (error: unknown) {
    console.error("❌ Erro no login:", error)

    // Se for erro de rede
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      "message" in error &&
      typeof (error as { name: unknown }).name === "string" &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      if (
        (error as { name: string }).name === "TypeError" &&
        (error as { message: string }).message.includes("fetch")
      ) {
        throw new Error("Erro de conexão. Verifique sua internet.")
      }
      throw new Error((error as { message: string }).message || "Erro desconhecido ao fazer login")
    }

    throw new Error("Erro desconhecido ao fazer login")
  }
}

export async function registerUser(data: RegisterData): Promise<ApiResponse> {
  if (!TOKEN) {
    throw new Error("Token da API não configurado. Verifique o arquivo .env.local")
  }

  try {
    console.log("📝 Tentando registrar usuário:", {
      name: data.name,
      email: data.email,
      document: data.document,
      role: data.role,
    })
    console.log("🌐 URL da API:", API_BASE_URL)

    const response = await fetch(`${API_BASE_URL}/logins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    })

    console.log("📡 Status da resposta:", response.status)

    const result = await response.json()
    console.log("📄 Resposta da API:", result)

    if (!response.ok) {
      // Tratamento específico para diferentes tipos de erro
      if (response.status === 401) {
        throw new Error("Token de autorização inválido ou expirado. Verifique o arquivo .env.local")
      } else if (response.status === 400) {
        throw new Error(result.message || "Dados de cadastro inválidos")
      } else if (response.status === 409) {
        throw new Error("Email ou CPF já cadastrado")
      } else if (response.status === 422) {
        throw new Error("Dados em formato inválido")
      } else {
        throw new Error(result.message || `Erro ${response.status}: Falha no cadastro`)
      }
    }

    return result
  } catch (error: unknown) {
    console.error("❌ Erro no cadastro:", error)

    // Se for erro de rede
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      "message" in error &&
      typeof (error as { name: unknown }).name === "string" &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      if (
        (error as { name: string }).name === "TypeError" &&
        (error as { message: string }).message.includes("fetch")
      ) {
        throw new Error("Erro de conexão. Verifique sua internet.")
      }
      throw new Error((error as { message: string }).message || "Erro desconhecido ao cadastrar usuário")
    }

    throw new Error("Erro desconhecido ao cadastrar usuário")
  }
}

// Função para testar se o token está funcionando
export async function testToken(): Promise<boolean> {
  if (!TOKEN) {
    console.error("Token não configurado")
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    })

    // Se retornar 401, o token está inválido
    // Se retornar 400 ou outro erro, o token provavelmente está OK
    return response.status !== 401
  } catch (error) {
    console.error("Erro ao testar token:", error)
    return false
  }
}

// Função para verificar configuração
export function checkApiConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!API_BASE_URL) {
    errors.push("NEXT_PUBLIC_API_BASE_URL não configurada")
  }

  if (!TOKEN) {
    errors.push("NEXT_PUBLIC_API_TOKEN não configurada")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
