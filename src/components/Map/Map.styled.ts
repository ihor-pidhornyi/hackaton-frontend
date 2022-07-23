import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { IoClose } from 'react-icons/io5'

export const Container = styled.div(
  css({
    width: '100vw',
    height: '100vh',
  })
)

export const CreateTree = styled.div(({ x, y }: { x: number; y: number }) =>
  css({
    padding: '1rem',
    borderRadius: '10px',
    background: '#ffffff',
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: 10,
  })
)

export const CloseButton = styled(IoClose)(
  css({
    width: '28px',
    height: '28px',
  })
)
