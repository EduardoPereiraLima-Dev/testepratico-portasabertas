import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Coluna de Login */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-gray-100 p-12">
        <img src="/portas-abertas-logo.svg" alt="Logo" className="mb-8 h-12 w-auto" />
        <h2 className="mb-2 text-3xl font-bold text-gray-800">Login</h2>
        <p className="mb-8 text-gray-600">Entre na sua conta para continuar</p>
        <div className="w-full max-w-sm">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
          >
            Entrar na sua conta
          </Link>
        </div>
      </div>

      {/* Coluna de Cadastro */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-12">
        <img src="/portas-abertas-logo.svg" alt="Logo" className="mb-8 h-12 w-auto opacity-50" />
        <h2 className="mb-2 text-3xl font-bold text-gray-800">Novo cadastro</h2>
        <p className="mb-8 text-gray-600">Crie sua conta gratuitamente</p>
        <div className="w-full max-w-sm">
          <Link
            href="/register"
            className="flex w-full items-center justify-center rounded-lg border-2 border-purple-600 bg-white px-6 py-3 text-center text-lg font-semibold text-purple-600 shadow-lg transition-all hover:bg-purple-50 hover:shadow-xl"
          >
            Criar uma conta
          </Link>
        </div>
      </div>
    </div>
  )
}
