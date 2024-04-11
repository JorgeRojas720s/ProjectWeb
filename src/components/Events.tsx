import React from "react";
import Event from "./EventCard";
import EventCard from "./EventCard";
const events = [
  {
    title: "event",
    description:
      "Consequat eiusmod tempor commodo eu mollit velit in est ullamco in. Id ex mollit cillum qui voluptate et occaecat ",
  },
  {
    title: "event",
    description:
      "Consequat eiusmod tempor commodo eu mollit velit in est ullamco in. Id ex mollit cillum qui voluptate et occaecat dolore dolore ut ut exercitation. Adipisicing ex laborum amet ",
  },
  {
    title: "event",
    description:
      "Consequat eiusmod tempor commodo eu mollit velit in est ullamco in. Id ex mollit cillum qui voluptate et occaecat dolore dolore ut ut exercitation. Adipisicing ex laborum amet ",
  },
];
function Events() {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 mt-10">
      {events.map(({title, description}) => {
        return <EventCard title={title} description={description} />;
      })}
    </div>
  );
}

export default Events;
