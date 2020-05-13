import { GlobalState } from './store'

export interface ProcessOpts {
  getState: () => GlobalState
  action: any
}
