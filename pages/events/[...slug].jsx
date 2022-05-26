import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

function FilteredEventsPage(props) {

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.filteredYear, props.filteredMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={props.filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  
  const filteredYear = Number(params.slug[0]);
  const filteredMonth = Number(params.slug[1]);

  const response = await fetch(
    "https://next-page-344bb-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  let events = getFilteredEvents(data, filteredYear, filteredMonth);
  
  return {
    props: {
      filteredYear: filteredYear,
      filteredMonth: filteredMonth,
      filteredEvents: events,
    },
  };
}

function getFilteredEvents(events, year, month) {
  let filteredEvents = [];
  for(const key in events){
    const eventDate = new Date(events[key].date);
    if(eventDate.getFullYear() === year && eventDate.getMonth() === month - 1){
      filteredEvents.push({id: key, ...events[key]});
    }
  }
  return filteredEvents;
}

export default FilteredEventsPage;
