import {combineReducers} from 'redux'
import {bitStreamReducer as bit} from 'bit-stream'

export const reducer = combineReducers<RootState>({
  bit
})
