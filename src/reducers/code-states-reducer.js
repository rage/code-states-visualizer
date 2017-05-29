// @flow
import { createReducer } from 'redux-create-reducer';
import { CODE_STATE_CHANGED } from 'state/actions';
import type { CodeStateAction } from 'state/actions';

export type State = {
  code: string,
  code_states: [],
  index: number,
}

/* eslint-disable max-len */
const tempCode = 'public class LaskentaAskeleittain {\n  public static void main(String[] args) {\n    int eka = (1 + 1);\n    int toka = eka + 3 * (2 + 5);\n\n    eka = 5;\n\n    int kolmas = eka + toka;\n    System.out.println(eka);\n    System.out.println(toka);\n    System.out.println(kolmas);\n  }\n}';

const tempStates = JSON.parse('[{"stdout":"","event":"call","line":3,"stack_to_render":[{"func_name":"main:3","encoded_locals":{},"ordered_varnames":[],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"1","frame_id":1}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":3,"stack_to_render":[{"func_name":"main:3","encoded_locals":{},"ordered_varnames":[],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"2","frame_id":2}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":4,"stack_to_render":[{"func_name":"main:4","encoded_locals":{"eka":2},"ordered_varnames":["eka"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"4","frame_id":4}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":6,"stack_to_render":[{"func_name":"main:6","encoded_locals":{"eka":2,"toka":23},"ordered_varnames":["eka","toka"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"9","frame_id":9}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":8,"stack_to_render":[{"func_name":"main:8","encoded_locals":{"eka":5,"toka":23},"ordered_varnames":["eka","toka"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"12","frame_id":12}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":9,"stack_to_render":[{"func_name":"main:9","encoded_locals":{"eka":5,"toka":23,"kolmas":28},"ordered_varnames":["eka","toka","kolmas"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"17","frame_id":17}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"5\\n","event":"step_line","line":10,"stack_to_render":[{"func_name":"main:10","encoded_locals":{"eka":5,"toka":23,"kolmas":28},"ordered_varnames":["eka","toka","kolmas"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"21","frame_id":21}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"5\\n23\\n","event":"step_line","line":11,"stack_to_render":[{"func_name":"main:11","encoded_locals":{"eka":5,"toka":23,"kolmas":28},"ordered_varnames":["eka","toka","kolmas"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"24","frame_id":24}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"5\\n23\\n28\\n","event":"step_line","line":12,"stack_to_render":[{"func_name":"main:12","encoded_locals":{"eka":5,"toka":23,"kolmas":28},"ordered_varnames":["eka","toka","kolmas"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"27","frame_id":27}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"5\\n23\\n28\\n","event":"return","line":12,"stack_to_render":[{"func_name":"main:12","encoded_locals":{"eka":5,"toka":23,"kolmas":28,"__return__":["VOID"]},"ordered_varnames":["eka","toka","kolmas","__return__"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"28","frame_id":28}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}}]');
/* eslint-enable max-len */

const initialState = {
  code: tempCode,
  code_states: tempStates,
  index: 0,
};

export default createReducer(initialState, {
  [CODE_STATE_CHANGED](state: State, action: CodeStateAction): State {
    return {
      ...state,
      ...{
        index: action.index,
      },
    };
  },
});
