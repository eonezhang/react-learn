import React, { Component } from 'react'
import { enUS } from 'i18n'

console.log('enUS', enUS)

export default class Item extends Component {
  render() {
    return (
      <div>Item {enUS.name}</div>
    )
  }
}
