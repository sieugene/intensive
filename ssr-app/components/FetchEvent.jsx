import React from 'react'
import { useQuery } from '@apollo/client';
import { eventQuery } from '../queries/events';

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

export default FetchEvent