import { Box, Button, Flex, Input, Tag } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface MultipleInputProps {
  placeholder: string
  name: string
  onChange: (selected: string[]) => void,
  value: string[],
  role?: string
}

const MultipleInput = ({ placeholder, name, onChange, value, role }: MultipleInputProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  return (
    <Box display={"flex"} alignItems={{ base: "flex-start", md: "center" }} gap={2} width={"full"}>
      <Box width={"full"} border={"1px solid #e8e8e8"} borderRadius={"md"} flexDirection={{ base: "column", md: "row" }} display={'flex'} alignItems={'center'} padding={{ base: '3px', md: '0px 4px' }}>
        <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }}>
          {value.map((chip, index) => (
            <Tag.Root role='tag_block' key={index}>
              <Tag.Label padding={'2'} height={'fit-content'} whiteSpace={'nowrap'}>{chip}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger role={`tag_${chip}`} cursor={'pointer'} onClick={() => {
                  // setSelected(value.filter((item) => item !== chip))
                  onChange(value.filter((item) => item !== chip))
                }} />
              </Tag.EndElement>
            </Tag.Root>
          ))}
        </Flex>
        <Input role={role ? `${role}_input` : 'multiple_input'} type='tel' padding={1} value={inputValue} name={name} placeholder={placeholder} border={"none"} outline={"none"} width={"full"} onChange={(e) => setInputValue(e.target.value)} />
      </Box>
      <Button role={role ? `${role}_add_button` : 'add_button'} onClick={() => {
        if (inputValue.trim()) {
          onChange([...value, inputValue])
          setInputValue("")
        }
        // setSelected(prev => [...prev, inputValue])
      }} variant={"outline"}>
        <Plus size={16} color="#4887fa" />
      </Button>
    </Box>
  )
}

export default MultipleInput