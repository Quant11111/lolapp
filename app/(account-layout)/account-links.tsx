import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { AlertCircle, Coins, Mail, Sword, User2 } from "lucide-react";

export const ACCOUNT_LINKS: NavigationLinkGroups[] = [
  {
    title: "PERSONAL INFORMATION",
    links: [
      { url: "/account", title: "Profile", icon: <User2 /> },

      //{ url: "/account/billing", title: "Billing", icon: <Coins /> },
      { url: "/summoners/id", title: "Summoner", icon: <Sword /> },
      { url: "/account/support", title: "Support Us", icon: <Coins /> },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      { url: "/account/email", title: "Email", icon: <Mail /> },
      {
        url: "/account/delete",
        title: "Delete profile",
        icon: <AlertCircle />,
      },
    ],
  },
];
