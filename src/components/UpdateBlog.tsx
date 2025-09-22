import { Box, Button, CloseButton, Dialog, FileUpload, Image, Input, Portal, Text } from '@chakra-ui/react'
import { Pencil } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { LuFileImage } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useEditBlog } from '../hooks/useGetBlogs';
import { toBase64 } from '../lib/helpers';
import type { IBlog } from '@/types';
import { baseUrl } from '../constants';


const UpdateBlog = ({ blog }: { blog?: IBlog }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<any>((blog?.image && `${baseUrl}${blog?.image.url}`) || null)
  const [imageFile, setImageFile] = useState<any>(null)
  const [description, setDescription] = useState(blog?.description || '')

  const { mutate: editBlog, isPending, isSuccess } = useEditBlog()

  const onSubmit = (data: any) => {
    const filteredData: any = {};
    if (data.title !== blog?.title) filteredData.title = data.title;
    if (description !== blog?.description) filteredData.description = description;
    if (imageFile) filteredData.image = imageFile;
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64String = await toBase64(file);
    setImage(base64String)
    setImageFile(file)
    // console.log("Base64:", base64String);
  };
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
                  <Input defaultValue={blog?.title || ''} {...register('title', { required: 'Введите название статьи', })} name='title' />
                  {errors.title && <Text color="red">{String(errors.title.message)}</Text>}
                </Box>
                <Box as="label">
                  <Text marginY={2}>Описание</Text>
                  <Box data-color-mode="light">
                    <MDEditor style={{ resize: 'none' }} height={400} value={description} onChange={(value) => setDescription(value!)} />
                  </Box>
                  {/* <Textarea rows={10} {...register('description', { required: 'Введите описание статьи' })} name='description' /> */}
                </Box>
                {image ? <Box position={'relative'}>
                  <CloseButton backgroundColor={'white'} position={'absolute'} top={2} right={2} size="sm" onClick={() => {
                    setImage(null)
                    setImageFile(null)
                  }} />
                  <Image src={image} width={'100%'} objectFit={'cover'} />
                </Box> : <FileUpload.Root accept="image/*">
                  <FileUpload.HiddenInput {...register('image')} type='file' name='image' onChange={handleFileChange} />
                  <FileUpload.Trigger asChild>
                    <Button variant="ghost" width={'100%'} border={'1px solid rgb(132, 132, 132)'} borderRadius={'10px'} padding={2}>
                      <LuFileImage /> Upload Images
                    </Button>
                  </FileUpload.Trigger>
                </FileUpload.Root>}
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