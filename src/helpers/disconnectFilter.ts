import { FilterTypes, IFilterParams, IRangeFilterData, IChoiceFilterData, } from '@/store/types'

export default (filter: IFilterParams) => {
  const type = filter.type

  if (type === FilterTypes.choice) {
    const data = filter.data as IChoiceFilterData

    const allUnchecked = !data.variants.reduce(
      (a, variant) => a = a || variant.checked, false
    )

    data.connectedVariants = []
  }

  if (type === FilterTypes.range) {
    const data = filter.data as IRangeFilterData

    data.connectedMinValue = data.minValue
    data.connectedMaxValue = data.maxValue
  }
}