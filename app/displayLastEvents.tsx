import Link from "next/link";
import { getLastTenEvents } from "../app/actions/event";

export default async function DisplayLastEvents() {
  const events = await getLastTenEvents();

  return (
    <div>
      <h2>Last 10 Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>
              {event.name} (ID: {event.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
