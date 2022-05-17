import {useRouter} from 'next/router';
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";
import EventsSearch from "../components/events/events-search";
import { Fragment } from "react";

function FeaturedEventsPage() {
  const featuredEvents = getFeaturedEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={featuredEvents} />
    </Fragment>
  );
}

export default FeaturedEventsPage;
