import React from 'react'

interface ActionProps {
  eventTitle: string;
  eventDesription:string;
}

const EventControl = ({eventTitle, eventDesription}:ActionProps) => {
  return (
    <div>EventControl</div>
  )
}

export default EventControl