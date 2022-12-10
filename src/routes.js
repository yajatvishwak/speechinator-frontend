import Application from "./pages/Application.svelte";
import TakeAnalysis from "./pages/TakeAnalysis.svelte";
import AllTakes from "./pages/AllTakes.svelte";

const routes = {
  "/": Application,
  "/take/:id": TakeAnalysis,
  "/alltakes": AllTakes,
};
export default routes;
