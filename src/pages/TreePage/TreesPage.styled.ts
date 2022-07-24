import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { MdKeyboardReturn } from 'react-icons/md'

export const Wrapper = styled.div(
  css({
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  })
)

export const Container = styled.div(
  css({
    position: 'relative',
    padding: '55px 50px 50px 55px',
    background: 'rgb(246, 246, 246)',
    maxWidth: '500px',
  })
)

export const Image = styled.img(
  css({
    width: '100%',
    minHeight: '135px',
    borderRadius: '19px',
  })
)
export const Content = styled.div(
  css({
    padding: '20px 0',
    color: '#6E798C',
  })
)
export const Name = styled.p(
  css({
    fontWeight: '600',
    fontSize: '1.5rem',
    margin: '0',
  })
)
export const Characteristiscs = styled.div(
  css({
    display: 'flex',
    gap: '12px',
    margin: '0',
  })
)
export const CharacteristicItem = styled.p(
  css({
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '15px',
  })
)

export const Description = styled.div(
  css({
    fontWeight: '300',
    fontSize: '1rem',
    margin: '0',
  })
)

export const ReturnButton = styled(MdKeyboardReturn)(
  css({
    position: 'absolute',
    top: '16px',
    left: '-46px',
    width: '32px',
    height: '32px',
    color: 'rgba(60, 60, 67, 0.6)',
    cursor: 'pointer',
  })
)

export const Tasks = styled.p(
  css({
    fontWeight: '400',
    fontSize: '1.2rem',
    margin: '0',
    marginTop: '8px',
  })
)
