import { LandingHeader } from "@/features/landing/LandingHeader";
import { SearchBar } from "@/components/SearchBar";
import CreateEvent from "@/components/CreateEvent";

// ... existing imports ...

export default function HomePage() {
  return (
    <div className="relative flex h-screen flex-col bg-background text-foreground">
      <LandingHeader />

      {/* Centered SearchBar and CreateEvent */}
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <SearchBar />
          <CreateEvent />
        </div>
      </div>

      {/* ... rest of the components ... */}
    </div>
  );
}
