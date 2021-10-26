import {
  FilterTypes,
  IRangeFilterOptions,
  IChoiceFilterData,
  IRangeFilterData,
  IFilter,
  ILayout,
  IProdData,
  IState,
} from './types'

const getters = {
  getFilteredProdData: (state: IState) => {
    return state.prodData.filter((prodDataItem) => {
      const filters = state.filters

      for (const prodDataItemKey in prodDataItem) {
        const filter = filters.find((filter) => filter.name === prodDataItemKey)

        if (filter) {
          if (filter.type === FilterTypes.choice) {
            const filterData = filter.data as IChoiceFilterData

            if (
              filterData.connectedVariants
              && !filterData.connectedVariants.includes(prodDataItem[prodDataItemKey])
            ) {
              return false
            }
          } else {
            const filterData = filter.data as IRangeFilterData

            if (
              filterData.connectedMaxValue
              && prodDataItem[prodDataItemKey] > filterData.connectedMaxValue
            ) {
              return false
            }
            if (
              filterData.connectedMinValue
              && prodDataItem[prodDataItemKey] < filterData.connectedMinValue
            ) {
              return false
            }
          }
        }
      }

      return true
    })
  },
  getFilterParamByName: (state: IState) => (filterName: string) => {
    return state.filters.find((param) => param.name === filterName)
  },
  getFilterDataByName: (state: IState, getters: any) => (filterName: string) => {
    return getters.getFilterParamByName(filterName).data
  },
  getFilterVariantChecked: (state: IState, getters: any) => (
    filterName: string,
    variantName: string,
  ) => {
    const params = getters.getFilterParamByName(filterName)
    if (!params) {
      return false
    }

    return !!(params.data as IChoiceFilterData)?.variants.find(
      (variant) => variant.variantName === variantName,
    )?.checked
  },
}

export default getters