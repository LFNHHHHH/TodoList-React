import React, { Component } from 'react'
import Dbitem from './components/dbitem/dbitem'
import Wcitem from './components/wcitem/wcitem'
import store from './store/index'
import { getInputChangeAction, getAddTodoItem, delItem, removeItem, getStorageData } from './store/actionCreators'

class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(()=>{this.handleStoreChange()})  // 当 store 数据发生变化时调用该函数

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
    store.dispatch(getStorageData())
  }
  handleStoreChange = ()=>{  // 当 store 中数据改变时
    this.setState(store.getState())  // 重新获取 store 中的数据
  }
  handleInputChange(e) {  // input 双向同步
    store.dispatch(getInputChangeAction(e.target.value))  // 通过 action 将数据传给 store ， store 会自动把数据交给 reducer
  }
  handleAddClick() {  // add
    let { inputValue } = this.state
    if (inputValue.trim() === '') return
    store.dispatch(getAddTodoItem(inputValue))
  }
  handleEnter(e) {  // enter
    if (e.keyCode !== 13) return
    this.handleAddClick()
  }
  handleDelItemClick(index, item) {  // delItem
    store.dispatch(delItem(index, item))
  }
  handleRemoveItem(index, item) {  // removeItem
    store.dispatch(removeItem(index, item))
  }

}

export default App;
