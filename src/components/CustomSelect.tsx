
import { Portal, Select, type SelectRootProps } from "@chakra-ui/react"

const CustomSelect = ({ title, ...props }: { title: string } & SelectRootProps) => {

  return (
    <Select.Root size="sm" width="320px" {...props}  >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={title} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {props.collection.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default CustomSelect

