<svelte:head>
  <script>
    window.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
  </script>

  <script
    src="https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js"></script>
  <script>
    class Main {
      constructor(modules, invocation) {
        this.init(modules, invocation);
      }

      async init(modules, invocation) {
        await languagePluginLoader;
        await pyodide.runPythonAsync(
          "import micropip; micropip.install('lark-parser')"
        );
        await this.fetchSources(modules);
        await pyodide.runPythonAsync(
          "import " +
            Object.keys(modules).join("\nimport ") +
            "\n" +
            invocation +
            "\n"
        );

        document.body.classList.remove("is-loading");
      }

      loadSources(module, baseURL, files) {
        return Promise.all(
          files.map(async (file) => {
            let url = (baseURL ? baseURL + "/" : "") + file;

            const response = await fetch(url, {});
            if (response.status === 200) {
              const code = await response.text();
              let path = `/lib/python3.7/site-packages/${module}/${file}`.split(
                "/"
              );
              let lookup = "";
              for (let i in path) {
                if (!path[i]) {
                  continue;
                }

                lookup += (lookup ? "/" : "") + path[i];

                if (parseInt(i) === path.length - 1) {
                  pyodide._module.FS.writeFile(lookup, code);
                  console.debug(`fetched ${lookup}`);
                } else {
                  try {
                    pyodide._module.FS.lookupPath(lookup);
                  } catch {
                    pyodide._module.FS.mkdir(lookup);
                    console.debug(`created ${lookup}`);
                  }
                }
              }
            }
          })
        );
      }

      async fetchSources(modules) {
        let promises = [];

        for (let module of Object.keys(modules)) {
          promises.push(
            new Promise(async (resolve, reject) => {
              var response = await fetch(`${modules[module]}/files.json`, {});
              if (response.status === 200) {
                var list = await response.text();
                let files = JSON.parse(list);

                await this.loadSources(module, modules[module], files);
                resolve();
              } else {
                reject();
              }
            })
          );
        }

        await Promise.all(promises);
        for (let module_2 of Object.keys(modules)) {
          pyodide.loadedPackages[module_2] = "default channel";
        }
        pyodide.runPython(
          "import importlib as _importlib\n" +
            "_importlib.invalidate_caches()\n"
        );
      }
    }

    top.app = new Main({ app: "app" }, "import app.app; app.app.start()");
  </script>
</svelte:head>

<h1>
  <img src="lark-logo.png" alt="Lark" /> IDE
</h1>

<main>
  <menu>
    <select name="examples">
      <option disabled selected>Examples</option>
    </select>
    <select name="parser">
      <option value="earley" selected>Earley (default)</option>
      <option value="lalr">LALR</option>
      <option value="cyk">CYK</option>
    </select>
  </menu>
  <div id="inputs">
    <div>
      <div>Grammar:</div>
      <textarea name="grammar" id="grammar" placeholder="Lark Grammar..." />
    </div>
    <div>
      <div>Input:</div>
      <textarea name="input" id="input" placeholder="Parser input..." />
    </div>
  </div>
  <div id="result">
    <ul name="ast" />
  </div>
</main>

<style>
  .is-loading:after {
    background-image: url(is-loading.gif);
    background-position: center 35%;
    background-repeat: no-repeat;
    background-color: hsla(0, 0%, 100%, 0.6);
    position: absolute;
    z-index: 700;
    content: " ";
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  h1 {
    text-align: center;
  }

  textarea,
  select,
  body > div > ul {
    /* display: block;
          margin: 15px auto;
          width: 90%;
          font-weight: bold;
          color: #052569; */
    font-family: "Inconsolata", monospace;
  }

  textarea {
    margin: 10px;
    width: 90%;
    padding: 10px;
    font-size: 1.4em;
  }

  #grammar {
    min-height: 300px;
  }

  #input {
    min-height: 100px;
  }

  ul ul {
    border-left: 1px dotted silver;
    margin-left: -16px;
  }

  li {
    list-style: circle;
    margin-left: 10px;
  }

  select {
    padding: 5px;
  }

  #inputs {
    text-align: center;
  }

  #result {
    display: flex;
    justify-content: center;
  }

  #result > ul {
    margin: 10px;
    width: 90%;
    padding: 10px;
    font-size: 1.2em;
  }

  menu {
    display: flex;
  }

  main {
    margin: auto;
  }
</style>
