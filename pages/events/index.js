import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Button from "../../components/ui/button";
import useSWR from "swr";

function AllEventsPage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://next-page-344bb-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  const allEvents = [];

  if (error) {
    return <p>Failed to Load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  for (const key in data) {
    allEvents.push({ id: key, ...data[key] });
  }

  if (!allEvents || allEvents.length === 0) {
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
      <EventList events={allEvents} />
    </div>
  );
}

export default AllEventsPage;
