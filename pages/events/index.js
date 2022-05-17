import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";

function AllEventsPage() {
  const allEvents = getAllEvents();

  return (
    <div>
      <EventList events={allEvents} />
    </div>
  );
}

export default AllEventsPage;
