<script context="module">
  let monaco_promise;
  let _monaco;

  monaco_promise = import("./monaco.js");
  monaco_promise.then((mod) => {
    _monaco = mod.default;
  });
</script>

<script>
  import { afterUpdate } from "svelte";

  let monaco;
  let container;
  let created = false;

  const monaco_options = {
    value: `\
?start: value
?value: object
        | array
        | string
        | SIGNED_NUMBER      -> number
        | "true"             -> true
        | "false"            -> false
        | "null"             -> null
array  : "[" [value ("," value)*] "]"
object : "{" [pair ("," pair)*] "}"
pair   : string ":" value
string : ESCAPED_STRING
%import common.ESCAPED_STRING
%import common.SIGNED_NUMBER
%import common.WS
%ignore WS`,
    language: "lark",
  };

  afterUpdate(() => {
    if (!created) {
      monaco_promise.then(async (mod) => {
        if (container) {
          monaco = mod.default;
          monaco.editor.create(container, monaco_options);
          created = true;
        }
      });
    }
  });
</script>

<div
  class="monaco-container"
  bind:this={container}
  style="height: 500px; text-align: left"
/>
