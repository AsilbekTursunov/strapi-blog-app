import { Controller, useForm } from "react-hook-form"
import CustomContainer from "../components/CustomContainer"
import { Box, Input, Stack, Button, Field, createListCollection, Image, FileUpload } from "@chakra-ui/react"
import { DatePicker } from "react-widgets"
import { Calendar } from "lucide-react"
import CustomSelect from "../components/CustomSelect"
import MultipleInput from "../components/MultipleInput"
import { PasswordInput } from "../components/ui/password-input"
import { z } from "zod"
import { LuFileImage } from "react-icons/lu"

const gender = createListCollection({
  items: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
})

const skills = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Node", value: "node" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "c#" },
    { label: "C++", value: "c++" },
    { label: "C", value: "c" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" },
    { label: "Bootstrap", value: "bootstrap" },
    { label: "Tailwind", value: "tailwind" },
  ],
})

const role = createListCollection({
  items: [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Guest", value: "guest" },
  ],
})


const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  birthday: z.date(),
  gender: z.string(),
  phone: z.array(z.string()),
  passportseries: z.string(),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  role: z.string(),
  skills: z.array(z.string()),
  numberOfCars: z.array(z.string()),
  image: z.instanceof(File),
})



const FormPage = () => {
  const { register, handleSubmit, setError, formState: { defaultValues, errors }, control, reset } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: new Date(),
      gender: "",
      phone: [],
      passportseries: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      skills: [],
      numberOfCars: [],
      image: undefined,
    },
  })

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" })
      return
    }
    console.log(data)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };
  return (
    <CustomContainer>

      <Box width={'full'} marginY={5} spaceY={5}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack gap="4" align="flex-start" >

            {/* profile image upload */}
            <Field.Root invalid={!!errors.image} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row-reverse' }} gap={2}>
              <Controller
                control={control}
                name="image"
                rules={{ required: "Image is required" }}
                render={({ field }) => (
                  <Box display={'flex'} width={'full'} alignItems={'center'} gap={2}>
                    <Image src={field.value ? URL.createObjectURL(field.value) : "/images/user.png"} width={100} height={100} borderRadius="full" />
                    <FileUpload.Root accept="image/*" flex={1}>
                      <FileUpload.HiddenInput {...register('image')} type='file' name='image' onChange={(value) => field.onChange(value.target.files?.[0])} />
                      <FileUpload.Trigger asChild>
                        <Button variant="ghost" border={'1px solid rgb(214, 214, 214)'} borderRadius={'10px'}>
                          Upload Images
                        </Button>
                      </FileUpload.Trigger>
                    </FileUpload.Root>
                  </Box>
                )}
              />
              <Field.ErrorText>{String(errors?.image?.message)}</Field.ErrorText>
            </Field.Root>
            {/* first name */}
            <Field.Root invalid={!!errors.firstName} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>First name</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <Input placeholder={'Firstname'} type="text" width={'full'} {...register("firstName", { required: "First name is required" })} name="firstName" />
                <Field.ErrorText>{String(errors?.firstName?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>

            {/* last name */}
            <Field.Root invalid={!!errors.lastName} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Last name</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <Input placeholder={'Lastname'} type="text" width={'full'} {...register("lastName", { required: "Last name is required" })} name="lastName" />
                <Field.ErrorText>{String(errors?.lastName?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>

            {/* birthday */}
            <Field.Root invalid={!!errors.birthday} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Birthday</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }}>
                <Controller
                  control={control}
                  name="birthday"
                  rules={{ required: "Birthday is required" }}
                  render={({ field }) => (
                    <DatePicker
                      className="react-datepicker-wrapper"
                      name={field.name}
                      placeholder="Birthday"
                      value={new Date(field.value)}
                      onSelect={(value) => field.onChange(value)}
                      style={{ width: '100%' }}
                      valueFormat={{ dateStyle: "medium" }}
                      selectIcon={<Calendar style={{ color: '#4887fa' }} />}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.birthday?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            {/* gender */}
            <Field.Root invalid={!!errors.gender} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Gender</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: "Gender is required" }}
                  name="gender"
                  render={({ field }) => (
                    <CustomSelect
                      title="Gender"
                      name={field.name}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val.value[0])} // val array bo‘ladi
                      collection={gender}
                      width={'full'}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.gender?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            {/* phones */}
            <Field.Root invalid={!!errors.phone} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Phones</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }} >
                <Controller
                  control={control}
                  rules={{ required: "Phone is required" }}
                  name="phone"
                  render={({ field }) => (
                    <MultipleInput
                      name={field.name}
                      value={field.value}
                      placeholder="Enter phone number"
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.phone?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            {/* email */}
            <Field.Root invalid={!!errors.email} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Email</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <Input placeholder="Enter email" type="email" width={'full'} {...register("email", { required: "Email is required" })} name="email" />
                <Field.ErrorText>{String(errors?.email?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>
            {/* password */}
            <Field.Root invalid={!!errors.password} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Password</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <PasswordInput placeholder="Enter password" type="password" width={'full'} {...register("password", { required: "Password is required" })} name="password" />
                <Field.ErrorText>{String(errors?.password?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>
            {/* confirm password */}
            <Field.Root invalid={!!errors.confirmPassword} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Confirm Password</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <PasswordInput placeholder="Enter confirm password" border={defaultValues?.confirmPassword === defaultValues?.password ? "" : "1px solid red"} type="password" width={'full'} {...register("confirmPassword", { required: "Confirm Password is required" })} name="confirmPassword" />
                <Field.ErrorText>{String(errors?.confirmPassword?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>
            {/* passport series */}
            <Field.Root invalid={!!errors.passportseries} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Passport series</Field.Label>
              <Box width={{ base: 'full', md: '80%' }}>
                <Input placeholder="Enter passport series" type="text" width={'full'} {...register("passportseries", { required: "Passport series is required" })} name="passportseries" />
                <Field.ErrorText>{String(errors?.passportseries?.message)}</Field.ErrorText>
              </Box>
            </Field.Root>
            {/* skill sets */}
            <Field.Root invalid={!!errors.skills} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Skills set</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: "Skills is required" }}
                  name="skills"
                  render={({ field }) => (
                    <CustomSelect
                      title="Skills"
                      multiple
                      name={field.name}
                      value={field.value}
                      onValueChange={(val) => field.onChange(val.value)} // val array bo‘ladi
                      collection={skills}
                      width={'full'}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.skills?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            {/* role */}
            <Field.Root invalid={!!errors.role} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Role</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: "Role is required" }}
                  name="role"
                  render={({ field }) => (
                    <CustomSelect
                      title="Role"
                      name={field.name}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val.value[0])} // val array bo‘ladi
                      collection={role}
                      width={'full'}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.role?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            <Field.Root invalid={!!errors.numberOfCars} width="full" display={'flex'} alignItems={'center'} flexDirection={{ base: 'column', md: 'row' }} gap={2}>
              <Field.Label fontSize={{ base: 'sm', md: 'md' }} width={{ base: 'full', md: '20%' }}>Number of cars</Field.Label>
              <Stack width={{ base: 'full', md: '80%' }}>
                <Controller
                  control={control}
                  rules={{ required: "Number of cars is required" }}
                  name="numberOfCars"
                  render={({ field }) => (
                    <MultipleInput
                      name={field.name}
                      value={field.value}
                      placeholder="Enter number of cars"
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                <Field.ErrorText>{String(errors?.numberOfCars?.message)}</Field.ErrorText>
              </Stack>
            </Field.Root>
            <Box display={'flex'} gap={2} width={'full'} justifyContent={'flex-end'}>
              <Button onClick={() => reset()} color="blue.500" variant={'outline'} type="reset">Reset</Button>
              <Button colorPalette="blue" variant={'solid'} onClick={handleSubmit(onSubmit)} type="submit">Submit</Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </CustomContainer >
  )
}

export default FormPage