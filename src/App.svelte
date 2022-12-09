<script>
  import Router from "svelte-spa-router";

  import routes from "./routes";
</script>

<div class="dark:text-white dark:bg-gray-800">
  <Router {routes} />
</div>
