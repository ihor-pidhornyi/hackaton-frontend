import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TreesLong } from '../../shared/consts/trees'
import { treeStatusMap } from '../../shared/consts/treeStatusMap'
import {
  CharacteristicItem,
  Characteristiscs,
  Container,
  Content,
  Description,
  Image,
  Name,
  ReturnButton,
  Tasks,
  Wrapper,
} from './TreesPage.styled'

export default function TreePage() {
  const navigate = useNavigate()

  const { id } = useParams()
  const tree = TreesLong.find((el) => id && el.id === parseInt(id))

  return (
    <Wrapper>
      {tree ? (
        <Container>
          <ReturnButton onClick={() => navigate(-1)} />
          <Image src={tree.photoUrl} />
          <Content>
            <Name>{`Реєстраційний номер: ${tree.registrationNumber}`}</Name>
            <Characteristiscs>
              <CharacteristicItem>{`Тип: ${tree.type.name} м`}</CharacteristicItem>
              <CharacteristicItem>{`Радіус: ${tree.radius} м`}</CharacteristicItem>
              <CharacteristicItem>{`Стан: ${
                treeStatusMap[tree.state]
              } `}</CharacteristicItem>
              <CharacteristicItem>{`Вік: ${tree.birthDate} `}</CharacteristicItem>
            </Characteristiscs>
            <Description>{tree.type.description}</Description>
            <Tasks>{`Перелік потрібних робіт:${tree.tasks.map(
              (el) => ' ' + el.name
            )}`}</Tasks>
          </Content>
        </Container>
      ) : (
        <div>No tree</div>
      )}
    </Wrapper>
  )
}
