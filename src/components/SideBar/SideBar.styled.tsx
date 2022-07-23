import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { TbArrowBarToLeft, TbArrowBarToRight } from 'react-icons/tb'

export const SideBarWrapper = styled.div(({ isActive }: any) =>
  css({
    boxSizing: 'border-box',
    position: 'absolute',
    left: '0px',
    top: '0px',
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw * 0.3 + 120px)',
    height: '100vh',
    gap: '20px',
    background: 'white',
    padding: '20px 40px 20px 20px',
    zIndex: '20',
    boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.05)',
    transform: isActive ? 'translateX(-10px)' : 'translateX(calc(-95% + 10px))',

    transition: 'transform 0.4s ease',

    '@media screen and (max-width: 768px)': {
      width: '100vw',
    },
  })
)

export const ArrowWrapper = styled.div(
  css({
    position: 'absolute',
    right: '-7px',
    top: 0,
    height: '100%',
    width: '45px',
  })
)

export const Card = styled.div(
  css({
    display: 'flex',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    boxShadow: '1px 1px 14px -2px rgba(34, 60, 80, 0.5)',
  })
)

export const Image = styled.div(({ backgroundImage }: any) =>
  css({
    minWidth: '135px',
    minHeight: '135px',
    borderRadius: '15px 0px 0px 15px',
    background: `url(${backgroundImage})`,
  })
)
export const Content = styled.div(
  css({
    padding: '20px',
    color: '#6E798C',
  })
)
export const Name = styled.p(
  css({
    fontWeight: '600',
    fontSize: '14px',
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
    fontSize: '11px',
    lineHeight: '15px',
  })
)

export const Description = styled.div(
  css({
    fontWeight: '300',
    fontSize: '10px',
    lineHeight: '14px',
    margin: '0',
  })
)

export const ArrowLeft = styled(TbArrowBarToLeft)(
  css({
    position: 'absolute',
    width: '24px',
    height: '24px',
    top: '50%',
    right: '0',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
  })
)

export const ArrowRight = styled(TbArrowBarToRight)(
  css({
    position: 'absolute',
    width: '24px',
    height: '24px',
    top: '50%',
    right: '0',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
  })
)

// export const SearchRow = styled.div(
//   css({
//     position: 'relative',
//     display: 'flex',
//     gap: '30px',
//   })
// )

// export const CloseButton = styled(IoMdClose)(
//     css({
//         position: 'absolute',
//         left: '8px',
//         top: '4px',
//         width: '28px',
//         height: '28px',
//     })
// )

// export const CloseButton = styled(IoClose)(
//     css({
//         position: 'absolute',
//         left: '8px',
//         top: '4px',
//         width: '28px',
//         height: '28px',
//     })
// )
