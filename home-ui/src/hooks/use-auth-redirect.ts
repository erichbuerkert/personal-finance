import { useEffect, useState } from "react"

export function useAuthRedirect() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "http://localhost:3001/login"
    } else {
      setChecked(true)
    }
  }, [])

  return checked
}