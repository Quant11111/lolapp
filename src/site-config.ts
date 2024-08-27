export const SiteConfig = {
  title: "PADELU",
  description: "Funny app for League conspiracy theorist",
  prodUrl: "https://padelu.orbweavers.org", // TODO: update domain name when deploying
  domain: "orbweavers.org",
  appIcon: "/images/icon.png",
  company: {
    name: "padelu",
    address: "79 rue du Ranelagh",
  },
  brand: {
    primary: "#007291",
  },
  email: {
    from: "padelu <padelu@resend.dev>", // Replace this with your domaine email
    contact: "lamagnere.quentin@gmail.com",
  },
  maker: {
    image:
      "https://quentin-lamagnere.netlify.app/static/media/homepic.cbca523726a2c9d25021.jpg",
    website: "https://quentin-lamagnere.netlify.app",
    twitter: "https://x.com/Quant11111",
    name: "Quant11111",
  },
  partner: {
    image: "https://example.com/gaby-image.jpg", // Replace with Gaby's actual image URL
    website: "https://gaby-website.com", // Replace with Gaby's actual website
    twitter: "https://x.com/gabysushi", // Replace with Gaby's actual Twitter
    name: "Gaby",
  },
  auth: {
    password: false as boolean,
  },
};
