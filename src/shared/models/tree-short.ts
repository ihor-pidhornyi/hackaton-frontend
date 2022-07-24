import { TreeStatus } from './tree-status'

export type TreeShort = {
  id: number,
  registrationNumber: string,
  photoUrl?: string,
  state: TreeStatus
}
