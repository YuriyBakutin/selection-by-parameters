import getFilterDataByParamName from '@/helpers/getFilterDataByParamName'
import connectFilter from '@/helpers/connectFilter'
import disconnectFilter from '@/helpers/disconnectFilter'

enum FilterTypes {
  choice = 'choice',
  range = 'range',
}

interface IChoiceFilterData {
  variants: { variantName: string, checked: boolean }[]
  connectedVariants?: (string | number)[]
}

interface IRangeFilterData {
  minValue: null | number,
  maxValue: null | number,
  currentMinValue: null | number,
  currentMaxValue: null | number,
  currentMinValueText?: null | number,
  currentMaxValueText?: null | number,
  minHandlePercent?: null | number, // 0..100
  maxHandlePercent?: null | number, // 0..100
  connectedMinValue?: null | number,
  connectedMaxValue?: null | number,
}

interface IRangeFilterOptions {
  precision?: null | number,
  multiplier?: null | number,
}

interface IFilterParams {
  name: string,
  title: string,
  type: FilterTypes,
  data: IChoiceFilterData | IRangeFilterData,
  options?: IRangeFilterOptions,
}

interface ILayout {
  contentBoxRight: number | null | undefined,
  contentBoxLeft: number | null | undefined,
}

interface IFiltersState {
  filters: IFilterParams[],
  layout: ILayout
}

interface IProdData {
  [key: string]: number | string,
}

interface IProdState {
  prodData: IProdData[],
}

interface IState {
  filters: IFilterParams[],
  layout: ILayout,
  prodData: IProdData[],
}

export default createStore({
  state: {
    filters: [
      {
        name: 'size',
        title: 'КОМНАТЫ',
        type: FilterTypes.choice,
        data: {
          variants: [],
          connectedVariants: [],
        },
      },
      {
        name: 'floor',
        title: 'ЭТАЖ',
        type: FilterTypes.range,
        data: {
          minValue: null,
          maxValue: null,
          currentMinValue: null,
          currentMaxValue: null,
          connectedMinValue: null,
          connectedMaxValue: null,
        },
      },
      {
        name: 'square',
        title: 'Площадь, м²',
        type: FilterTypes.range,
        data: {
          minValue: null,
          maxValue: null,
          currentMinValue: null,
          currentMaxValue: null,
          connectedMinValue: null,
          connectedMaxValue: null,
        },
      },
      {
        name: 'price',
        title: 'СТОИМОСТЬ, млн. р.',
        type: FilterTypes.range,
        data: {
          minValue: null,
          maxValue: null,
          currentMinValue: null,
          currentMaxValue: null,
          connectedMinValue: null,
          connectedMaxValue: null,
        },
        options: {
          precision: 1,
          multiplier: 0.000001,
        },
      },
    ] as IFilterParams[],
    layout: {
      contentBoxRight: null,
      contentBoxLeft: null,
    } as ILayout,
    prodData: [] as IProdData[],
  },
  getters: {
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
    getFilterDataByName: (state: IState, getters) => (filterName: string) => {
      return getters.getFilterParamByName(filterName).data
    },
    getFilterVariantChecked: (state: IState, getters) => (
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
  },
  mutations: {
    connectFilters(state: IState) {
      for (const filter of state.filters) {
        connectFilter(
          filter,
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
          state.prodData,
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
      },
    ) {
      const variant = (state.filters.find(
        (param) => param.name === filterName,
      )?.data as IChoiceFilterData).variants?.find(
        (variant) => variant.variantName === variantName,
      )

      if (variant) {
        variant.checked = checked
      }
    },
    updateProdData(state: IState, prodData: IProdData[]) {
      state.prodData = [...state.prodData, ...prodData]
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
  },
  actions: {},
})

export { FilterTypes, IRangeFilterOptions, IChoiceFilterData, IRangeFilterData, IFilterParams, ILayout, IProdData, IState }
