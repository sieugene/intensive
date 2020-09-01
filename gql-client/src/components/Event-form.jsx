import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RenameEventMutation } from '../queries/events';

const EventForm = ({event}) => {
    const [title,setTitle] = useState(event.title)
    //тут объявили функцию и вызываем в хендлере
    const [rename,{loading}] = useMutation(RenameEventMutation, {
        variables: {
            id: event.id,
            title: title
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        rename();
    }
    if(loading) return <h5>renaming</h5>
    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => {setTitle(e.target.value)}}/>
            <button type="submit">rename</button>
        </form>
    )
}

export default EventForm