import ChoiceFilterWidget from '@/components/FilterChoiceWidget.vue'
import RangeFilterWidget from '@/components/FilterRangeWidget.vue'
import { FilterTypes, } from '../store/types'

export default (type: FilterTypes) => {
  switch (type) {
    case FilterTypes.choice:
      return ChoiceFilterWidget
    case FilterTypes.range:
      return RangeFilterWidget
  }
}