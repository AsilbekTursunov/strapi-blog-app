import {
  Button,
  Fieldset,
  Input,
  Stack,
  Text,
  Link,
  Field
} from "@chakra-ui/react"
import { useEnterForm } from "../hooks/useEnterForm"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./ui/password-input"
import { useEffect } from "react"

const SignIn = ({ onChange, onSuccess }: { onChange: () => void, onSuccess: () => void }) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      identifier: '',
      password: ''
    }
  })
  // Login
  const { mutate, isPending, error, isSuccess } = useEnterForm({ url: 'local', method: 'POST' })
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
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend textAlign={'center'}>Войти в аккаунт</Fieldset.Legend>
          </Stack>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Почта</Field.Label>
              <Input  {...register('identifier', { required: 'Введите свой адрес электронной почты' })} name="identifier" />
              {errors.identifier && <Text color="red">{errors.identifier.message}</Text>}
            </Field.Root>
            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <PasswordInput  {...register('password', { required: 'Введите свой пароль' })} name="password" type="password" />
              {errors.password && <Text color="red">{errors.password.message}</Text>}
            </Field.Root>
          </Fieldset.Content>
          <Button colorPalette={'blue'} type="submit" alignSelf="flex-start" width={'100%'} loading={isPending}>
            Войти
          </Button>
          {error && <Text color="red">{error.message}</Text>}
        </Fieldset.Root>
      </form>
      <Text textAlign={'center'}>У вас нет аккаунта? <Link onClick={onChange}>Зарегистрироваться</Link></Text>
    </>
  )
}
export default SignIn
