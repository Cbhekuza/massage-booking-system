import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/AuthStore'
import { LogIn, AlertCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  
  const { login, resetPassword } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = await login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMessage('')
    
    const success = await resetPassword(resetEmail)
    if (success) {
      setResetMessage('Password reset instructions sent to your email')
      setTimeout(() => setShowReset(false), 3000)
    } else {
      setResetMessage('Error sending reset instructions')
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <LogIn size={48} style={{ color: 'var(--medium-brown)' }} />
                <h2 className="mt-3">Login to Your Account</h2>
              </div>

              {!showReset ? (
                <>
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <AlertCircle size={20} className="me-2" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-custom w-100 mb-3">
                      Login
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none"
                        onClick={() => setShowReset(true)}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-decoration-none fw-bold">
                        Register here
                      </Link>
                    </p>
                  </div>

                  <div className="alert alert-info mt-4" role="alert">
                    <strong>Demo Accounts:</strong><br />
                    Admin: admin@massage.com / admin123<br />
                    Manager: manager@massage.com / manager123<br />
                    Client: any email / any password
                  </div>
                </>
              ) : (
                <>
                  <h4 className="mb-4">Reset Password</h4>
                  
                  {resetMessage && (
                    <div className={`alert ${resetMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                      {resetMessage}
                    </div>
                  )}

                  <form onSubmit={handleReset}>
                    <div className="mb-3">
                      <label htmlFor="resetEmail" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-custom w-100 mb-3">
                      Send Reset Link
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => setShowReset(false)}
                    >
                      Back to Login
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
