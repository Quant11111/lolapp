import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div className="relative flex h-screen flex-col pt-20 text-foreground">
      {/* Centered SearchBar and CreateEvent */}
      <div className="flex grow items-center justify-center gap-1">
        <div className="flex grow flex-col items-center justify-center gap-1">
          <Button variant="default" size="default">
            default
          </Button>{" "}
          <Button variant="outline" size="default">
            outline
          </Button>{" "}
          <Button variant="destructive" size="default">
            destructive
          </Button>{" "}
          <Button variant="secondary" size="default">
            secondary
          </Button>{" "}
          <Button variant="ghost" size="default">
            ghost
          </Button>{" "}
          <Button variant="invert" size="default">
            invers
          </Button>{" "}
          <Button variant="success" size="default">
            success
          </Button>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-1">
          <Button variant="default" size="sm">
            default
          </Button>{" "}
          <Button variant="outline" size="sm">
            outline
          </Button>{" "}
          <Button variant="destructive" size="sm">
            destructive
          </Button>{" "}
          <Button variant="secondary" size="sm">
            secondary
          </Button>{" "}
          <Button variant="ghost" size="sm">
            ghost
          </Button>{" "}
          <Button variant="invert" size="sm">
            invers
          </Button>{" "}
          <Button variant="success" size="sm">
            success
          </Button>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-1">
          <Button variant="default" size="lg">
            default
          </Button>{" "}
          <Button variant="outline" size="lg">
            outline
          </Button>{" "}
          <Button variant="destructive" size="lg">
            destructive
          </Button>{" "}
          <Button variant="secondary" size="lg">
            secondary
          </Button>{" "}
          <Button variant="ghost" size="lg">
            ghost
          </Button>{" "}
          <Button variant="invert" size="lg">
            invers
          </Button>{" "}
          <Button variant="success" size="lg">
            success
          </Button>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-1">
          <Button variant="default" size="icon">
            default
          </Button>{" "}
          <Button variant="outline" size="icon">
            outline
          </Button>{" "}
          <Button variant="destructive" size="icon">
            destructive
          </Button>{" "}
          <Button variant="secondary" size="icon">
            secondary
          </Button>{" "}
          <Button variant="ghost" size="icon">
            ghost
          </Button>{" "}
          <Button variant="invert" size="icon">
            invers
          </Button>{" "}
          <Button variant="success" size="icon">
            success
          </Button>
        </div>
      </div>

      {/* ... rest of the components ... */}
    </div>
  );
}
