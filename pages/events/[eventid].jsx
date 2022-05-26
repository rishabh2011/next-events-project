import { Fragment } from "react";
import { useRouter } from "next/router";

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";

import ErrorAlert from "../../components/ui/error-alert/error-alert";

function SelectedEventPage(props) {
 
  if (!props.event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date}
        address={props.event.location}
        image={props.event.image}
        imageAlt={props.event.title}
      />
      <EventContent>{props.event.description}</EventContent>
    </Fragment>
  );
}

async function getData(){
  const response = await fetch("https://next-page-344bb-default-rtdb.firebaseio.com/events.json");
  const data = await response.json();
  return data;
}

export async function getStaticPaths(){
  const data = await getData();
  const paths = [];
  for (const key in data){
    paths.push({params: {eventid : key}});
  }
  
  return {
    paths : paths,
    fallback: "blocking"
  };
}

export async function getStaticProps(context){
  const {params} = context;
  const data = await getData();
  return {
    props: {
      event: data[params.eventid]
    }
  }
}

export default SelectedEventPage;
