<script>
  import Monaco from "./monaco/monaco-editor.svelte";

  import "bootstrap/dist/css/bootstrap.min.css";

  import { Row, Col, Form, FormGroup, Input, Label } from "sveltestrap";
  import SelectInput from "./examples/SelectInput.svelte";
</script>

<h1>
  <img src="lark-logo.png" alt="Lark" /> IDE
</h1>

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
  <Row>
    <Col>Parser</Col>
    <Col>Input</Col>
  </Row>
  <Row>
    <Monaco monacoClass={"col-6"} />
    <FormGroup class="col-6">
      <Input
        type="textarea"
        name="input"
        id="input"
        placeholder="Parser input..."
      />
    </FormGroup>
  </Row>
</Form>
<div id="result">
  <ul name="ast" />
</div>
