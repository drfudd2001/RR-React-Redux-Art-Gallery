import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  objectID: 500,
  apiData: {}
}

// Redux DevTools dispatch examples
//    {type: 'apiData/setData', payload: {'a':'b'}}
//    {type: 'apiData/setID', payload: 5}
//    {type: 'apiData/incrementID'}
//    {type: 'apiData/decrementID'}
//    {type: 'apiData/resetState'}
//

export const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setData: (state, action) => {
      return {...state, apiData: action.payload}
    },
    setID: (state, action) => {
      return {...state, objectID: action.payload}
    },
    incrementID: (state, action) => {
      return {...state, objectID: state.objectID + 1}
    },
    decrementID: (state, action) => {
      return {...state, objectID: state.objectID - 1}
    },
    resetState: (state, action) => {
      return initialState
    }
  }
})

export const fetchData = () => {
  const dataThunk = async (dispatch, getState) => {
    let state = getState()
    console.log(state.data.objectID)
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectID}`)
    const data = await response.json()
    console.log(data)
    dispatch(setData(data))
  }
  return dataThunk
}

export const { setData, setID, incrementID, decrementID, resetState } = apiDataSlice.actions
export default apiDataSlice.reducer