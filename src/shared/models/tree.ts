import { TreeStatus } from './tree-status'

export type Tree = {
  id: number
  registrationNumber: string
  x: number
  y: number
  radius: number
  // Datetime string
  birthDate: string
  photoUrl?: string
  state: TreeStatus
  type: {
    name: string
    description: string
  }
  tasks: Array<{
    id: number
    name: string
  }>
}
