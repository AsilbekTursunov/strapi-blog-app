import { useAppSelector } from '../hooks/useStoreSelector'
import { Box, Button, CloseButton, Dialog, FileUpload, Image, Input, Portal, Text } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { LuFileImage } from 'react-icons/lu'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useCreateBlog } from '../hooks/useGetBlogs';
import z from 'zod';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.instanceof(File),
})


const CreateBlog = () => {
  const { user } = useAppSelector((state) => state.user)
  const { register, formState: { errors }, reset, handleSubmit, control } = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      title: '',
      description: '',
      image: undefined
    }
  })
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<any>(null)
  const [description, setDescription] = useState('')
  const [required, setRequired] = useState(false)

  const { mutate: createBlog, isPending, isSuccess } = useCreateBlog()

  const onSubmit = (data: z.infer<typeof postSchema>) => {
    createBlog({
      ...data,
      author: user?.id,
    })

  }
  useEffect(() => {
    if (isSuccess) {
      setImage(null)
      setDescription('')
      reset()
      setOpen(false)
    }
  }, [isSuccess])

  return (
    <Dialog.Root closeOnInteractOutside={true} open={open} size="xl" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button role='openModal' variant="outline" size="sm" onClick={() => setOpen(true)} >
          <Plus size={4} />
          <Text>
            Создать
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content role='createBlog' maxH={'90%'} position={'relative'}>
            <Dialog.Header>
              <Dialog.Title>Создание статьи</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body overflow={'auto'}>
              <Box onSubmit={handleSubmit(onSubmit)} as="form" display={'flex'} flexDirection={'column'} gap={5}>
                <Box as="label">
                  <Text marginY={2}>Название</Text>
                  <Input role="title" type="text" placeholder='Название' {...register('title', { required: 'Введите название статьи', })} name='title' />
                  {errors.title && <Text role="error" color="red">{String(errors.title.message)}</Text>}
                </Box>
                <Box as="label">
                  <Text marginY={2}>Описание</Text>
                  <Controller {...register('description', { required: 'Введите описание статьи', })} control={control} name='description' render={({ field }) => (
                    <Box data-color-mode="light">
                      <MDEditor textareaProps={{ role: 'description' }} style={{ resize: 'none' }} height={400} value={description} onChange={(value) => {
                        setDescription(value!)
                        setRequired(false)
                        field.onChange(value)
                      }} />
                    </Box>
                  )} />
                  {errors.description && <Text role="error" color="red">{String(errors.description.message)}</Text>}
                </Box>
                {image ? <Box position={'relative'}>
                  <CloseButton role='close_image' backgroundColor={'white'} position={'absolute'} top={2} right={2} size="sm" onClick={() => setImage(null)} />
                  <Image role='blog_selected_image' src={image} width={'100%'} objectFit={'cover'} />
                </Box> : <Box>
                  <Controller {...register('image', { required: 'Введите изображение статьи', })} name='image' control={control} render={({ field }) => (
                    <FileUpload.Root accept="image/*">
                      <FileUpload.HiddenInput role='image_upload' {...register('image')} type='file' name='image' onChange={(event) => {
                        setImage(URL.createObjectURL(event.target.files?.[0]!))
                        field.onChange(event.target.files?.[0])
                      }} />
                      <FileUpload.Trigger asChild>
                        <Button variant="ghost" width={'100%'} border={'1px solid rgb(132, 132, 132)'} borderRadius={'10px'} padding={2}>
                          <LuFileImage /> Upload Images
                        </Button>
                      </FileUpload.Trigger>
                    </FileUpload.Root>
                  )} />
                  {errors.image && <Text role="error" color="red">{String(errors.image.message)}</Text>}
                </Box>}
                <Button role="blog_submit" disabled={required} colorPalette={'blue'} type="submit" alignSelf="flex-start" width={'100%'} loading={isPending}>
                  Создать
                </Button>
              </Box>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild top="0" insetEnd="-12">
              <CloseButton backgroundColor={'white'} size="sm" onClick={() => setOpen(false)} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root >
  )
}

export default CreateBlog