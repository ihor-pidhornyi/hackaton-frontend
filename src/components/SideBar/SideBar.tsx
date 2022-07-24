import React, { useState, useEffect } from 'react'
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
import { Tree } from '../../shared/models/tree'
import API from '../../shared/services/api'
import { TreeShort } from '../../shared/models/tree-short'

function SideBar() {
  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(false)
  const [trees, setTrees] = useState<TreeShort[] | null>(null)

  useEffect(() => {
    const getTrees = async () => await API.get<TreeShort[]>(`/trees/`)
    getTrees().then((res) => setTrees(res.data))
  }, [])


  const activate = () => {
    setIsActive(!isActive)
  }

  return (
    <SideBarWrapper isActive={isActive}>
      {isActive && trees &&
        trees.map((tree) => (
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
