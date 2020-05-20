// @flow

export const CODE_STATE_CHANGED = "CODE_STATE_CHANGED"

export function codeStateAction(index: number) {
  return {
    type: CODE_STATE_CHANGED,
    index,
  }
}

export type CodeStateAction = {
  type: string,
  index: number,
}
