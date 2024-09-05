import { getCustomDataAction } from "./get-custom-data.action";

const CustomGamePage = async ({ params }: { params: { id: string } }) => {
  const custom = await getCustomDataAction(params.id);
  if (!custom) {
    return <div>Custom game not found</div>;
  }

  return (
    <div className="flex size-full justify-center gap-2 pb-4">
      <div className="relative flex h-full w-1/2  flex-col items-center justify-center gap-2 text-foreground">
        <div className="relative flex h-1/4 grow  flex-col items-center justify-center gap-2 text-foreground">
          <h1>Name</h1>
          <h1>role filter</h1>
        </div>
        <div className="relative flex h-full grow  flex-col items-center justify-center gap-2 text-foreground">
          <h1>Candidate section</h1>
          <h1>or waiting demacia button</h1>
          <h1>or Status if Custom not open anymore</h1>
        </div>
      </div>
      <div className="relative flex h-full w-1/2  flex-col items-center justify-center gap-2 text-foreground">
        <div className="relative flex h-1/4 grow  flex-col items-center justify-center gap-2 text-foreground">
          <h1>Nom de l'organisateur</h1>
          <h1>Description section</h1>
        </div>
        <div className="relative flex h-full grow  flex-col items-center justify-center gap-2 text-foreground">
          <h1>Team Section</h1>
        </div>
        <div className="relative flex  h-1/6 items-center justify-center gap-2 text-foreground">
          <div className="relative flex h-1/6  flex-col items-center justify-center gap-2 border border-accent p-4 text-foreground">
            <h1>Cancel custom</h1>
          </div>
          <div className="relative flex h-1/6  flex-col items-center justify-center gap-2 border border-accent p-4 text-foreground">
            <h1>lock custom</h1>
          </div>
          <div className="relative flex h-1/6  flex-col items-center justify-center gap-2 border border-accent p-4 text-foreground">
            <h1>end custom</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGamePage;
