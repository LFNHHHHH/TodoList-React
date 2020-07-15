import React, { Component } from 'react'
import Dbitem from './components/dbitem/dbitem'
import Wcitem from './components/wcitem/wcitem'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { getInputChangeAction, getAddTodoItem, delItem, removeItem, getStorageData } from './store/actionCreators'
import app from './App.module.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // this.handleAddClick = this.props.handleAddClick.bind(this)
    this.handleInputChange = this.props.handleInputChange.bind(this)
    this.handleDelItemClick = this.props.handleDelItemClick.bind(this)
    this.handleRemoveItem = this.props.handleRemoveItem.bind(this)
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
                onKeyUp={this.props.handleEnter.bind(this)}
                value={this.props.inputValue}
                placeholder="Todo"
                type="text"
                className="mr20"
              />
              <button onClick={this.props.handleAddClick.bind(this)}>add</button>
            </div>

            <BrowserRouter>
              <div className={[app.routeSty, 'flex', 'mt20', 'sb'].join(' ')}>
                <Link to="/daiban">代办</Link>
                <Link to="/yiwanc">已完成</Link>
              </div>

              <div className="flexfs w50 mt20 ml50">
                <Switch>
                  <Route path={'/'} exact >
                    <Dbitem itemlist={this.props.itemList} delItem={this.props.handleDelItemClick} />
                  </Route>

                  {/* 待办 */}
                  <Route path={'/daiban'}>
                    <Dbitem itemlist={this.props.itemList} delItem={this.props.handleDelItemClick} />
                  </Route>

                  {/* 已完成 */}
                  <Route path={'/yiwanc'}>
                    <Wcitem wclist={this.props.delItemList} removeItem={this.props.handleRemoveItem} />
                  </Route>

                </Switch>

              </div>
            </BrowserRouter>


          </div>



        </div>
      </div>
    )
  }

  componentDidMount() {  // 生命周期
    this.props.getData()
  }
}


// 连接规则，将 state 数据传给 props
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    itemList: state.itemList,
    delItemList: state.delItemList
  }
}

// 将 store.dispatch 传递给 props
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {  // input 双向同步
      dispatch(getInputChangeAction(e.target.value))  // 通过 action 将数据传给 store ， store 会自动把数据交给 reducer
    },
    getData() {  // 从 localStorage 获取缓存的数据
      dispatch(getStorageData())
    },
    handleAddClick() {  // add
      let inputValue = this.props.inputValue
      if (inputValue.trim() === '') return
      dispatch(getAddTodoItem(inputValue))
    },
    handleEnter(e) {  // enter
      if (e.keyCode !== 13) return
      this.props.handleAddClick.bind(this)()
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
