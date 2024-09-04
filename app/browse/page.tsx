import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCustomAction } from "./get-customs-action";
import { findSummonerNameByIdAction } from "./find-summoner-name-by-id.action";

export default async function HomePage() {
  const customs = await getCustomAction();
  const nameMap = new Map<string, string>();
  if (customs && customs.data) {
    for (const custom of customs.data) {
      const creatorName = await findSummonerNameByIdAction(custom.creatorId);
      if (creatorName) {
        nameMap.set(custom.creatorId, creatorName);
      }
    }
  }

  return (
    <div className="flex  justify-center">
      <div className="relative flex w-1/3 justify-center gap-2 text-foreground">
        {customs?.data &&
          customs.data.map((custom) => (
            <Card key={custom.id} className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle>{nameMap.get(custom.creatorId)}</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-medium">{custom.name}</h4>
                <CardDescription>{custom.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <button className="rounded bg-blue-500 px-4 py-2 text-white">
                  Action
                </button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
