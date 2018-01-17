import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { words } from 'subtender'

import {
  disabledTypesSelector,
  readySelector,
} from '../selectors'
import { mapDispatchToProps } from '../store'
import { PTyp } from '../ptyp'


const msgTypes = []
{
  const msgTypeDescs = words('入渠 工廠 遠征 支給 演習 勲章 出撃 任務 申請 昇格 図鑑 達成 改造')
  msgTypeDescs.map((desc,ind) =>
    msgTypes.push({type: String(ind+1), desc})
  )
}

class SettingsImpl extends PureComponent {
  static propTypes = {
    readyFlag: PTyp.bool.isRequired,
    disabledTypes: PTyp.array.isRequired,
    toggleMessageType: PTyp.func.isRequired,
  }

  handleToggleMessage = typ => () =>
    this.props.toggleMessageType(typ)

  render() {
    const {readyFlag, disabledTypes} = this.props
    return (
      <div style={{
        marginBottom: '1.8em',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {
          msgTypes.map(({desc, type}) => (
            <Button
              disabled={!readyFlag}
              bsSize="small"
              bsStyle={disabledTypes.includes(type) ? 'danger' : 'success'}
              style={{marginRight: '.2em', marginBottom: '.2em'}}
              key={type}
              onClick={this.handleToggleMessage(type)}
            >
              {desc}
            </Button>
          ))
        }
      </div>
    )
  }
}

const Settings = connect(
  createStructuredSelector({
    readyFlag: readySelector,
    disabledTypes: disabledTypesSelector,
  }),
  mapDispatchToProps,
)(SettingsImpl)

export { Settings }
