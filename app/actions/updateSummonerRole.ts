export async function updateSummonerRole(summonerId: string, role: string) {
  try {
    const response = await fetch("/api/upSummonerRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summonerId, role }),
    });

    if (!response.ok) {
      console.error("Failed to update summoner role");
      return null;
    }

    const data = await response.json();
    return data.summoner;
  } catch (error) {
    console.error("Error updating summoner role:", error);
    return null;
  }
}
