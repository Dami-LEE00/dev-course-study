import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';
import { Banner } from '@/models/banner.model';

const bannerData: Banner[] = [
  {
    id: 1,
    title: 'Banner 1 Title',
    description: ' Banner 1 Description',
    image: 'https://picsum.photos/id/111/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
  {
    id: 2,
    title: 'Banner 2 Title',
    description: ' Banner 2 Description',
    image: 'https://picsum.photos/id/222/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
  {
    id: 3,
    title: 'Banner 3 Title',
    description: ' Banner 3 Description',
    image: 'https://picsum.photos/id/33/1200/400',
    url: 'https://some.url',
    target: '_blank',
  }
];

export const banners = http.get('http://localhost:9999/banners', () => {
  return HttpResponse.json(bannerData, {
    status: 200
  })
})