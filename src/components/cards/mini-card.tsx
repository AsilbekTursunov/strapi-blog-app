import { Card, Image, Link, Text } from "@chakra-ui/react"
import { Eye } from "lucide-react"
import moment from "moment"

const MiniCard = ({ id, image, description, date, messages }: { id: string, image: string, description: string, date: string, messages: number }) => {
  return (
    <Card.Root maxW="sm" overflow="hidden" borderWidth={0}>
      <Link href={`/post/${id}`}>
        <Image
          src={image}
          alt="Green double couch with wooden legs"
        /></Link>
      <Card.Body gap="2" border={'none'} padding={0}>
        <Text display={'flex'} gap="2" marginTop={'10px'} alignItems={'center'}>
          <Text fontSize="lg" fontWeight="bold">{moment(date).format('DD.MM.YYYY')}</Text>
          <Text display={'flex'} alignItems={'center'} gap="2" fontSize="sm" color="gray.500">
            <Eye size={16} color="#b3b3b3" />{messages || '0'}
          </Text>
        </Text>
        <Text lineClamp={2}>{description}</Text>
      </Card.Body>
    </Card.Root>
  )
}

export default MiniCard