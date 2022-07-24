import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowWrapper,
  Card,
  CharacteristicItem,
  Characteristiscs,
  Content,
  Image,
  Name,
  SideBarWrapper,
} from './SideBar.styled'
import { treeStatusMap } from '../../shared/consts/treeStatusMap'
import { TREES } from '../../shared/consts/trees'

function SideBar() {
  const [isActive, setIsActive] = useState(false)

  const activate = () => {
    setIsActive(!isActive)
  }

  return (
    <SideBarWrapper isActive={isActive}>
      {isActive &&
        TREES.map((el) => (
          <Card key={el.id}>
            <Image backgroundImage={el.photoUrl ?? 'img/image-placeholder.jpg'} />
            <Content>
              <Name>{`Реєстраційний номер: ${el.registrationNumber}`}</Name>
              <Characteristiscs>
                <CharacteristicItem>{`Радіус: ${el.radius} м`}</CharacteristicItem>
                <CharacteristicItem>{`Стан: ${treeStatusMap[el.state]} `}</CharacteristicItem>
              </Characteristiscs>
            </Content>
          </Card>
        ))}
      <ArrowWrapper>
        {isActive ? (
          <ArrowLeft onClick={activate} />
        ) : (
          <ArrowRight onClick={activate} />
        )}
      </ArrowWrapper>
    </SideBarWrapper>
  )
}

export default SideBar
