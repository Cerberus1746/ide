import { loadingConsole } from "./storages.js";

export default class Main {
  async init() {
    this.loadingElement = document.getElementById("loading-console");

    await languagePluginLoader;
    await pyodide.runPythonAsync(
      "import micropip; micropip.install('lark-parser')"
    );
  }

  addToLoading(message) {
    loadingConsole.update(oldMessage => message + "\n" + oldMessage);
  }
}
