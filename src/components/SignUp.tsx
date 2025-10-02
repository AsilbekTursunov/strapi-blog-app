import {
  Box,
  Button,
  Field,
  Fieldset,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useEnterForm } from "../hooks/useEnterForm"
import { errorMessage } from "../lib/helpers"
import { PasswordInput } from "./ui/password-input"

const SignUp = ({ onChange, onSuccess }: { onChange: () => void, onSuccess: () => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

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

  const errorMsg = errorMessage(error)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root role="signup_form" size="lg" maxW="full" width={'100%'}>
          <Stack>
            <Fieldset.Legend>Придумай пароль для входа в аккаунт</Fieldset.Legend>
          </Stack>
          <Fieldset.Content width={'100%'}>
            <Field.Root>
              <Field.Label>Имя</Field.Label>
              <Input role="username" {...register('username', { required: 'Введите свое имя' })} name="username" />
              {errors.username && <Text role='error' color="red">{String(errors.username.message)}</Text>}
            </Field.Root>
            <Field.Root>
              <Field.Label>Почта</Field.Label>
              <Input role="email" {...register('email', { required: 'Введите свою почту' })} name="email" type="email" />
              {errors.email && <Text role='error' color="red">{String(errors.email.message)}</Text>}
            </Field.Root>
            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <PasswordInput role="password" {...register('password', { required: 'Введите свой пароль', min: 6 })} name="password" type="password" />
              {errors.password && <Text role='error' color="red">{String(errors.password.message)}</Text>}
            </Field.Root>
          </Fieldset.Content>
          <Button role="signup" colorPalette={'blue'} width={"full"} type="submit" alignSelf="flex-start" loading={isPending}>
            Создать аккаунт
          </Button>
          {!!error && <Text role="register_error" color="red">{errorMsg}</Text>}

        </Fieldset.Root>
      </form>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text textAlign={'center'}>У вас есть аккаунт? </Text>
        <Link role="signin_link" onClick={onChange}>Войти</Link>
      </Box>
    </>
  )
}
export default SignUp
