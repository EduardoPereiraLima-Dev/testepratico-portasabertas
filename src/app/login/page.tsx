
import { LoginForm } from "../components/login-form"


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-600 p-4">
      <h1 className="mb-2 text-2xl font-bold text-white">Login</h1>
      <h2 className="mb-6 text-lg text-white">Login</h2>
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <LoginForm />
      </div>
    </div>
  )
}
