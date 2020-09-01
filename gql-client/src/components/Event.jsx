import React from "react";
import { useState } from "react";
import { eventQuery } from "../queries/events";
import { useQuery } from '@apollo/client';


const Event = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h4 onClick={() => setOpen(!open)}>title: {props.title}</h4>
      {open ? <FetchEvent id={props.id}/> : ""}
    </div>
  );
};

const FetchEvent = (props) => {
    const { data, loading } = useQuery(eventQuery, {
        variables: { id: props.id },
      });
    if(!data || loading){
        return <div>loading</div>
    }   
    return(
        <div>
            url: {data.event.url}
        </div>
    )
}

export default Event;
