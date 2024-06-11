import React from 'react'

interface ActionProps {
  eventTitle: string;
  eventDesription:string;
}

const EventAction = ({eventTitle,eventDesription}:ActionProps) => {
  return (
    <div>EventAction</div>
  )
}

export default EventAction