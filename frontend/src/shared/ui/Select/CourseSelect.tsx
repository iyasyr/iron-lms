import { CustomSelect, type SelectOption } from './Select'

export interface CourseOption {
  id: string
  title: string
  description?: string
}

interface CourseSelectProps {
  value?: CourseOption | null
  onChange: (course: CourseOption | null) => void
  options: CourseOption[]
  placeholder?: string
  isDisabled?: boolean
  isLoading?: boolean
}

export function CourseSelect({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select a course...',
  isDisabled = false,
  isLoading = false
}: CourseSelectProps) {
  const selectOptions: SelectOption[] = options.map(course => ({
    value: course.id,
    label: course.title,
    ...course
  }))

  const selectedValue = value ? {
    value: value.id,
    label: value.title,
    ...value
  } : null

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      const course: CourseOption = {
        id: option.value,
        title: option.label,
        description: option.description
      }
      onChange(course)
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

