<script>
  import Monaco from './monaco/monaco-editor.svelte';

  import "bootstrap/dist/css/bootstrap.min.css";

  import { Col, Form, FormGroup, Input, Label } from "sveltestrap";
  import SelectInput from "./examples/SelectInput.svelte";
</script>

<h1>
  <img src="lark-logo.png" alt="Lark" /> IDE
</h1>

<div id="app">
  <Monaco />
</div>

<main>
  <Form>
    <Col>
      <FormGroup row>
        <SelectInput />
        <Input class="col" type="select" name="parser" id="parserSelect">
          <option value="earley" selected>Earley (default)</option>
          <option value="lalr">LALR</option>
          <option value="cyk">CYK</option>
        </Input>
      </FormGroup>
    </Col>
    <FormGroup>
      <Label for="grammar">Grammar</Label>
      <Input
        type="textarea"
        name="grammar"
        id="grammar"
        placeholder="Lark Grammar..."
      />
    </FormGroup>
    <FormGroup>
      <Label for="input">Input:</Label>
      <Input
        type="textarea"
        name="input"
        id="input"
        placeholder="Parser input..."
      />
    </FormGroup>
  </Form>
  <div id="result">
    <ul name="ast" />
  </div>
</main>
