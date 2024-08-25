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
      <h2>Latest Concept Start</h2>
      {latestConcept ? (
        <p>ID: {latestConcept.id}</p>
      ) : (
        <p>No concept starts found</p>
      )}
    </div>
  );
}
