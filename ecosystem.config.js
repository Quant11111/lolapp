module.exports = {
  apps: [
    {
      name: "lolapp",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      watch: true,
    },
  ],
};
