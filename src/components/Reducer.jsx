import { ACTIONS } from "../components/Actions.jsx"
import {evaluate} from '../App'

export function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            current: payload.digit,
            overwrite: false
          }
        }
        if (payload.digit === '0' && state.current === '0') return state
        if (payload.digit === '.' &&  state.current == null) return state
        if (payload.digit === '.' &&  state.current.includes('.')) return state
        return {
          ...state,
          current: `${state.current || ''}${payload.digit}`
        }
      case ACTIONS.CHOSE_OPERATION:
        if (state.current == null && state.previous == null) {
          return state
        }
        if (state.current == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
        if (state.previous == null) {
          return {
            ...state,
            operation: payload.operation,
            previous: state.current,
            current: null
          }
        }
        return {
          ...state,
          previous: evaluate(state),
          operation: payload.operation,
          current: null
        }
      case ACTIONS.CLEAR:
        return {}
      case ACTIONS.EVALUATE:
        if (state.operation == null || state.current == null || state.previous == null) {
          return state
        }
        return{
          ...state,
          overwrite: true,
          previous: null,
          operation: null,
          current: evaluate(state),
        }
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            overwrite: false,
            current: null
          }
        }
        if(state.current == null) return state
        if(state.current.length === 1){
          return{
            ...state,
            current: null
          }
        }
        return{
          ...state,
          current: state.current.slice(0, -1) 
        }
    }
  }