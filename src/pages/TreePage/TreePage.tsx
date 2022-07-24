import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import API from '../../shared/services/api'
import { Tree } from '../../shared/models/tree'

export default function TreePage() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [tree, setTree] = useState<Tree | null>(null)

  useEffect(() => {
    const getTrees = async () => await API.get<Tree>(`/trees/${id}`)
    getTrees().then((res) => setTree(res.data))
  }, [])

  return (
    <Wrapper>
      {tree ? (
        <Container>
          <ReturnButton onClick={() => navigate(-1)} />
          <Image src={tree.photoUrl ?? '/img/image-placeholder.jpg'} />
          <Content>
            <Name>{`Реєстраційний номер: ${
              tree.registrationNumber ?? 'Не вказано'
            }`}</Name>
            <Characteristiscs>
              <CharacteristicItem>{`Тип: ${tree.type.name}`}</CharacteristicItem>
              <CharacteristicItem>{`Радіус: ${tree.radius} м`}</CharacteristicItem>
              <CharacteristicItem>{`Стан: ${
                treeStatusMap[tree.state]
              } `}</CharacteristicItem>
              <CharacteristicItem>Дата народження: <br/>{`${tree.birthDate}`}</CharacteristicItem>
            </Characteristiscs>
            <Description>{tree.type.description}</Description>
            {tree.tasks.length && (
              <Tasks>{`Перелік потрібних робіт:${tree.tasks.map(
                (el) => ' ' + el.name
              )}`}</Tasks>
            )}
          </Content>
        </Container>
      ) : (
        <div>No tree</div>
      )}
    </Wrapper>
  )
}
