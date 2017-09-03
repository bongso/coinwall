import {combineReducers} from 'redux'
import {bitStreamReducer as bit} from 'bit-stream'
import {RootState} from '../@types/store'

export const reducer = combineReducers<RootState>({
  bit
})
