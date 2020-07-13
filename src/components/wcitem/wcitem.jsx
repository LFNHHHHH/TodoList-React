import React from 'react'
import app from '../../App.module.css'

class DbItem extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      this.allWcList()
    )
  }

  allWcList() {
    return (
      <div className={['minh900', 'ml50', app.minw200].join(' ')}>
        {
          this.props.wclist.map((item, index) => {
            return (
              <div key={index} className={['flexcfs', app.shou, 'fs12', 'shenhui', 'w100', 'mt20'].join(' ')}>
                <div className="mr20">已完成</div>
                <div onClick={() => this.handleRemoveItem2(index, item)} className={app.huadiao}>{item}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
  handleRemoveItem2(index, item) {
    this.props.removeItem(index, item)
  }
}

export default DbItem
