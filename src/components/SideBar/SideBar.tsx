import React, { useCallback, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../shared/context/GlobalContext'
import { debounce, TextField } from '@mui/material'

function SideBar() {
  const navigate = useNavigate()
  const { trees, setFilterIpn } = useGlobalContext()

  const [isActive, setIsActive] = useState(false)

  const activate = () => {
    setIsActive(!isActive)
  }

  const setValue = useCallback(debounce((callback) => callback, 400), [])

  useEffect(() => {
    setIsActive(true)
  }, [])

  return (
    <SideBarWrapper isActive={isActive}>
      <TextField id="filled-basic" label="Пошук по реєстраційному номеру" variant="filled" onInput={({ target }) => {
        if ('value' in target) {
          const value = (target as any).value
          if (typeof value === "string" && value.length === 10) {
            setFilterIpn(value)
          }
        }
      }} />

      {isActive &&
        trees.map((tree) => (
          <Card key={tree.id} onClick={() => navigate(`/tree/${tree.id}/`)}>
            <Image
              backgroundImage={tree.photoUrl ?? 'img/image-placeholder.jpg'}
            />
            <Content>
              <Name>{`Реєстраційний номер: ${tree.registrationNumber}`}</Name>
              <Characteristiscs>
                <CharacteristicItem>{`Радіус: ${tree.radius} м`}</CharacteristicItem>
                <CharacteristicItem>{`Стан: ${
                  treeStatusMap[tree.state]
                } `}</CharacteristicItem>
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
