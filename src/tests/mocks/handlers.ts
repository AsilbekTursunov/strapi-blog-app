import { http, HttpResponse } from 'msw'
import { blogsPosts } from '../../constants'

export const handlers = [
  http.post('/auth/local', () => {
    return HttpResponse.json({
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzU5MDAyMjgyLCJleHAiOjE3NjE1OTQyODJ9.gJctPdcGzrZIvXbvQAU2ZnwLXHu8KdP4yyED9qugQZQ',
      user: {
        id: 2,
        documentId: 'c08gl5796b9a93tfk8ecrg1t',
        username: 'Akmaljon',
        email: 'akmal2002@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2025-09-22T07:25:12.464Z',
        updatedAt: '2025-09-22T07:25:12.464Z',
        publishedAt: '2025-09-22T07:25:12.464Z',
      },
    })
  }),

  http.post('/auth/local/register', () => {
    return HttpResponse.json({
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzU5MDAyMjgyLCJleHAiOjE3NjE1OTQyODJ9.gJctPdcGzrZIvXbvQAU2ZnwLXHu8KdP4yyED9qugQZQ',
      user: {
        id: 2,
        documentId: 'c08gl5796b9a93tfk8ecrg1t',
        username: 'Jamshid',
        email: 'jamshid2002@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2025-09-22T07:25:12.464Z',
        updatedAt: '2025-09-22T07:25:12.464Z',
        publishedAt: '2025-09-22T07:25:12.464Z',
      },
    })
  }),
  http.post('/upload', () => {
    return HttpResponse.json([
      {
        id: 12,
        documentId: 'maf883nnnlebisux30cc34v8',
        name: '2025-09-09 00.03.08.jpg',
        alternativeText: null,
        caption: null,
        width: 720,
        height: 1280,
        formats: {
          large: {
            ext: '.jpg',
            url: 'https://special-horn-8ee9415e94.media.strapiapp.com/large_2025_09_09_00_03_08_27e8affe2a.jpg',
            hash: 'large_2025_09_09_00_03_08_27e8affe2a',
            mime: 'image/jpeg',
            name: 'large_2025-09-09 00.03.08.jpg',
            path: null,
            size: 23.46,
            width: 563,
            height: 1000,
            sizeInBytes: 23457,
          },
          small: {
            ext: '.jpg',
            url: 'https://special-horn-8ee9415e94.media.strapiapp.com/small_2025_09_09_00_03_08_27e8affe2a.jpg',
            hash: 'small_2025_09_09_00_03_08_27e8affe2a',
            mime: 'image/jpeg',
            name: 'small_2025-09-09 00.03.08.jpg',
            path: null,
            size: 8.21,
            width: 281,
            height: 500,
            sizeInBytes: 8208,
          },
          medium: {
            ext: '.jpg',
            url: 'https://special-horn-8ee9415e94.media.strapiapp.com/medium_2025_09_09_00_03_08_27e8affe2a.jpg',
            hash: 'medium_2025_09_09_00_03_08_27e8affe2a',
            mime: 'image/jpeg',
            name: 'medium_2025-09-09 00.03.08.jpg',
            path: null,
            size: 14.98,
            width: 422,
            height: 750,
            sizeInBytes: 14984,
          },
          thumbnail: {
            ext: '.jpg',
            url: 'https://special-horn-8ee9415e94.media.strapiapp.com/thumbnail_2025_09_09_00_03_08_27e8affe2a.jpg',
            hash: 'thumbnail_2025_09_09_00_03_08_27e8affe2a',
            mime: 'image/jpeg',
            name: 'thumbnail_2025-09-09 00.03.08.jpg',
            path: null,
            size: 1.46,
            width: 88,
            height: 156,
            sizeInBytes: 1463,
          },
        },
        hash: '2025_09_09_00_03_08_27e8affe2a',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 32.47,
        url: 'https://special-horn-8ee9415e94.media.strapiapp.com/2025_09_09_00_03_08_27e8affe2a.jpg',
        previewUrl: null,
        provider: 'strapi-provider-upload-strapi-cloud',
        provider_metadata: null,
        createdAt: '2025-09-29T06:16:30.647Z',
        updatedAt: '2025-09-29T06:16:30.647Z',
        publishedAt: '2025-09-29T06:16:30.649Z',
      },
    ])
  }),

  http.post('/blogs', () => {
    return HttpResponse.json(blogsPosts)
  }),

]
