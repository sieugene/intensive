import React from "react";
import Event from "./../../components/Event";
import { initializeApollo } from "../../lib/apolloClient";
import { allEvenetsQuery, eventQuery } from "../../queries/events";
import Router from "next/router";
import { useLazyQuery } from "@apollo/client";

//Способ получение с getStaticPath и getStaticProps

export default function EventPage(props) {
  //костыли, так как получаем статику от серва, нет апдейта после сохранения
  //нового названия title
  //updateEvent - запрос за конкретным event`ом
  //currentData - если получаем уже от апдейта, то используем, если нет, то статику
  const [updateEvent, { data }] = useLazyQuery(eventQuery, {
    variables: { id: props.data.event.id },
  });
  const currentData = data ? data : props.data;
  //
  return (
    <div>
      <button
        onClick={() => {
          Router.push("/");
        }}
      >
        {" "}
        {"<--"} Back
      </button>
      <h1>Event page</h1>
      <Event {...currentData.event} updateEvent={updateEvent} />
    </div>
  );
}

export async function getStaticPaths() {
  //юзаем аполло
  const apolloClient = initializeApollo();
  //делаем запрос
  const { data, loading } = await apolloClient.query({
    query: allEvenetsQuery,
    variables: "",
  });
  //получаем ответ, в return указываем params! И делаем в стрингу!
  const paths =
    (await data) &&
    data.allEvents.map((d) => {
      return {
        params: {
          id: d.id.toString(),
        },
      };
    });
  //все получили
  //автоматом вытянет нам нужный event id из урла
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params, query }) {
  //юзаем аполло
  const apolloClient = initializeApollo();
  //запрашиваем наш event
  const { data, loading } = await apolloClient.query({
    query: eventQuery,
    variables: { id: params.id },
  });
  //отдаем
  return {
    props: {
      data,
    },
  };
}
