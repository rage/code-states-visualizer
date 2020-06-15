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
}

function normalizeReturnVariable(value) {
  return Array.isArray(value) ? ['return value', value[0]] : ['return value', value];
}

function normalizeArrayVariable(key, value, state) {
  const refnum = value[1];
  const arr = [];
  state.heap[refnum].forEach((o) => {
    if (Array.isArray(o)) {
      if (o[0] === 'REF') {
        const inception = normalizeArrayVariable(key, o, state);
        inception.shift();
        arr.push(inception);
      } else {
        for (let i = 0; i < o[1]; i++) {
          arr.push(0);
        }
      }
    } else {
      arr.push(o);
    }
  });
  arr.shift();
  let prettyValue = '[';
  arr.forEach((o) => {
    if (Array.isArray(o)) {
      prettyValue += `${o.toString()},\n `;
    } else {
      prettyValue += `${o.toString()}, `;
    }
  });
  if (prettyValue.length > 2) {
    prettyValue = prettyValue.substring(0, prettyValue.length - 2);
    if (prettyValue.charAt(prettyValue.length - 1) === ',') {
      prettyValue = prettyValue.substring(0, prettyValue.length - 1);
    }
  }
  prettyValue += ']';
  return [key, prettyValue];
}

function normalizeLocal(name, frame, modifiedLocals, state) {
  const returnLocals = modifiedLocals;
  const key = name;
  const value = frame.encoded_locals[name];
  if (key === '__return__') {
    return normalizeReturnVariable(value, returnLocals);
  } else if (Array.isArray(value)) {
    if (value[0] === 'REF') {
      return normalizeArrayVariable(key, value, state, returnLocals);
    } else if (value[0] === 'NUMBER-LITERAL') {
      return [key, value[1]];
    }
    return [key, JSON.stringify(value)];
  }
  return [key, JSON.stringify(value)];
}

function normalizeFrame(frame, modifiedStack, state) {
  const toModifiedStack = {};
  toModifiedStack.func_name = frame.func_name;
  toModifiedStack.is_highlighted = frame.is_highlighted;
  const modifiedLocals = [];
  frame.ordered_varnames.forEach((name) => { modifiedLocals.push(normalizeLocal(name, frame, modifiedLocals, state)); });
  toModifiedStack.encoded_locals = modifiedLocals;
  modifiedStack.unshift(toModifiedStack);
  return modifiedStack;
}

function normalizePythonFrame(frame, stack, state) {
  const modifiedStack = stack;
  const modifiedLocals = [];
  modifiedStack.func_name = frame.func_name;
  modifiedStack.is_highlighted = frame.is_highlighted;
  frame.ordered_varnames.forEach((name) => { modifiedLocals.push(normalizeLocal(name, frame, modifiedLocals, state)); });
  modifiedStack.encoded_locals = modifiedLocals;
  return modifiedStack;
}

function normalizeVariables(variables, variableNames, state) {
  const normalizedVariables = [];
  variableNames.forEach((name) => {
    const variable = variables[name];
    let normalizedVariable = [name, variable];
    if (Array.isArray(variable)) {
      if (state.heap[variable[1]][0] === 'LIST') {
        normalizedVariable = normalizeArrayVariable(name, variable, state);
        normalizedVariables.push(normalizedVariable);
      }
    } else {
      normalizedVariables.push(normalizedVariable);
    }
  });
  return normalizedVariables;
}

function normalizeStack(state, language) {
  if (language === 'python') {
    let modifiedState = state;
    let globalVariables = [];
    if (Object.keys(state.heap).length > 0) {
      globalVariables = normalizeVariables(state.globals, state.ordered_globals, state);
    } else {
      state.ordered_globals.forEach((g) => { globalVariables.push([g, state.globals[g]]); });
    }
    modifiedState.global_variables = globalVariables;
    const stack = state.stack_to_render;
    if (stack === undefined || stack.length === 0) {
      modifiedState.is_highlighted = true;
    } else {
      stack.forEach((sf) => { modifiedState = normalizePythonFrame(sf, modifiedState, state); });
    }
    return [modifiedState];
  }
  const stack = state.stack_to_render;
  let modifiedStack = [];
  stack.forEach((sf) => { modifiedStack = normalizeFrame(sf, modifiedStack, state); });
  return modifiedStack;
}

function fixNewLines(outputs) {
  return outputs.split('\n');
}

/* eslint-disable no-param-reassign */
function getExceptionsFromState(state, prevState) {
  let message = '';
  if (typeof state.exception_msg !== 'undefined') {
    message = state.exception_msg;
    if (typeof prevState !== 'undefined') {
      state.line = prevState.line;
    } else {
      state.line = 1;
    }
  }
  return message;
}
/* eslint-enable no-param-reassign */

export default function createReducerCreator(input: string, language: string) {
  const data = JSON.parse(input);
  const code = data.code;
  let states;
  if (language === 'python') {
    states = data.trace;
  } else {
    states = data.trace.slice(1);
  }

  const initialState = {
    code,
    code_states: states,
    index: 0,
    current_stack: normalizeStack(states[0], language),
    current_print_outputs: fixNewLines(states[0].stdout),
    current_exception: getExceptionsFromState(states[0], undefined),
    language,
  };

  return createReducer(initialState, {
    [CODE_STATE_CHANGED](state: State, action: CodeStateAction): State {
      return {
        ...state,
        ...{
          index: action.index,
          current_stack: normalizeStack(states[action.index], language),
          current_print_outputs: fixNewLines(states[action.index].stdout),
          current_exception: getExceptionsFromState(states[action.index], states[action.index - 1]),
        },
      };
    },
  });
}
