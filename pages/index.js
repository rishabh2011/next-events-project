import { useRouter } from "next/router";
import EventList from "../components/events/EventList";
import EventsSearch from "../components/events/events-search";
import { Fragment } from "react";

function FeaturedEventsPage(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={props.featuredEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://next-page-344bb-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const featuredEvents = [];
  for (const key in data) {
    if (data[key].isFeatured === true) {
      featuredEvents.push({ id: key, ...data[key] });
    }
  }
  return {
    props: {
      featuredEvents: featuredEvents,
    },
  };
}

export default FeaturedEventsPage;
