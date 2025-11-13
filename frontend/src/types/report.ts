export type Report = {
  id: string
  title: string
  date: string
  amountRaised: number
  goal: number
  summary: string
  details: string
  itemsDelivered: string[]
  images: { src: string; alt: string }[]
  tags: string[]
}
