import { useAppSelector } from '../hooks/useStoreSelector'
import { Box, Button, CloseButton, Dialog, FileUpload, Image, Input, Portal, Text } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { LuFileImage } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useCreateBlog } from '../hooks/useGetBlogs';
import { toBase64 } from '../lib/helpers';


const CreateBlog = () => {
  const { user } = useAppSelector((state) => state.user)
  const { register, formState: { errors }, reset, handleSubmit } = useForm()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<any>(null)
  const [imageFile, setImageFile] = useState<any>(null)
  const [description, setDescription] = useState('')
  const [required, setRequired] = useState(false)

  const { mutate: createBlog, isPending, isSuccess } = useCreateBlog()

  const onSubmit = (data: any) => {
    if (!imageFile || !data.title || !description) {
      setRequired(true)
      return
    } 
    createBlog({
      title: data.title,
      description: description,
      image: imageFile,
      author: user?.id,
    })


  }
  useEffect(() => {
    if (isSuccess) {
      setImage(null)
      setImageFile(null)
      setDescription('')
      reset()
      setOpen(false)
    }
  }, [isSuccess])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRequired(false)

    const base64String = await toBase64(file);
    setImage(base64String)
    setImageFile(file)
    // console.log("Base64:", base64String);
  };
  return (
    <Dialog.Root closeOnInteractOutside={true} open={open} size="xl" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)} >
          <Plus size={4} />
          <Text>
            Создать
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxH={'90%'} position={'relative'}>
            <Dialog.Header>
              <Dialog.Title>Создание статьи</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body overflow={'auto'}>
              <Box onSubmit={handleSubmit(onSubmit)} as="form" display={'flex'} flexDirection={'column'} gap={5}>
                <Box as="label">
                  <Text marginY={2}>Название</Text>
                  <Input {...register('title', { required: 'Введите название статьи', })} name='title' />
                  {errors.title && <Text color="red">{String(errors.title.message)}</Text>}
                </Box>
                <Box as="label">
                  <Text marginY={2}>Описание</Text>
                  <Box data-color-mode="light">
                    <MDEditor style={{ resize: 'none' }} height={400} value={description} onChange={(value) => {
                      setDescription(value!)
                      setRequired(false)
                    }} />
                  </Box>
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
                {required && <Text color="red">Заполните все поля</Text>}
                <Button disabled={required} colorPalette={'blue'} type="submit" alignSelf="flex-start" width={'100%'} loading={isPending}>
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
    </Dialog.Root>
  )
}

export default CreateBlog