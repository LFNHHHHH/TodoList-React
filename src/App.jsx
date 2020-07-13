import React from 'react'
import Dbitem from './components/dbitem/dbitem'
import Wcitem from './components/wcitem/wcitem'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      itemList: [],
      delItemList: []
    }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelItemClick = this.handleDelItemClick.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }

  render() {
    return (
      <div className="hello">
        <h3>TodoList</h3>
        <div className="w100 flexcc">
          <div className="minh900 w100 flexcc col">

            {/* input */}
            <div className="mt20 flexcc">
              <input onChange={this.handleInputChange} onKeyUp={this.handleEnter} value={this.state.msg} placeholder="Todo" type="text" className="mr20" />
              <button onClick={this.handleAddClick} >add</button>
            </div>

            <div className="flexfs jcsa w50 mt40 ml50">

              {/* 待办 */}
              <Dbitem itemlist={ this.state.itemList } delItem={ this.handleDelItemClick } />

              {/* 已完成 */}
              <Wcitem wclist={ this.state.delItemList } removeItem={ this.handleRemoveItem } />

            </div>

          </div>



        </div>
      </div>
    )
  }

  componentDidMount() {  // 生命周期
    this.getData()
  }

  getData() {  // 从 localStorage 获取缓存的数据
    this.setState({
      itemList: JSON.parse(window.localStorage.getItem('itemList')) ? JSON.parse(window.localStorage.getItem('itemList')) : [],
      delItemList: JSON.parse(window.localStorage.getItem('delItemList')) ? JSON.parse(window.localStorage.getItem('delItemList')) : []
    })
  }
  handleInputChange(e) {  // input 双向同步
    this.setState({
      msg: e.target.value
    })
  }
  handleAddClick() {  // add
    let itemList2 = this.state.itemList
    itemList2.push(this.state.msg)
    this.setState({
      itemList: itemList2,
      msg: ''
    })
    window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList))
  }
  handleEnter(e) {  // enter
    if (e.keyCode !== 13) return
    this.handleAddClick()
  }
  handleDelItemClick(index, item) {  // delItem
    let itemList2 = this.state.itemList
    itemList2.splice(index, 1)
    this.setState({
      itemList: itemList2
    })

    let delItemList2 = this.state.delItemList
    delItemList2.unshift(item)
    this.setState({
      delItemList: delItemList2
    })

    window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList))
    window.localStorage.setItem('delItemList', JSON.stringify(this.state.delItemList))
  }
  handleRemoveItem(index, item) {  // removeItem
    let delItemList2 = this.state.delItemList
    delItemList2.splice(index, 1)
    this.setState({
      delItemList: delItemList2
    })

    let itemList2 = this.state.itemList
    itemList2.unshift(item)
    this.setState({
      itemList: itemList2
    })

    window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList))
    window.localStorage.setItem('delItemList', JSON.stringify(this.state.delItemList))
  }

}

export default App;
