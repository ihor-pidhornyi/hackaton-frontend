export type Tree = {
  id: number,
  registrationNumber: string,
  x: number,
  y: number,
  radius: number,
  // Datetime string
  birthDate: string,
  photoUrl?: string,
  type: {
    name: string,
    description: string
  },
  tasks: Array<{
    id: number,
    name: string,
    status: string,
  }>
}
