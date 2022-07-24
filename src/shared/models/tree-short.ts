import { TreeStatus } from './tree-status'

export type TreeShort = {
  id: number,
  registrationNumber: string,
  photoUrl?: string,
  x: number,
  y: number,
  radius: number,
  state: TreeStatus
}
