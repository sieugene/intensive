import React from "react";
import { useState } from "react";
import FetchEvent from './FetchEvent';
import EventForm from './Event-form';


const Event = (props) => {
  const [open, setOpen] = useState(false);
  const [openEdit,setEdit] = useState(false)
  return (
    <div style={{border: "1px solid black",margin: "20px"}}>
      <h4 onClick={() => setOpen(!open)}>title: {props.title}</h4>
      <p onClick={() => {setEdit(!openEdit)}} style={{cursor: "pointer"}}><b>редактировать</b> название</p>
      {openEdit ? <EventForm event={props}/> : ''}
      {open ? <FetchEvent id={props.id}/> : ""}
    </div>
  );
};

export default Event;
