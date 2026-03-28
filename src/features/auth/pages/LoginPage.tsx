import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../store/AuthStore"
import { useState } from "react"

const LoginPage = () => {
  
  const login = useAuthStore(state => state.login)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if(!isAuthenticated){
    navigate("/dashboard")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   setError("")
   setIsSubmitting(true)

   try{
    await login(email, password)
    navigate(from, {replace: true})
   }catch(err){
    setError((err instanceof Error) ? err.message : "Login failed")
   }finally{
    setIsSubmitting(false)
   }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
       <div className = "mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back </h1>
        <p className="mt-2 text-grayy-500 text-sm">Sign in to your ERP Dashboard</p>
       </div>
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-white font-medium hover:bg-gray-700 cursor-pointer transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
       </form>
       <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-medium text-gray-800">Demo credentials</p>
          <p>Email: admin@example.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage