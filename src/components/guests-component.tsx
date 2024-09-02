import styled from 'styled-components'
import { ChairIcon } from '../assets/icons'

interface GuestComponentProps {
  maxGuests: number
  guests: number
}

interface SeatProps {
  taken: boolean
}

const GuestsRow = styled.div`
  display: flex;
  flex-direction: row;
`

const Seat = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'taken',
})<SeatProps>`
  width: 0.75rem;
  fill: ${({ taken }) => (taken ? 'gray' : 'green')};

  @media (max-width: 768px) {
    width: 0.5rem;
  }
`

export const GuestsComponent = ({ maxGuests, guests }: GuestComponentProps) => {
  const icons = []

  for (let i = 0; i < maxGuests; i++) {
    icons.push(
      <Seat key={i} taken={i < guests}>
        <ChairIcon />
      </Seat>
    )
  }

  return <GuestsRow>{icons}</GuestsRow>
}
