import Link from "next/link";

interface Event {
  id: string;
  name: string;
  createBy: string | null;
}

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Last Events</h2>
      {events.map((event) => (
        <Link href={`/events/${event.name}`} key={event.id}>
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="flex h-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
              <span className="font-bold dark:text-white">
                {event.createBy}
              </span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 lg:col-span-2">
              <span className="font-semibold dark:text-white">
                {event.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
