import { LoginForm } from "../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-600 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <LoginForm />
      </div>
    </div>
  )
}
