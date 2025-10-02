
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const CustomPaginate = ({ count, pageSize, page = 1, onPrev, onNext, onSelect }: { count: number, pageSize: number, page?: number, onPrev?: () => void, onNext?: () => void, onSelect?: (page: number) => void }) => {
  return (
    <Pagination.Root display={count > pageSize ? 'block' : 'none'} justifyContent={'center'} count={count} pageSize={pageSize} page={page}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton role="prev" onClick={onPrev}>
            <ArrowLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(avtivePage) => (
            <IconButton role={page == avtivePage.value ? 'active' : `page`} variant={{ base: "ghost", _selected: "outline" }} onClick={() => onSelect?.(avtivePage.value)}>
              {avtivePage.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton role='next' onClick={onNext}>
            <ArrowRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

export default CustomPaginate

