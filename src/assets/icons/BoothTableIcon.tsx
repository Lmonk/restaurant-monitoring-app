import { memo } from 'react'

const BoothTableIcon: React.FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M120-120v-720q0-17 11.5-28.5T160-880q17 0 28.5 11.5T200-840v40h560v-40q0-17 11.5-28.5T800-880q17 0 28.5 11.5T840-840v720h-80v-440H200v440h-80Zm80-520h560v-80H200v80Zm240 520v-120H320v-80h320v80H520v120h-80ZM200-640v-80 80Z" />
  </svg>
))

BoothTableIcon.displayName = 'BoothTableIcon'

export default BoothTableIcon
