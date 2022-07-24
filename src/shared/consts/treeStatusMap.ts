import { TreeStatus } from '../models/tree-status'

export const treeStatusMap: Record<TreeStatus, string> = {
  [TreeStatus.HEALTHY]: 'Здоровий',
  [TreeStatus.ILL]: 'Хворий',
  [TreeStatus.DISREPAIR]: 'Аварійний',
}
