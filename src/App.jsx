import React, { Component } from 'react'
import Dbitem from './components/dbitem/dbitem'
import Wcitem from './components/wcitem/wcitem'
import { connect } from 'react-redux'
import { getInputChangeAction, getAddTodoItem, delItem, removeItem, getStorageData } from './store/actionCreators'

class App extends Component {
  constructor() {
    super()
    this.state = {}

    // this.handleAddClick = this.handleAddClick.bind(this)
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleDelItemClick = this.handleDelItemClick.bind(this)
    // this.handleEnter = this.handleEnter.bind(this)
    // this.handleRemoveItem = this.handleRemoveItem.bind(this)
  }


  render() {
    return (
      <div className="hello">
        <h3>TodoList</h3>
        <div className="w100 flexcc">
          <div className="minh900 w100 flexcc col">

            {/* input */}
            <div className="mt20 flexcc">
              <input
                onChange={this.props.handleInputChange}
                onKeyUp={this.handleEnter}
                value={this.props.inputValue}
                placeholder="Todo"
                type="text"
                className="mr20"
              />
              <button onClick={this.handleAddClick} >add</button>
            </div>

            <div className="flexfs jcsa w50 mt40 ml50">

              {/* 待办 */}
              <Dbitem itemlist={this.props.itemList} delItem={this.props.handleDelItemClick} />

              {/* 已完成 */}
              <Wcitem wclist={this.props.delItemList} removeItem={this.props.handleRemoveItem} />

            </div>

          </div>



        </div>
      </div>
    )
  }

  componentDidMount() {  // 生命周期
    console.log('1')
    console.log(this.props)
    this.props.getData()
    console.log('2')
  }
}


// 连接规则，将 state 数据传给 props
const mapStateToProps = (state)=>{
  return {
      inputValue: state.inputValue,
      itemList: state.itemList,
      delItemList: state.delItemList
  }
}

// 将 store.dispatch 传递给 props
const mapDispatchToProps = (dispatch)=>{
  return {
      handleInputChange(e) {  // input 双向同步
        // console.log(e)
        dispatch(getInputChangeAction(e.target.value))  // 通过 action 将数据传给 store ， store 会自动把数据交给 reducer
      },
      getData() {  // 从 localStorage 获取缓存的数据
        dispatch(getStorageData())
      },
      handleAddClick() {  // add
        let { inputValue } = this.props
        if (inputValue.trim() === '') return
        dispatch(getAddTodoItem(inputValue))
      },
      handleEnter(e) {  // enter
        if (e.keyCode !== 13) return
        this.props.handleAddClick()
      },
      handleDelItemClick(index, item) {  // delItem
        dispatch(delItem(index, item))
      },
      handleRemoveItem(index, item) {  // removeItem
        dispatch(removeItem(index, item))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
