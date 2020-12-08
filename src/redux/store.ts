import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, RouterState, routerMiddleware } from 'connected-react-router'
import history from './history'
import { createLogicMiddleware } from 'redux-logic'
import user, { UserState } from './user/reducer'
import room, { RoomState } from './room/reducer'
import logic from './logic'


export type GlobalState = {
  user: UserState
  room: RoomState
  router: RouterState
}

const reducers = combineReducers({
  user,
  room,
  router: connectRouter(history)
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = applyMiddleware(
  createLogicMiddleware(logic, {} as any),
  routerMiddleware(history)
)

const enhancer = composeEnhancers(middleware)

export default createStore(reducers, enhancer)
