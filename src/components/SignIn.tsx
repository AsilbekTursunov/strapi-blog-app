import {
  Box,
  Button,
  Field,
  Fieldset,
  Input,
  Link,
  Stack,
  Text
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useEnterForm } from "../hooks/useEnterForm"
import { errorMessage } from "../lib/helpers"
import { PasswordInput } from "./ui/password-input"

const SignIn = ({ onChange, onSuccess }: { onChange: () => void, onSuccess: () => void }) => {
  const { register, formState: { errors, }, handleSubmit, reset, watch } = useForm({
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
    console.log(error)
  }, [isSuccess, error])

  const errorMsg = errorMessage(error)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root role="signin_form">
          <Stack>
            <Fieldset.Legend textAlign={'center'}>Войти в аккаунт</Fieldset.Legend>
          </Stack>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Почта</Field.Label>
              <Input type="email" role="identifier" {...register('identifier', { required: 'Введите свой адрес электронной почты' })} name="identifier" />
              {errors.identifier && <Text color="red">{errors.identifier.message}</Text>}
            </Field.Root>
            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <PasswordInput role="password" {...register('password', { required: 'Введите свой пароль' })} name="password" type="password" />
              {errors.password && <Text color="red">{errors.password.message}</Text>}
            </Field.Root>
          </Fieldset.Content>
          <Button role="signin_submit" disabled={watch('identifier') && watch('password') ? false : true} colorPalette={'blue'} type="submit" alignSelf="flex-start" width={'100%'} loading={isPending}>
            Войти
          </Button>
          {!!error && <Text role="login_error" color="red">{errorMsg}</Text>}
        </Fieldset.Root>
      </form>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text textAlign={'center'}>У вас нет аккаунта? <Link role="signup_link" onClick={onChange}>Зарегистрироваться</Link></Text>
      </Box>
    </>
  )
}
export default SignIn
