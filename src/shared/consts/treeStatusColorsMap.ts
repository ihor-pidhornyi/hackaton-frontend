import { TreeStatus } from '../models/tree-status'

export const treeStatusColorsMap: Record<TreeStatus, string> = {
  [TreeStatus.HEALTHY]: '#65C656',
  [TreeStatus.ILL]: '#ffee16',
  [TreeStatus.DISREPAIR]: '#ee5f52',
}
