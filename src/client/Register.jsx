/**
 * Register component that renders a registration form and handles the registration process.
 *
 * @component
 * @returns {JSX.Element} - Rendered Register component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/RegisterLoginStyles.css"
import axios from "axios"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()

  /**
   * Handles the registration process by sending a POST request to the server and navigating to the login page if successful.
   */
  const handleRegistration = async (event) => {
    event.preventDefault()

    if (username.length < 3 || username.length > 256) {
      setError("Username must be between 3 and 256 characters.")
      return
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match!")
      return
    }

    try {
      // const response = 
      await axios.post("http://localhost:8080/register", {
        username,
        password,
        email,
        termsAccepted,
      })
      setUsername("") 
      setPassword("") 
      setRepeatPassword("") 
      setEmail("") 
      setTermsAccepted(false) 
      navigate("/login")
      setSuccessMessage("Your registration was successful.") 
      setTimeout(() => {
        setSuccessMessage("")
      }, 2000)
    } catch (error) {
      console.error("Error registering:", error)
      setError("Failed to register user.")
    }
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Register as a new user</h1>
      <form onSubmit={handleRegistration}>
        <div className="form-row">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="form-input narrow"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-input narrow"
          />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat Password"
            required
            className="form-input narrow"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="form-input narrow"
          />
        </div>
        <div className="form-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              name="termsAccepted"
              required
            />
           <span>I accept the <span className="link-text">terms</span> and <span className="link-text">conditions</span></span>
          </label>
          <br />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="link-btn">
        Register
        </button>
      </form>
    </div>
  )
}
