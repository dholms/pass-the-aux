import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import user, { UserState } from './user/reducer'
import track, { TrackState } from './track/reducer'
import logic from './logic'


export type GlobalState = {
  user: UserState
  track: TrackState
}

const reducers = combineReducers({
  user,
  track
})

const logicMiddleware = createLogicMiddleware(logic, {} as any)

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware =  applyMiddleware(
  logicMiddleware
)

const enhancer = composeEnhancers(middleware)

export default createStore(reducers, enhancer)
