<svelte:head>
  <script>
    window.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
  </script>

  <script
    src="https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js"
    on:load={start}></script>
</svelte:head>


<script>
  import Ui from "./Ui.svelte";
  import Main from "./load_python.js";
  import { loadingConsole } from "./storages.js";

  var initializing;
  var currLoadingConsole;

  var main = new Main();

  loadingConsole.subscribe((value) => {
    currLoadingConsole = value;
  });

  function start() {
    initializing = main.init({ app: "app" }, "import app.app; app.app.start()");
  }
</script>

{#await initializing}
  <p>...waiting</p>
  <pre>{currLoadingConsole}</pre>
{:then}
  <Ui />
{:catch error}
  <pre style="color: red">{error.message}</pre>
{/await}
