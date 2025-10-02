import '@testing-library/jest-dom/vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { afterAll, beforeAll, vi } from 'vitest';
import { server } from './mocks/server'
import { afterEach } from 'node:test';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

global.ResizeObserver = ResizeObserver


window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// JSDOMda yo‘q methodlarni qo‘shamiz
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
})

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  value: vi.fn(),
  writable: true,
})

Object.defineProperty(global.URL, "createObjectURL", {
  writable: true,
  value: vi.fn(() => "mocked-url")
})
