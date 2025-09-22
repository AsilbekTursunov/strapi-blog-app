
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const CustomPaginate = ({ count, pageSize, page = 1, onPrev, onNext, onSelect }: { count: number, pageSize: number, page?: number, onPrev?: () => void, onNext?: () => void, onSelect?: (page: number) => void }) => {
  return (
    <Pagination.Root display={count > pageSize ? 'block' : 'none'} justifyContent={'center'} count={count} pageSize={pageSize} page={page}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton onClick={onPrev}>
            <ArrowLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => onSelect?.(page.value)}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton onClick={onNext}>
            <ArrowRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

export default CustomPaginate

