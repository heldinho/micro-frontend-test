import { registerApplication, start } from "single-spa";
import maps from "./config/register-application/maps.json";

maps.map((item) => {
  registerApplication({
    name: item.name,
    app: () => System.import(item.app),
    activeWhen: item.exact
      ? (location) => location.pathname === item.path
      : [item.path],
  });
});

start({
  urlRerouteOnly: true,
});
