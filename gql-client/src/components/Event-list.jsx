import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { allEvenetsQuery } from "../queries/events";
import Event from './Event';

const EventList = () => {
  const [filter, setFilter] = useState("");
  const { data, loading } = useQuery(allEvenetsQuery, {
    variables: { filter },
  });
  if (!data || loading) {
    return <div>loading</div>;
  }
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
          return <Event {...event} key={event.id}/>
        })}
    </div>
  );
};

export default EventList;
