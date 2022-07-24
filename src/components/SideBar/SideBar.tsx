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
import { useNavigate } from 'react-router-dom'

function SideBar() {
  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(false)

  const activate = () => {
    setIsActive(!isActive)
  }

  return (
    <SideBarWrapper isActive={isActive}>
      {isActive &&
        TREES.map((tree) => (
          <Card key={tree.id} onClick={() => navigate(`/tree/${tree.id}/`)}>
            <Image backgroundImage={tree.photoUrl ?? 'img/image-placeholder.jpg'} />
            <Content>
              <Name>{`Реєстраційний номер: ${tree.registrationNumber}`}</Name>
              <Characteristiscs>
                <CharacteristicItem>{`Радіус: ${tree.radius} м`}</CharacteristicItem>
                <CharacteristicItem>{`Стан: ${treeStatusMap[tree.state]} `}</CharacteristicItem>
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
