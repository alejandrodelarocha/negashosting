import { useReducer, useCallback } from 'react'
import { builderReducer, initialState } from './useBuilderState'

const MAX_HISTORY = 50

function historyReducer(state, action) {
  if (action.type === 'UNDO') {
    if (state.past.length === 0) return state
    const prev = state.past[state.past.length - 1]
    return {
      past: state.past.slice(0, -1),
      present: prev,
      future: [state.present, ...state.future]
    }
  }
  if (action.type === 'REDO') {
    if (state.future.length === 0) return state
    const next = state.future[0]
    return {
      past: [...state.past, state.present],
      present: next,
      future: state.future.slice(1)
    }
  }
  const newPresent = builderReducer(state.present, action)
  if (newPresent === state.present) return state
  return {
    past: [...state.past.slice(-(MAX_HISTORY - 1)), state.present],
    present: newPresent,
    future: []
  }
}

export default function useBuilderStateWithHistory() {
  const [state, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialState,
    future: []
  })

  const stableDispatch = useCallback((action) => {
    dispatch(action)
  }, [])

  return [
    state.present,
    stableDispatch,
    { canUndo: state.past.length > 0, canRedo: state.future.length > 0 }
  ]
}
