import { Box, Button, CloseButton, Dialog, FileUpload, Image, Input, Portal, Text } from '@chakra-ui/react'
import { Pencil } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { LuFileImage } from 'react-icons/lu'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useEditBlog } from '../hooks/useGetBlogs';
import type { IBlog } from '@/types';
import z from 'zod';

const uploadSchema = z.object({
  title: z.string().min(1, 'Введите название статьи'),
  description: z.string().min(1, 'Введите описание статьи'),
  image: z.instanceof(File).optional(),
})


const UpdateBlog = ({ blog }: { blog?: IBlog }) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof uploadSchema>>({
    defaultValues: {
      title: blog?.title || '',
      description: blog?.description || '',
      image: undefined
    }
  })
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<any>((blog?.image && blog?.image?.url) || null)

  const { mutate: editBlog, isPending, isSuccess } = useEditBlog()

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    const filteredData: any = {};
    if (data.title !== blog?.title) filteredData.title = data.title;
    if (data.description !== blog?.description) filteredData.description = data.description;
    if (data.image) filteredData.image = data.image;
    if (Object.keys(filteredData).length === 0) return;
    editBlog({
      slug: blog?.slug!,
      id: blog?.id!,
      data: filteredData,
    });
  }
  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
    }
  }, [isSuccess])

  return (
    <Dialog.Root closeOnInteractOutside={true} open={open} size="xl" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)} >
          <Pencil size={4} />
          <Text>
            Редактировать
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxH={'80%'} position={'relative'}>
            <Dialog.Header>
              <Dialog.Title>Редактирование статьи</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body overflow={'auto'}>
              <Box onSubmit={handleSubmit(onSubmit)} as="form" display={'flex'} flexDirection={'column'} gap={5}>
                <Box as="label">
                  <Text marginY={2}>Название</Text>
                  <Input defaultValue={blog?.title || ''} role='title' {...register('title', { required: 'Введите название статьи', })} name='title' />
                  {errors.title && <Text color="red">{String(errors.title.message)}</Text>}
                </Box>
                <Box as="label">
                  <Text marginY={2}>Описание</Text>
                  <Controller {...register('description', { required: 'Введите описание статьи', })} control={control} name='description' render={({ field }) => (
                    <Box data-color-mode="light">
                      <MDEditor textareaProps={{ role: 'description' }} style={{ resize: 'none' }} height={400} value={field.value} onChange={(value) => {
                        field.onChange(value)
                      }} />
                    </Box>
                  )} />
                  {errors.description && <Text role="error" color="red">{String(errors.description.message)}</Text>}
                </Box>
                {image ? <Box position={'relative'}>
                  <CloseButton role='close_image' backgroundColor={'white'} position={'absolute'} top={2} right={2} size="sm" onClick={() => setImage(null)} />
                  <Image src={image} width={'100%'} objectFit={'cover'} />
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
                <Button colorPalette={'blue'} type="submit" alignSelf="flex-start" width={'100%'} loading={isPending}>
                  Редактировать
                </Button>
              </Box>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild top="0" insetEnd="-12">
              <CloseButton backgroundColor={'white'} size="sm" onClick={() => setOpen(false)} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default UpdateBlog