import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { TreeShort } from '../models/tree-short'
import API from '../services/api'
import { Task } from '../models/task'
import { TreeType } from '../models/tree-type'

const GlobalContext = createContext<{
  token: string | null
  setToken: (token: string | null) => void
  selectedTree: TreeShort | null
  setSelectedTree: (tree: TreeShort | null) => void
  tasks: Task[]
  setTasks: (value: Task[]) => void
  treeTypes: TreeType[]
  setTreeTypes: (value: TreeType[]) => void
  trees: TreeShort[]
  setTrees: (value: TreeShort[]) => void
  filterIpn: string | null
  setFilterIpn: (value: string | null) => void
}>({
  token: null,
  setToken: (_) => {},
  selectedTree: null,
  setSelectedTree: (_) => {},
  tasks: [],
  setTasks: (_) => {},
  treeTypes: [],
  setTreeTypes: (_) => {},
  trees: [],
  setTrees: (_) => {},
  filterIpn: null,
  setFilterIpn: (_) => {}
})

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [selectedTree, setSelectedTree] = useState<TreeShort | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [treeTypes, setTreeTypes] = useState<TreeType[]>([])
  const [trees, setTrees] = useState<TreeShort[]>([])
  const [filterIpn, setFilterIpn] = useState<string | null>(null)

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token') ?? JSON.stringify(null)))
    API.get<Task[]>('/tree/tasks')
      .then((res) => res.data)
      .then((tasks) => setTasks(tasks))
    API.get<TreeType[]>('/tree/types')
      .then((res) => res.data)
      .then((treeTypes) => setTreeTypes(treeTypes))
  }, [])

  const sharedState = useMemo(
    () => ({
      token,
      setToken,
      selectedTree,
      setSelectedTree,
      tasks,
      setTasks,
      treeTypes,
      setTreeTypes,
      trees,
      setTrees,
      filterIpn,
      setFilterIpn
    }),
    [
      token,
      setToken,
      selectedTree,
      setSelectedTree,
      tasks,
      setTasks,
      treeTypes,
      setTreeTypes,
      trees,
      setTrees,
      filterIpn,
      setFilterIpn
    ]
  )

  return (
    <GlobalContext.Provider value={sharedState}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
