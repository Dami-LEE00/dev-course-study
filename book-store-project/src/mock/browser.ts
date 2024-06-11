import { setupWorker } from 'msw/browser';
import { reviewsById } from './review';

const handlers = [reviewsById];

export const worker = setupWorker(...handlers);