const CustomGamePage = async ({ params }: { params: { puuid: string } }) => {
  return (
    <div className="flex size-full justify-center">
      <div className="relative flex h-full w-1/3 flex-col justify-center gap-2 text-foreground">
        <h1>{params.puuid}</h1>
        <p>Focus on summoner (not implemented yet)</p>
      </div>
    </div>
  );
};

export default CustomGamePage;
