import { LandingHeader } from "@/features/landing/LandingHeader";
import CreateEvent from "@/components/CreateEvent";
import { getLastTenEvents } from "../app/actions/event";
import Link from "next/link";

export default async function HomePage() {
  const events = await getLastTenEvents();

  return (
    <div className="relative flex h-screen flex-col bg-background text-foreground">
      <LandingHeader />

      {/* Centered SearchBar and CreateEvent */}
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <CreateEvent />
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Last 10 Events</h2>
            {events.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                  <div className="flex h-32 items-center justify-center rounded-lg bg-gray-200">
                    <span className="font-bold">ID: {event.id}</span>
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-lg bg-gray-200 lg:col-span-2">
                    <span className="font-semibold">{event.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ... rest of the components ... */}
    </div>
  );
}
