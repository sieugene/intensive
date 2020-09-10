import React from "react";
import { useState } from "react";
import FetchEvent from "./FetchEvent";
import EventForm from "./Event-form";
import Link from "next/link";
import { useRouter } from "next/router";

const Event = (props) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const router = useRouter();
  return (
    <div style={{ border: "1px solid black", margin: "20px" }}>
      <h4 onClick={() => setOpen(!open)}>title: {props.title}</h4>
      <p
        onClick={() => {
          setEdit(!openEdit);
        }}
        style={{ cursor: "pointer" }}
      >
        <b>редактировать</b> название
      </p>
      {openEdit ? (
        <EventForm
          event={props}
          updateEvent={props.updateEvent ? props.updateEvent : undefined}
        />
      ) : (
        ""
      )}
      {open ? <FetchEvent id={props.id} /> : ""}
      {router.pathname === "/" && (
        <>
          <Link href={`/event/[${props.id}]`} as={`/event/${props.id}`}>
            <button style={{ cursor: "pointer" }}>open event</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Event;
