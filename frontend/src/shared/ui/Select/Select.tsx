import Select, { type StylesConfig, type SingleValue, type MultiValue } from 'react-select'

export interface SelectOption {
  value: string
  label: string
  [key: string]: any
}

interface BaseSelectProps {
  value?: SelectOption | null
  onChange: (option: SelectOption | null) => void
  options: SelectOption[]
  placeholder?: string
  isDisabled?: boolean
  isClearable?: boolean
  isLoading?: boolean
  className?: string
}

interface SingleSelectProps extends BaseSelectProps {
  isMulti?: false
  onChange: (option: SelectOption | null) => void
}

interface MultiSelectProps extends BaseSelectProps {
  isMulti: true
  onChange: (option: MultiValue<SelectOption>) => void
}

type CustomSelectProps = SingleSelectProps | MultiSelectProps

const customSelectStyles: StylesConfig<SelectOption> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    minHeight: '48px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    ...(state.isFocused && {
      border: '1px solid #667eea',
      backgroundColor: '#1a1a1a',
    }),
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 12px',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
    margin: '0',
    padding: '0',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.6)',
    paddingLeft: '10px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#667eea'
      : state.isFocused 
        ? '#2a2a2a'
        : '#1a1a1a',
    color: 'white',
    borderRadius: '4px',
    margin: '2px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected 
        ? '#667eea'
        : '#2a2a2a',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  }),
}

export function CustomSelect(props: CustomSelectProps) {
  const {
    value,
    onChange,
    options,
    placeholder = 'Select an option...',
    isDisabled = false,
    isClearable = true,
    isLoading = false,
    className = '',
    ...restProps
  } = props

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isLoading={isLoading}
      styles={customSelectStyles}
      className={className}
      {...restProps}
    />
  )
}

