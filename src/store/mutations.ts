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

export default {
  connectFilters(state: IState) {
    for (const filter of state.filters) {
      connectFilter(
        filter
      )
    }
  },
  setCurrentValue(state: IState, {
    target,
    filterName,
    value,
  }: {
    target: 'currentMaxValue' | 'currentMinValue' | 'currentMaxValueText' | 'currentMinValueText',
    filterName: string,
    value: number,
  }) {
    const filter = state.filters.find((param) => param.name === filterName)
    if (filter?.type === FilterTypes.range) {
      (filter.data as IRangeFilterData)[target] = value
    }
  },
  setFilterData(state: IState, {
    filterName,
    filterData,
  }: {
    filterName: string,
    filterData: IChoiceFilterData | IRangeFilterData,
  }) {
    const filter = state.filters.find((param) => param.name === filterName)

    if (filter) {
      filter.data = filterData
    }
  },
  initFilters(state: IState) {
    for (const filter of state.filters) {
      disconnectFilter(filter)
      const data = getFilterDataByParamName(
        filter,
        state.prodData
      ) as IChoiceFilterData | IRangeFilterData

      if (data) {
        filter.data = data
      }
    }
  },
  setFilterVariantChecked(
    state: IState,
    {
      filterName,
      variantName,
      checked,
    }: {
      filterName: string,
      variantName: string,
      checked: boolean,
    }
  ) {
    const variant = (state.filters.find(
      (param) => param.name === filterName
    )?.data as IChoiceFilterData).variants?.find(
      (variant) => variant.variantName === variantName
    )

    if (variant) {
      variant.checked = checked
    }
  },
  updateProdData(state: IState, prodData: IProdData[]) {
    state.prodData = [...state.prodData, ...prodData,]
  },
  clearProdData(state: IState) {
    state.prodData = []
  },
  // setContentBoxSizes(state: IFiltersState, contentElem: HTMLElement) {
  //   const rect = contentElem.getBoundingClientRect()
  //   const contentBoxLeft = rect.x
  //   const contentBoxRight = rect.x + rect.width
  //   state.layout = { contentBoxRight, contentBoxLeft }
  // },
}