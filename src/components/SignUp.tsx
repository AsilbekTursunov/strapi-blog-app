import {
  Button,
  Field,
  Fieldset,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./ui/password-input"
import { useEnterForm } from "../hooks/useEnterForm"
import { useEffect } from "react"

const SignUp = ({ onChange, onSuccess }: { onChange: () => void, onSuccess: () => void }) => {
  const { register, handleSubmit, reset } = useForm()

  // Register
  const { mutate, isPending, error, isSuccess } = useEnterForm({ url: 'local/register', method: 'POST' })

  const onSubmit = (data: any) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
      reset()
    }
  }, [isSuccess])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="lg" maxW="full" width={'100%'}>
          <Stack>
            <Fieldset.Legend>Придумай пароль для входа в аккаунт</Fieldset.Legend>
          </Stack>
          <Fieldset.Content width={'100%'}>
            <Field.Root>
              <Field.Label>Имя</Field.Label>
              <Input {...register('username', { required: 'Введите свое имя' })} name="username" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Почта</Field.Label>
              <Input {...register('email', { required: 'Введите свою почту' })} name="email" type="email" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <PasswordInput {...register('password', { required: 'Введите свой пароль' })} name="password" type="password" />
            </Field.Root>
          </Fieldset.Content>
          <Button colorPalette={'blue'} width={"full"} type="submit" alignSelf="flex-start" loading={isPending}>
            Создать аккаунт
          </Button>
          {error && <Text color="red">{error.message}</Text>}

        </Fieldset.Root>
      </form>
      <Text textAlign={'center'}>У вас есть аккаунт? <Link onClick={onChange}>Войти</Link></Text>
    </>
  )
}
export default SignUp
