import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Grid,
  Image,
} from '@chakra-ui/react';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight={'600'} fontSize={'lg'} mb={2} color="gray.700">
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={'gray.50'}
      color={'gray.700'}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Grid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          gap={8}
        >
          <Stack gap={'10px'}>
            <Box>
              <Image src="/images/logo.png" width={'100px'} fit={'cover'} />
            </Box>
            <Text fontSize={'sm'} maxW="300px" lineHeight={1.6}>
              Помощник в публикации статей, журналов.
              <br />
              Список популярных международных конференций.
              <br />
              Всё для студентов и преподавателей.
            </Text>
          </Stack>

          <Stack align={'flex-start'} gap={'10px'}>
            <ListHeader>Ресурсы</ListHeader>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Статьи
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Журналы
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Газеты
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Диплом
            </Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>О нас</ListHeader>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Контакты
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Помощь
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Заявки
            </Link>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Политика
            </Link>
          </Stack>

          <Stack align={'flex-start'} gap={'10px'}>
            <ListHeader>Помощь</ListHeader>
            <Link href={'#'} fontSize="sm" _hover={{ color: 'blue.500' }}>
              Часто задаваемые
              <br />
              вопросы
            </Link>
          </Stack>
        </Grid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          alignItems={{ base: 'center', md: 'center' }}
        >
          <Text fontSize={'sm'} color="gray.500">
            Copyright © 2020. LogoIpsum. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}