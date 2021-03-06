import { IProdData, FilterTypes, IFilter } from '@/store/types'

export default (Filter: IFilter, data: IProdData[]) => {
  const paramName = Filter.name
  const type = Filter.type

  if (type === FilterTypes.choice) {
    return {
      variants: [
        ...data.reduce((a, dataItem) => a.add(dataItem[paramName]), new Set),
      ].map((variantName) => ({ variantName, checked: false })),
    }
  }
  if (type === FilterTypes.range) {
    const precision = Filter.options?.precision ?? 0
    const multiplier = Filter.options?.multiplier ?? 1
    return data.reduce(
      (a, dataItem) => {
        const value = dataItem[paramName] as number

        if (!a.minValue || a.minValue > value) {
          a.minValue = value
          a.currentMinValue = value
          a.currentMinText = (value * multiplier).toFixed(precision)
          a.minHandlePercent = 0
        }

        if (!a.maxValue || a.maxValue < value) {
          a.maxValue = value
          a.currentMaxValue = value
          a.currentMaxText = (value * multiplier).toFixed(precision)
          a.maxHandlePercent = 100
        }

        return a
      },
      {
        minValue: null as null | number,
        maxValue: null as null | number,
        currentMinValue: null as null | number,
        currentMaxValue: null as null | number,
        currentMinText: null as null | string,
        currentMaxText: null as null | string,
        minHandlePercent: null as null | number,
        maxHandlePercent: null as null | number,
      }
    )
  }
}
