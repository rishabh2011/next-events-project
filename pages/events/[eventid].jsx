import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";

import ErrorAlert from "../../components/ui/error-alert/error-alert";

function SelectedEventPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventid);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
}

export default SelectedEventPage;
