import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import pushid from "pushid";

import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: "",
      cssFramework: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });
  }

  handleChange(e) {
    this.setState({ cssFramework: e.target.value });
  }

  runCode = () => {
    let { html, css, js, cssFramework } = this.state;
    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    let value = "";
    if (cssFramework === "bootstrap") {
      value =
        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">';
    } else if (cssFramework === "materialize") {
      value =
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
    } else {
      value = "";
    }

    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${value}
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script type="text/javascript">
            ${js}
            </script>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
          </body>
          </html>
        `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };
    return (
      <React.Fragment>
        <div className="App">
          <section className="playground">
            <div className="code-editor html-code">
              <div className="editor-header">
                HTML
                <select
                  className="form-control ml-3"
                  onChange={this.handleChange}
                >
                  <option value="nativeCss">Native CSS</option>
                  <option value="bootstrap">Bootstrap</option>
                  <option value="materialize">Materialize</option>
                </select>
              </div>
              <CodeMirror
                value={html}
                options={{
                  mode: "htmlmixed",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html });
                }}
              />
            </div>
            <div className="code-editor css-code">
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: "css",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css });
                }}
              />
            </div>
            <div className="code-editor js-code">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: "javascript",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js });
                }}
              />
            </div>
          </section>
          <section className="result">
            <iframe title="result" className="iframe" ref="iframe" />
          </section>
        </div>
      </React.Fragment>
    );
  }
}
