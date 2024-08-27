import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function setAdminUsers() {
  const emails = ["lamagnere.quentin@gmail.com", "gabysushi@aol.com"];

  try {
    // Rechercher les utilisateurs par email
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    // Mettre à jour le champ isAdmin pour chaque utilisateur trouvé
    for (const user of users) {
      if (!user.isAdmin) {
        await prisma.user.update({
          where: { id: user.id },
          data: { isAdmin: true },
        });
        console.log(`Updated isAdmin to true for user: ${user.email}`);
      } else {
        console.log(`User ${user.email} is already an admin.`);
      }
    }
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setAdminUsers();
