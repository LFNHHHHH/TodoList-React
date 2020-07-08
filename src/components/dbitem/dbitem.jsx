import React from 'react'
import app from '../../App.module.css'

class DbItem extends React.Component{
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className={app.minw200}>
        {
          this.props.itemlist.map((item, index) => {
            return (
              <div key={index} className="mt20 fs12 flexc w100">
                <div className="mr20">待完成</div>
                <div onClick={this.handleDelItemClick} className={[app.shou, 'flexcc', 'shenhui'].join(' ')}>{item}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default DbItem;
