import React from 'react'

function CardAux({title, description}:{title:string, description:string}) {
  return (
    <div
    className="my-4 ms-3 relative rounded-lg -skew-x-6 -translate-y-2 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 w-80 h-44 p-2 bg-neutral-50 card-compact hover:bg-base-200 transition-all duration-200 [box-shadow:12px_12px] hover:[box-shadow:4px_4px]"
  >
    <figure className="w-full h-full">
      <div
        // alt="change to a img tag"
        className="bg-neutral-800 text-neutral-50 min-h-full rounded-lg border border-opacity-5"
      ></div>
    </figure>
    <div className="absolute text-neutral-50 bottom-4 left-0 px-4">
      <span className="font-bold">{title}</span>
      <p className="text-sm opacity-60 line-clamp-2">
        {description}
      </p>
    </div>
  </div>
  
  )
}

export default CardAux
