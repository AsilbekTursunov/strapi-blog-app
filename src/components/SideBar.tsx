
import { Button, CloseButton, Drawer, Link, Portal, Text } from "@chakra-ui/react"
import { TextAlignJustify } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { tabs } from "../constants"

const SideBar = () => {
  const [open, setOpen] = useState(false)
  const pathname = useLocation().pathname

  return (
    <Drawer.Root placement={'start'} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <Button role="sidebar_trigger" variant="outline" placeContent={'center'} size="sm" display={{ base: 'inline-block', lg: 'none' }}>
          <TextAlignJustify />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner role="sidebar" >
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Text as='nav' display={'flex'} gap={5} flexDirection={'column'}>
                {tabs.map((tab) => (
                  <Link outline={'none'} fontSize={{ base: '10px', lg: '12px', xl: '16px' }} _hover={{ color: 'blue.500' }} textDecoration={'none'} href={`/${tab.id}`} key={tab.id} className={`filterbar-list-item`} color={pathname === `/${tab.id}` ? 'blue.500' : 'gray.500'}>{tab.title}</Link>
                ))}
              </Text>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
export default SideBar
