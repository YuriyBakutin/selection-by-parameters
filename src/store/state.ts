import {
  FilterTypes,
  // IRangeFilterOptions,
  // IChoiceFilterData,
  // IRangeFilterData,
  IFilterParams,
  ILayout,
  IProdData,
  // IState,
} from './types'

export default {
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
}
