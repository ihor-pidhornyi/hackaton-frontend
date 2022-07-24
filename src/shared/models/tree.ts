export type Tree = {
  id: number,
  registrationNumber: string,
  x: number,
  y: number,
  radius: number,
  birthDate: number,
  photoUrl?: string,
  tasks: Array<{
    id: number,
    status: string,
  }>
}
