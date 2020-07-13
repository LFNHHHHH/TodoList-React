import React from 'react'
import app from '../../App.module.css'

class DbItem extends React.Component {
  constructor() {
    super()
    this.state = {
      itemList: []
    }
  }

  render() {
    return (
      this.allDbList()
    )
  }

  allDbList() {
    return (
      <div className={app.minw200}>
        {
          this.props.itemlist.map((item, index) => {
            return (
              <div key={index} className="mt20 fs12 flexc w100">
                <div className="mr20">待完成</div>
                <div
                  onClick={() => this.handleDelItemClickZ(index, item)}
                  className={[app.shou, 'flexcc', 'shenhui'].join(' ')}
                >
                  {item}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  handleDelItemClickZ(index, item) {  // delItem
    this.props.delItem(index, item)
  }
}

export default DbItem;
