import App from "../components/App";
import { initializeApollo } from "../lib/apolloClient";
import EventList from './../components/Event-list';
import { allEvenetsQuery } from './../queries/events';


const IndexPage = (props) => (
  <App>
    <div className="App">
      {props.children}
      <div>Events</div>
      <EventList data={props.data}/>
    </div>
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data, loading } = await apolloClient.query({
    query: allEvenetsQuery,
    variables: "",
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data,
      loading
    },
    revalidate: 1,
  };
}

export default IndexPage;
