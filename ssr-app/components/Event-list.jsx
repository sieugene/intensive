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
  const mapEvents = (events) => {
    return (
      events &&
      events.allEvents.length >= 1 &&
      events.allEvents.map((event) => {
        //updateEvent - такой же костыль из-за статики
        return <Event {...event} key={event.id} updateEvent={search} />;
      })
    );
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
      {data ? mapEvents(data) : mapEvents(props.data)}
    </div>
  );
};

export default EventList;
