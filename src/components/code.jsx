// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "../state/reducer"
import prefixer from "../utils/class-name-prefixer"
import CodeMirror from "react-codemirror2"
import "codemirror/mode/clike/clike"

type Props = {
  code: string,
  line_number: number,
  line_count: number,
}

class Code extends Component<Props> {
  componentDidMount() {
    this.addHighlighting()
    this.removeHighlighting()
  }

  componentDidUpdate() {
    this.addHighlighting()
    this.removeHighlighting()
  }

  editor: CodeMirror

  addHighlighting() {
    this.editor
      .getCodeMirror()
      .getDoc()
      .addLineClass(
        this.props.line_number,
        "background",
        prefixer("current-line"),
      )
    this.editor
      .getCodeMirror()
      .getDoc()
      .addLineClass(
        this.props.line_number,
        "gutter",
        prefixer("current-line-gutter"),
      )
  }

  removeHighlighting() {
    for (let i = 0; i < this.props.line_count; i++) {
      if (i !== this.props.line_number) {
        this.editor
          .getCodeMirror()
          .getDoc()
          .removeLineClass(i, "background", prefixer("current-line"))
        this.editor
          .getCodeMirror()
          .getDoc()
          .removeLineClass(i, "gutter", prefixer("current-line-gutter"))
      }
    }
  }

  render() {
    return (
      <div className={prefixer("code")}>
        <CodeMirror
          value={this.props.code}
          options={{ readOnly: true, mode: "text/x-java", lineNumbers: true }}
          ref={(o) => {
            this.editor = o
          }}
        />
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    code: state.codeStatesReducer.code,
    line_number:
      state.codeStatesReducer.code_states[state.codeStatesReducer.index].line -
      1,
    line_count: state.codeStatesReducer.code.split("\n").length + 1,
  }
}

export default connect<Props, *, *, *, *, *>(mapStateToProps)(Code)
