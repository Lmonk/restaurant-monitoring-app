import styled from 'styled-components'
import { ChairIcon } from '../assets/icons'

interface GuestComponentProps {
  maxGuests: number
  guests: number
  color: string
}

interface GuestIconProps {
  taken: boolean
  color: string
}

interface GuestTextProps {
  color: string
}

const GuestIcons = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 991px) {
    display: none;
  }
`

const GuestText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})<GuestTextProps>`
  display: none;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ color }) => color};

  @media (max-width: 991px) {
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const Seat = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'taken' && prop !== 'color',
})<GuestIconProps>`
  width: 0.75rem;
  fill: ${({ taken, color }) => (taken ? color : 'gray')};
  margin-right: 0.125rem;

  &:last-child {
    margin-right: 0;
  }
`

export const GuestsComponent = ({
  maxGuests,
  guests,
  color,
}: GuestComponentProps) => {
  const icons = []

  for (let i = 0; i < maxGuests; i++) {
    icons.push(
      <Seat key={i} color={color} taken={i < guests}>
        <ChairIcon />
      </Seat>
    )
  }

  return (
    <>
      <GuestIcons>{icons}</GuestIcons>
      <GuestText color={color}>
        {guests}/{maxGuests}
      </GuestText>
    </>
  )
}
