import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RenameEventMutation } from "../queries/events";

const EventForm = (props) => {
  const event = props.event;
  const [title, setTitle] = useState(event.title);
  //тут объявили функцию и вызываем в хендлере
  const [rename, { loading }] = useMutation(RenameEventMutation, {
    variables: {
      id: event.id,
      title: title,
    },
    //применяет сразу изменения
    optimisticResponse: {
      renameEvent: { id: event.id, title: title, __typename: "Event" },
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    rename();
    if (props.updateEvent) {
      props.updateEvent();
    }
  };
  if (loading) return <h5>renaming</h5>;
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button type="submit">rename</button>
    </form>
  );
};

export default EventForm;
