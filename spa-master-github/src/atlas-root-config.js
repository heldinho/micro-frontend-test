import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@atlas/atlas-firewall",
  app: () => System.import("@atlas/atlas-firewall"),
  activeWhen: (location) => location.pathname === "/",
});

registerApplication({
  name: "@atlas/atlas-auth",
  app: () => System.import("@atlas/atlas-auth"),
  activeWhen: ["/auth"],
});

registerApplication({
  name: "@atlas/atlas-app",
  app: () => System.import("@atlas/atlas-app"),
  activeWhen: ["/app"],
});

start({
  urlRerouteOnly: true,
});
