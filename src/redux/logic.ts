import trackLogic from './track/logic'
import roomLogic from './room/logic'

export default [
  ...trackLogic,
  ...roomLogic,
] as any
