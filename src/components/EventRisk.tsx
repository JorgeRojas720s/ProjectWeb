import React from 'react'

interface RiskProps {
  eventTitle: string;
  eventDesription:string;
}

const EventRisk = ({eventTitle, eventDesription}:RiskProps) => {
  return (
    <div>EventRisk</div>
  )
}

export default EventRisk