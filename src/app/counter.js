import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from 'components/Counter'
import counter from 'redux/CounterReducer'

const store = createStore(counter)
const rootEl = document.querySelector('#root')
console.log(rootEl)

const render = () => ReactDOM.render(
  <Counter
    value = { store.getState() }
    onIncrement = {() => store.dispatch({type: 'INCREMENT'})}
    onDecrement = {() => store.dispatch({type: 'DECREMENT'})}
  />,
  rootEl
)

render()

store.subscribe(render)
