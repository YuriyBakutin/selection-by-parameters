import { FilterTypes, IFilter, IRangeFilterData, IChoiceFilterData } from '@/store/types'

export default (filter: IFilter) => {
  const type = filter.type

  if (type === FilterTypes.choice) {
    const data = filter.data as IChoiceFilterData

    const allUnchecked = !data.variants.reduce(
      (a, variant) => a = a || variant.checked, false
    )

    data.connectedVariants = data.variants.reduce(
      (a, variant) => {
        if (variant.checked || allUnchecked) {
          a.push(variant.variantName)
        }

        return a
      }, [] as string[]
    )
  }

  if (type === FilterTypes.range) {
    const data = filter.data as IRangeFilterData

    data.connectedMinValue = data.currentMinValue
    data.connectedMaxValue = data.currentMaxValue
  }
}
