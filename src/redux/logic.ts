import userLogic from './user/logic'
import roomLogic from './room/logic'

export default [
  ...userLogic,
  ...roomLogic,
] as any
