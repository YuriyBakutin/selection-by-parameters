import getFilterDataByParamName from '@/helpers/getFilterDataByParamName'
import connectFilter from '@/helpers/connectFilter'
import disconnectFilter from '@/helpers/disconnectFilter'
import {
  FilterTypes,
  // IRangeFilterOptions,
  IChoiceFilterData,
  IRangeFilterData,
  // IFilterParams,
  // ILayout,
  IProdData,
  IState,
} from './types'
import state from './state'
import getters from './getters'
import mutations from './mutations'

export default createStore({
  state,
  getters,
  mutations,
  actions: {},
})
