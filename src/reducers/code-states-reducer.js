// @flow
import { createReducer } from 'redux-create-reducer';
import { CODE_STATE_CHANGED } from 'state/actions';
import type { CodeStateAction } from 'state/actions';

export type State = {
  code: string,
  code_states: [],
  index: number,
  current_stack: [],
  current_print_outputs: [],
  current_heap: [],
}

// function normalizeObject(heap, refnum) {

//   return JSON.stringify(heap[refnum]);
// }

function normalizeStack(state) {
  const stack = state.stack_to_render;
  const modifiedStack = [];
  stack.forEach((sf) => {
    const toModifiedStack = {};
    toModifiedStack.func_name = sf.func_name;
    toModifiedStack.is_highlighted = sf.is_highlighted;
    const modifiedLocals = [];
    const objects = [];
    sf.ordered_varnames.forEach((name) => {
      const key = name;
      const value = sf.encoded_locals[name];
      if (key === '__return__') {
        if (Array.isArray(value)) {
          modifiedLocals.push(['return value', value[0]]);
        } else {
          modifiedLocals.push(['return value', value]);
        }
      } else if (Array.isArray(value)) {
        if (value[0] === 'REF') {
          const refnum = value[1];
          const arr = [];
          state.heap[refnum].forEach((o) => { arr.push(o); });
          arr.shift();
          let prettyValue = '[';
          arr.forEach((o) => { prettyValue += `${o.toString()}, `; });
          if (prettyValue.length > 2) {
            prettyValue = prettyValue.substring(0, prettyValue.length - 2);
          }
          prettyValue += ']';
          modifiedLocals.push([key, prettyValue]);
          objects.push([`${state.heap[refnum][1]}.instance`, state.heap[refnum]]);
        }
      } else {
        modifiedLocals.push([key, JSON.stringify(value)]);
      }
    });
    toModifiedStack.encoded_locals = modifiedLocals;
    toModifiedStack.objects = objects;
    modifiedStack.unshift(toModifiedStack);
  });
  return modifiedStack;
}

function normalizeHeap(state) {
  const refNames = state.stack_to_render.map((sf) => {
    const refArray = [];
    Object.entries(sf.encoded_locals).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      if (Array.isArray(value)) {
        if (value[0] === 'REF') {
          refArray.push([value[1], key]);
        }
      }
    });
    return refArray;
  });
  const heap = state.heap;
  const modifiedHeap = [];
  Object.entries(heap).forEach((refnum, values) => {
    modifiedHeap.push([refNames[0][refnum], values]);
  });
  return modifiedHeap;
}

function fixNewLines(outputs) {
  return outputs.split('\n');
}

export default function createReducerCreator(input: string) {
  const data = JSON.parse(input);
  const code = data.code;
  const states = data.trace.slice(1);

  const initialState = {
    code,
    code_states: states,
    index: 0,
    current_stack: normalizeStack(states[0]),
    current_print_outputs: fixNewLines(states[0].stdout),
    current_heap: normalizeHeap(states[0]),
  };

  return createReducer(initialState, {
    [CODE_STATE_CHANGED](state: State, action: CodeStateAction): State {
      return {
        ...state,
        ...{
          index: action.index,
          current_stack: normalizeStack(states[action.index]),
          current_print_outputs: fixNewLines(states[action.index].stdout),
          current_heap: normalizeHeap(states[action.index]),
        },
      };
    },
  });
}
