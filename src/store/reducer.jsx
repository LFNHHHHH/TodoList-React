import { INPUT_VALUE_CHANGE, ADD_TODO_ITEM, DEL_DB_ITEM, REMOVE_WC_ITEM, GET_STORAGE_DATA } from './actionTypes'
const defaultState = {
  inputValue: 'hahaha',
  itemList: [1,2,3],
  delItemList: [4,5,6]
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_STORAGE_DATA: // 获取本地数据
      let newState1 = {...state}
      newState1.itemList = JSON.parse(window.localStorage.getItem('itemList')) ? JSON.parse(window.localStorage.getItem('itemList')) : []
      newState1.delItemList = JSON.parse(window.localStorage.getItem('delItemList')) ? JSON.parse(window.localStorage.getItem('delItemList')) : []
      return newState1

    case INPUT_VALUE_CHANGE: // 同步输入框
      let newState2 = {...state}
      newState2.inputValue = action.value
      return newState2

    case ADD_TODO_ITEM: // 添加项目
      let newState3 = {...state}
      newState3.itemList = [action.inputValue, ...state.itemList]
      newState3.inputValue = ''
      window.localStorage.setItem('itemList', JSON.stringify(newState3.itemList))
      return newState3

    case DEL_DB_ITEM: // 删除代办项目
      let newState4 = {...state}
      let itemList2 = [...newState4.itemList]
      itemList2.splice(action.index, 1)
      newState4.itemList = itemList2
      newState4.delItemList = [action.item, ...newState4.delItemList]
      window.localStorage.setItem('itemList', JSON.stringify(itemList2))
      window.localStorage.setItem('delItemList', JSON.stringify(newState4.delItemList))
      return newState4

    case REMOVE_WC_ITEM: // 移除已完成项目
      let newState5 = {...state}
      let delItemList2 = [...newState5.delItemList]
      delItemList2.splice(action.index, 1)
      let itemList3 = [action.item, ...newState5.itemList]
      newState5.delItemList = delItemList2
      newState5.itemList = itemList3
      window.localStorage.setItem('itemList', JSON.stringify(itemList3))
      window.localStorage.setItem('delItemList', JSON.stringify(delItemList2))
      return newState5

    default:
      return state;
  }
}