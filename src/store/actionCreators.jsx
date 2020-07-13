import {INPUT_VALUE_CHANGE, ADD_TODO_ITEM, DEL_DB_ITEM, REMOVE_WC_ITEM, GET_STORAGE_DATA} from './actionTypes'

export const getInputChangeAction = (value)=>({
    type: INPUT_VALUE_CHANGE,
    value
})

export const getAddTodoItem = (inputValue)=>({
    type: ADD_TODO_ITEM,
    inputValue
})

export const delItem = (index, item)=>({
    type: DEL_DB_ITEM,
    index,
    item
})

export const removeItem = (index, item)=>({
    type: REMOVE_WC_ITEM,
    index,
    item
})

export const getStorageData = ()=>({
    type: GET_STORAGE_DATA
})
