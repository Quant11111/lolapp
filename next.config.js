/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");
const fs = require("fs");
const path = require("path");

const isProd = process.env.PROJECT_ENV === "production";

const nextConfig = withPlausibleProxy()({
  server: isProd
    ? {
        https: {
          key: fs.readFileSync(
            path.resolve(
              __dirname,
              "/etc/letsencrypt/live/padelu.orbweavers.com/privkey.pem",
            ),
          ),
          cert: fs.readFileSync(
            path.resolve(
              __dirname,
              "/etc/letsencrypt/live/padelu.orbweavers.com/fullchain.pem",
            ),
          ),
        },
      }
    : {},
});

module.exports = nextConfig;
