import { Tree } from '../models/tree'
import { TreeShort } from '../models/tree-short'
import { TreeStatus } from '../models/tree-status'

export const TREES: TreeShort[] = [
  {
    id: 1,
    registrationNumber: '73123752',
    x: 49.2337415362848533,
    y: 28.4596339311523233,
    radius: 5,
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.HEALTHY,
  },
  {
    id: 2,
    registrationNumber: '73123752',
    x: 49.234083362848533,
    y: 28.469217362848533,
    radius: 10,
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.ILL,
  },
  {
    id: 3,
    registrationNumber: '73123752',
    x: 49.235083362848533,
    y: 28.470217362848533,
    radius: 15,
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.DISREPAIR,
  },
]

export const TreesLong: Tree[] = [
  {
    id: 1,
    registrationNumber: '73123752',
    x: 49.2337415362848533,
    y: 28.4596339311523233,
    birthDate: '10-24-2020',
    radius: 5,
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.HEALTHY,
    type: {
      name: 'Клен',
      description:
        'dfsfsd fsd fds fsd fds fa sad asfsd fsd fsdj funfgdfunnmud fug dfgu idfgj dfkg dfkigk kdfgk dfikgi kdfikg kdfkg dfkigkdf',
    },
    tasks: [
      {
        id: 1,
        name: 'a',
      },
    ],
  },
  {
    id: 2,
    registrationNumber: '73123752',
    x: 49.234083362848533,
    y: 28.469217362848533,
    radius: 10,
    birthDate: '10-24-2022',
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.ILL,
    type: {
      name: 'Граб',
      description:
        'dfsfsd fsd fds fsd fds fa sad asfsd fsd fsdj funfgdfunnmud fug dfgu idfgj dfkg dfkigk kdfgk dfikgi kdfikg kdfkg dfkigkdf',
    },
    tasks: [
      {
        id: 2,
        name: 'a',
      },
    ],
  },
  {
    id: 3,
    registrationNumber: '73123752',
    x: 49.235083362848533,
    y: 28.470217362848533,
    radius: 15,
    birthDate: '10-24-2021',
    photoUrl:
      'https://www.treeoftheyear.org/getmedia/e0ad33e6-2892-4625-acea-7fd76ee927e8/150860a;.aspx?width=500',
    state: TreeStatus.DISREPAIR,
    type: {
      name: 'Дуб',
      description:
        'dfsfsd fsd fds fsd fds fa sad asfsd fsd fsdj funfgdfunnmud fug dfgu idfgj dfkg dfkigk kdfgk dfikgi kdfikg kdfkg dfkigkdf',
    },
    tasks: [
      {
        id: 3,
        name: 'поїсти',
      },
      {
        id: 4,
        name: 'поспати',
      },
      {
        id: 5,
        name: 'ше поспати',
      },
    ],
  },
]
