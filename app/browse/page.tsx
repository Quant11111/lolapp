import { LandingHeader } from "@/features/landing/LandingHeader";
import { getLastTenEvents } from "../../app/actions/event";
import { EventList } from "@/components/EventList";

export default async function HomePage() {
  const events = await getLastTenEvents();

  return (
    <div className="relative flex h-screen flex-col bg-background text-foreground">
      <LandingHeader />

      {/* Centered SearchBar and CreateEvent */}
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <EventList events={events} />
        </div>
      </div>

      {/* ... rest of the components ... */}
    </div>
  );
}
