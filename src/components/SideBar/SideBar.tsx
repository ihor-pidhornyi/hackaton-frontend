import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowWrapper,
  Card,
  CharacteristicItem,
  Characteristiscs,
  Content,
  Description,
  Image,
  Name,
  SideBarWrapper,
} from './SideBar.styled'

const trees = [
  {
    ipn: '3432432',
    type: 'Клен',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at risus ipsum. Aliquam nunc enim, tempor id blandit sed, vulputate sit amet velit. Sed vulputate aliquet laoreet...',
    radius: '3',
    state: 'Здоровий',
    photo:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
  },
  {
    ipn: '3432432',
    type: 'Клен',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at risus ipsum. Aliquam nunc enim, tempor id blandit sed, vulputate sit amet velit. Sed vulputate aliquet laoreet...',
    radius: '3',
    state: 'Здоровий',
    photo:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
  },
  {
    ipn: '3432432',
    type: 'Клен',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at risus ipsum. Aliquam nunc enim, tempor id blandit sed, vulputate sit amet velit. Sed vulputate aliquet laoreet...',
    radius: '3',
    state: 'Здоровий',
    photo:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
  },
]

function SideBar() {
  const [isActive, setIsActive] = useState(false)

  const activate = () => {
    setIsActive(!isActive)
  }

  return (
    <SideBarWrapper isActive={isActive}>
      {isActive &&
        trees.map((el) => (
          <Card>
            <Image backgroundImage={el.photo} />
            <Content>
              <Name>{`ІПН: ${el.ipn}`}</Name>
              <Characteristiscs>
                <CharacteristicItem>{`Тип: ${el.type} `}</CharacteristicItem>
                <CharacteristicItem>{`Радіус: ${el.radius} м`}</CharacteristicItem>
                <CharacteristicItem>{`Стан: ${el.state} `}</CharacteristicItem>
              </Characteristiscs>
              <Description>{el.description}</Description>
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
