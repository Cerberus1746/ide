<script context="module">
  let monaco_promise;

  monaco_promise = import("./monaco.js");

</script>

<script>
  import { afterUpdate } from "svelte";
  import { editContents } from "../storages";
  export let monacoClass;

  let monaco;
  let container;
  let editor = false;

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
    if (!editor) {
      monaco_promise.then(async (mod) => {
        if (container) {
          monaco = mod.default;
          editor = monaco.editor.create(container, monaco_options);
          editor.getModel().onDidChangeContent((event) => {
            console.log(editor.getValue());
            editContents.parserEditor.update(() => {
              editor.getValue();
            });
          });
        }
      });
    }
  });
</script>

<div
  class="monaco-container {monacoClass}"
  bind:this={container}
  style="height: 500px; text-align: left"
/>
