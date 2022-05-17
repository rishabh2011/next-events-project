import EventItem from "./EventItem";
import classes from './event-list.module.css';

function EventList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => {
        return <EventItem key={event.id} event={event}/>;
      })}
    </ul>
  );
}

export default EventList;
