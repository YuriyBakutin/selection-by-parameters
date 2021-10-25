import getFilterDataByParamName from '@/store/helpers/getFilterDataByParamName'
import connectFilter from '@/store/helpers/connectFilter'
import disconnectFilter from '@/store/helpers/disconnectFilter'
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
