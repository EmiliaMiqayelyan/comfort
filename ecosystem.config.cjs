module.exports = {
  apps: [
    {
      name: "comfort-api",
      cwd: "/var/www/comfort/server",
      script: "dist/main.js",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "400M",
      env: { NODE_ENV: "production", PORT: "4040" },
    },
    {
      name: "comfort-web",
      cwd: "/var/www/comfort",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3040",
      exec_mode: "fork",
      instances: 1,
      interpreter: "node",
      autorestart: true,
      max_memory_restart: "700M",
      env: {
        NODE_ENV: "production",
        PORT: "3040",
        NEXT_PUBLIC_API_URL: "/api",
        API_URL: "http://127.0.0.1:4040/api",
      },
    },
  ],
};
