// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'state/reducer';
import { codeStateAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

class Timeline extends Component {
  props: {
    index: number,
    onChange: (index: number) => void,
    count: number,
  }

  render() {
    const Handle = Slider.Handle;
    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={this.props.index + 1}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    return (
      <div className={prefixer('timeline-slider')}>
        <Slider
          min={0}
          max={this.props.count - 1}
          value={this.props.index}
          handle={handle}
          onChange={(index) => { this.props.onChange(index); }}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChange(index: number) {
      dispatch(codeStateAction(index));
    },
  };
}

export default connect(null, mapDispatchToProps)(Timeline);
