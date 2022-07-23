import { css } from '@emotion/react'
import { AiFillHome } from 'react-icons/ai'
import styled from '@emotion/styled'

export const NavList = styled.ul(
    css({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      gap: '16px',
      listStyle: 'none',
  
      a: {
        fontSize: '1.25rem',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
  
      '& .logout': {
        cursor: 'pointer',
        marginLeft: 'auto',
      },
    })
  )
  
  export const HomeIcon = styled(AiFillHome)(
    css({
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      verticalAlign: 'bottom',
    })
  )