import userLogic from './user/logic'
import trackLogic from './track/logic'
import roomLogic from './room/logic'

export default [
  ...userLogic,
  ...trackLogic,
  ...roomLogic,
] as any
