import { useAuth } from "../contexto/AuthContext"

export function useFetch() {
  const { token, logout } = useAuth()

  async function fetcher(url, options) {
    const headers = {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : undefined
    }

    try {
      const response = await fetch(url, { ...options, headers })
      if (!response.ok) {
        throw new FetchError(response)
      }
      return response
    } catch (error) {
      if (error.response?.status === 401) {
        logout()
      }
      throw error
    }
  }

  return fetcher
}

class FetchError extends Error {
  constructor(response) {
    super(response.statusText)
    this.response = response
  }
}
