import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { allEvenetsQuery } from "../queries/events";
import Event from "./Event";

const EventList = (props) => {
  const [filter, setFilter] = useState("");
  const [search, { data, loading }] = useLazyQuery(allEvenetsQuery, {
    variables: { filter },
  });
  const onSearch = (e) => {
    setFilter(e.target.value);
    search();
  };
  if (!props.data || props.loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      {loading && "загрузка"}
      <br />
      <input
        placeholder="filter"
        onChange={(e) => {
          onSearch(e);
        }}
        value={filter}
      />
      {data
        ? data.allEvents.length >= 1 &&
          data.allEvents.map((event) => {
            return <Event {...event} key={event.id} />;
          })
        : props.data &&
          props.data.allEvents.length >= 1 &&
          props.data.allEvents.map((event) => {
            return <Event {...event} key={event.id} />;
          })}
    </div>
  );
};

export default EventList;
