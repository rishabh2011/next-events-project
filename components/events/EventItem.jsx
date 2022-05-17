import Image from "next/image";
import classes from "./event-item.module.css";
import Button from "../ui/button";

import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
  const humanReadableDate = new Date(props.event.date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedAddress = props.event.location.replace(", ", "\n");
  const exploreLink = `/events/${props.event.id}`;

  return (
    <li className={classes.item}>
      <Image
        width={200}
        height={200}
        src={"/" + props.event.image}
        alt={props.event.title}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
