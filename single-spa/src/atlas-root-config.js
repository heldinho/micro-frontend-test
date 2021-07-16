import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: () => window.location.pathname === "/welcome",
});

registerApplication({
  name: "@atlas/vue-todo-list",
  app: () => System.import("@atlas/vue-todo-list"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@atlas/react-todo-list",
  app: () => System.import("@atlas/react-todo-list"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
