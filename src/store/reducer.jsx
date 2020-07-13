import { INPUT_VALUE_CHANGE, ADD_TODO_ITEM, DEL_DB_ITEM, REMOVE_WC_ITEM, GET_STORAGE_DATA } from './actionTypes'
const defaultState = {
  inputValue: '',
  itemList: [],
  delItemList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_STORAGE_DATA: // 获取本地数据
      state.itemList = JSON.parse(window.localStorage.getItem('itemList')) ? JSON.parse(window.localStorage.getItem('itemList')) : []
      state.delItemList = JSON.parse(window.localStorage.getItem('delItemList')) ? JSON.parse(window.localStorage.getItem('delItemList')) : []
      console.log(state)
      return state

    case INPUT_VALUE_CHANGE: // 同步输入框
      state.inputValue = action.value
      return state

    case ADD_TODO_ITEM: // 添加项目
      state.itemList = [action.inputValue, ...state.itemList]
      state.inputValue = ''
      window.localStorage.setItem('itemList', JSON.stringify(state.itemList))
      return state

    case DEL_DB_ITEM: // 删除代办项目
      let itemList2 = [...state.itemList]
      itemList2.splice(action.index, 1)
      state.itemList = itemList2
      state.delItemList = [action.item, ...state.delItemList]
      window.localStorage.setItem('itemList', JSON.stringify(itemList2))
      window.localStorage.setItem('delItemList', JSON.stringify(state.delItemList))
      return state

    case REMOVE_WC_ITEM: // 移除已完成项目
      let delItemList2 = [...state.delItemList]
      delItemList2.splice(action.index, 1)
      let itemList3 = [action.item, ...state.itemList]
      state.delItemList = delItemList2
      state.itemList = itemList3
      window.localStorage.setItem('itemList', JSON.stringify(itemList3))
      window.localStorage.setItem('delItemList', JSON.stringify(delItemList2))
      return state

    default:
      return state;
  }
}