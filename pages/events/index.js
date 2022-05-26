import EventList from "../../components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import useSWR from "swr";

function AllEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://next-page-344bb-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log("running");
      const allEvents = [];
      for (const key in data) {
        allEvents.push({ id: key, ...data[key] });
      }
      setLoadedEvents(allEvents);
    }
  }, [data]);

  if (error) {
    return <p>Failed to Load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  if (!loadedEvents || loadedEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <div>
      <EventList events={loadedEvents} />
    </div>
  );
}

export default AllEventsPage;
