import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { allEvenetsQuery } from "../queries/events";

const EventList = () => {
  const [filter, setFilter] = useState("");
  const { data, loading } = useQuery(allEvenetsQuery, {
    variables: { filter },
  });
  if (!data || loading) {
    return <div>loading</div>;
  }
  debugger;
  return (
    <div>
      <input
        placeholder="filter"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      />
      {data &&
        data.allEvents.length >= 1 &&
        data.allEvents.map((event) => {
          return (
            <div id={event.id}>
              title: {event.title}
              url: {event.url}
            </div>
          );
        })}
    </div>
  );
};

export default EventList;
