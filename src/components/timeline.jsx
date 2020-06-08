// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { Dispatch } from "../state/reducer"
import { codeStateAction } from "../state/actions"
import prefixer from "../utils/class-name-prefixer"
import Slider from "rc-slider"

type Props = {
  index: number,
  onChange: (index: number) => void,
  count: number,
  value: number,
}

class Timeline extends Component<Props> {
  render() {
    const Handle = Slider.Handle
    const handle = (props) => {
      // const { value, dragging, index, ...restProps } = props
      const { value, ...restProps } = props
      return <Handle value={value} {...restProps} />
    }

    return (
      <div className={prefixer("timeline-slider")}>
        <Slider
          min={0}
          max={this.props.count - 1}
          value={this.props.index}
          handle={handle}
          onChange={(index) => {
            this.props.onChange(index)
          }}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChange(index: number) {
      dispatch(codeStateAction(index))
    },
  }
}

export default connect<Props, *, *, *, *, *>(null, mapDispatchToProps)(Timeline)
