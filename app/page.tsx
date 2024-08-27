import { LandingHeader } from "@/features/landing/LandingHeader";

import { SearchBar } from "@/components/SearchBar"; // Import the SearchBar component

// ... existing imports ...

export default function HomePage() {
  return (
    <div className="relative flex h-screen flex-col bg-background text-foreground">
      <LandingHeader />

      {/* Centered SearchBar */}
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-md px-4">
          <SearchBar />
        </div>
      </div>

      {/* ... rest of the components ... */}
    </div>
  );
}

//test
