import { prisma } from "@/lib/prisma";

async function getLatestConceptStart() {
  const latestConcept = await prisma.conceptStart.findFirst({
    orderBy: { id: "desc" },
  });
  return latestConcept;
}

export async function ConceptTimestamps() {
  const latestConcept = await getLatestConceptStart();

  return (
    <div>
      {latestConcept ? (
        <p>Concept n° {latestConcept.id}</p>
      ) : (
        <p>No concept yet</p>
      )}
    </div>
  );
}
