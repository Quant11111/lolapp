import { getCustomDataAction } from "./get-custom-data.action";

const CustomGamePage = async ({ params }: { params: { customId: string } }) => {
  const custom = await getCustomDataAction(params.customId);
  if (!custom) {
    return <div>Custom game not found</div>;
  }

  return (
    <div className="flex size-full justify-center">
      <div className="relative flex h-full w-1/3 flex-col justify-center gap-2 text-foreground">
        <h1>{custom.name}</h1>
        <p>{custom.description}</p>
      </div>
    </div>
  );
};

export default CustomGamePage;
