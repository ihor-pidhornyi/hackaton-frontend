import { TreeShort } from '../../shared/models/tree-short'
import { Wrapper } from '../CreateTreeForm/CreateTreeForm.styled'
import { Dialog } from '@mui/material'
import React from 'react'

export const TreeShortModal = ({
  tree,
  open,
  close,
}: {
  tree: TreeShort
  open: boolean
  close: () => void
}) => {
  return (
    <Dialog onClose={close} open={open}>
      <Wrapper>
        <div className="half"></div>
      </Wrapper>
    </Dialog>
  )
}
