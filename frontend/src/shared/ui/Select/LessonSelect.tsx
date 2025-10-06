import { CustomSelect, type SelectOption } from './Select'

export interface LessonOption {
  id: string
  title: string
  courseTitle?: string
  orderIndex?: number
}

interface LessonSelectProps {
  value?: LessonOption | null
  onChange: (lesson: LessonOption | null) => void
  options: LessonOption[]
  placeholder?: string
  isDisabled?: boolean
  isLoading?: boolean
}

export function LessonSelect({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select a lesson...',
  isDisabled = false,
  isLoading = false
}: LessonSelectProps) {
  const selectOptions: SelectOption[] = options.map(lesson => ({
    value: lesson.id,
    label: `${lesson.courseTitle} - ${lesson.title} (Order: ${lesson.orderIndex})`,
    ...lesson
  }))

  const selectedValue = value ? {
    value: value.id,
    label: `${value.courseTitle} - ${value.title} (Order: ${value.orderIndex})`,
    ...value
  } : null

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      const lesson: LessonOption = {
        id: option.value,
        title: option.title,
        courseTitle: option.courseTitle,
        orderIndex: option.orderIndex
      }
      onChange(lesson)
    } else {
      onChange(null)
    }
  }

  return (
    <CustomSelect
      value={selectedValue}
      onChange={handleChange}
      options={selectOptions}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={false}
    />
  )
}

