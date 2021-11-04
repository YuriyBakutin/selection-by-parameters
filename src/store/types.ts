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
  currentMinText?: null | number,
  currentMaxText?: null | number,
  minHandlePercent?: null | number, // 0..100
  maxHandlePercent?: null | number, // 0..100
  connectedMinValue?: null | number,
  connectedMaxValue?: null | number,
}

interface IRangeFilterOptions {
  precision?: null | number,
  multiplier?: null | number,
}

interface IFilterLayout {
  width: number
}

interface IFilter {
  name: string,
  title: string,
  type: FilterTypes,
  data: IChoiceFilterData | IRangeFilterData,
  options?: IRangeFilterOptions,
  layout?: IFilterLayout,
}

interface IContentLayout {
  // contentBoxWidth?: number | null | undefined,
  // contentBoxRight?: number | null | undefined,
  // contentBoxLeft?: number | null | undefined,
  contentBoxRect: DOMRect | null | undefined,
}

interface IProdData {
  [key: string]: number | string,
}

interface IProdState {
  prodData: IProdData[],
}

interface IState {
  filters: IFilter[],
  layout?: IContentLayout,
  prodData: IProdData[],
}

export {
  FilterTypes,
  IRangeFilterOptions,
  IChoiceFilterData,
  IRangeFilterData,
  IFilterLayout,
  IFilter,
  IContentLayout,
  IProdData,
  IState,
}
