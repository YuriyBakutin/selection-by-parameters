import getFilterDataByParamName from '@/helpers/getFilterDataByParamName'

enum FilterTypes {
  choice = 'choice',
  range = 'range',
}

interface IChoiceFilterData {
  optionsToChoice: { variantName: string, checked: boolean }[]
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
          optionsToChoice: [
            { variantName: 'S', checked: false },
            { variantName: '1к', checked: false },
            { variantName: '2k', checked: false },
            { variantName: '3к', checked: false },
          ],
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
    isFarLeft: (state: IState) => (filterParams: IFilterParams) => {
      const index = state.filters.indexOf(filterParams)

      if (index === -1) {
        return null
      }

      if (index === 0) {
        return true
      }

      return false
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

      return !!(params.data as IChoiceFilterData)?.optionsToChoice.find(
        (variant) => variant.variantName === variantName,
      )?.checked
    },
  },
  mutations: {
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
      )?.data as IChoiceFilterData).optionsToChoice?.find(
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
    setContentBoxSizes(state: IFiltersState, contentElem: HTMLElement) {
      const rect = contentElem.getBoundingClientRect()
      const contentBoxLeft = rect.x
      const contentBoxRight = rect.x + rect.width
      state.layout = { contentBoxRight, contentBoxLeft }
    },
  },
  actions: {},
})

export { FilterTypes, IRangeFilterOptions, IChoiceFilterData, IRangeFilterData, IFilterParams, ILayout, IProdData, IState }
