import {
  createContext,
  ReactNode,
  useContext,
  useEffect, useMemo,
  useState,
} from 'react'
import { TreeShort } from '../models/tree-short'

const GlobalContext = createContext<{
  token: string | null
  setToken: (token: string | null) => void
  selectedTree: TreeShort | null
  setSelectedTree: (tree: TreeShort | null) => void
}>({
  token: null,
  setToken: (_) => {},
  selectedTree: null,
  setSelectedTree: (_) => {}
})

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [selectedTree, setSelectedTree] = useState<TreeShort | null>(null)

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token') ?? JSON.stringify(null)))
  }, [])

  const sharedState = useMemo(() => ({
    token,
    setToken,
    selectedTree,
    setSelectedTree
  }), [token, setToken, selectedTree, setSelectedTree])

  return (
    <GlobalContext.Provider value={sharedState}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
