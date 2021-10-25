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

export { FilterTypes, IRangeFilterOptions, IChoiceFilterData, IRangeFilterData, IFilterParams, ILayout, IProdData, IState, }
