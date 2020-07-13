import React, { Component } from 'react'
import Dbitem from './components/dbitem/dbitem'
import Wcitem from './components/wcitem/wcitem'

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
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
    let { itemList, delItemList, inputValue } = this.state

    return (
      <div className="hello">
        <h3>TodoList</h3>
        <div className="w100 flexcc">
          <div className="minh900 w100 flexcc col">

            {/* input */}
            <div className="mt20 flexcc">
              <input
                onChange={this.handleInputChange}
                onKeyUp={this.handleEnter}
                value={inputValue}
                placeholder="Todo"
                type="text"
                className="mr20"
              />
              <button onClick={this.handleAddClick} >add</button>
            </div>

            <div className="flexfs jcsa w50 mt40 ml50">

              {/* 待办 */}
              <Dbitem itemlist={itemList} delItem={this.handleDelItemClick} />

              {/* 已完成 */}
              <Wcitem wclist={delItemList} removeItem={this.handleRemoveItem} />

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
    this.setState(() => ({
      itemList: JSON.parse(window.localStorage.getItem('itemList')) ? JSON.parse(window.localStorage.getItem('itemList')) : [],
      delItemList: JSON.parse(window.localStorage.getItem('delItemList')) ? JSON.parse(window.localStorage.getItem('delItemList')) : []
    }))
  }
  handleInputChange(e) {  // input 双向同步
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
  }
  handleAddClick() {  // add
    this.setState((prevState) => {
      let { inputValue } = this.state
      let itemList2 = [inputValue, ...prevState.itemList]
      return ({
        itemList: itemList2,
        inputValue: ''
      })
    }, () => window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList)))
  }
  handleEnter(e) {  // enter
    if (e.keyCode !== 13) return
    this.handleAddClick()
  }
  handleDelItemClick(index, item) {  // delItem
    this.setState((prevState) => {
      let itemList2 = [...prevState.itemList] // 深拷贝
      itemList2.splice(index, 1)

      let delItemList2 = [item, ...prevState.delItemList]

      return ({
        itemList: itemList2,
        delItemList: delItemList2
      })

    }, () => {
      window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList))
      window.localStorage.setItem('delItemList', JSON.stringify(this.state.delItemList))
    })
  }
  handleRemoveItem(index, item) {  // removeItem
    this.setState((prevState) => {
      let delItemList2 = [...prevState.delItemList]
      delItemList2.splice(index, 1)

      let itemList2 = [item, ...prevState.itemList]

      return ({
        delItemList: delItemList2,
        itemList: itemList2
      })
    }, () => {
      window.localStorage.setItem('itemList', JSON.stringify(this.state.itemList))
      window.localStorage.setItem('delItemList', JSON.stringify(this.state.delItemList))
    })
  }

}

export default App;
