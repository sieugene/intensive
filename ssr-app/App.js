import React from "react";
import apolloClient from './apollo/index';
import { ApolloProvider } from "@apollo/client";
import EventList from './components/Event-list';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <div>Events</div>
        <EventList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
