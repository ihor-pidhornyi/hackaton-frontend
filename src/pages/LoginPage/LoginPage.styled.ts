import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Wrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    '.half': {
      flex: '1 0 50%',
    },
    '.form': {
      padding: '50px',
      maxWidth: '400px',
      margin: '0 auto',
    },
    '.view': {
      height: '100vh',
      backgroundImage: 'url(img/winter-tree.jpg)',
    },
    '.title, p': {
      textAlign: 'center',
    },
    '.form-item': {
      display: 'block',
      marginBottom: '10px',
    },
    '@media screen and (max-width: 900px)': {
      '.view': {
        display: 'none',
      },
    },
  })
)
