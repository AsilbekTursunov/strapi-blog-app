import { isAxiosError } from "axios";

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // base64 qilib o‘qiydi
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function toSlug(title: string) {
  if (!title) return "";

  // 1. Normalizatsiya (aksentlarni ajratib olish)
  const normalized = title.normalize("NFKD");

  // 2. Diakritik belgilarni olib tashlash (agar mavjud bo'lsa)
  const withoutDiacritics = normalized.replace(/\p{M}/gu, "");

  // 3. Noto'g'ri belgilarni olib tashlash: faqat harflar, raqamlar va probellar qolsin
  //    (Unicode harflar va raqamlar uchun \p{L}\p{N})
  const cleaned = withoutDiacritics.replace(/[^\p{L}\p{N}\s-]+/gu, "");

  // 4. Bo'shliqlar va ko'p chiziqchalarni yagona '-' ga aylantirish
  const collapsed = cleaned
    .trim()
    .replace(/[\s\-]+/g, "-")   // bo'shliqlar yoki ketma-ket chiziqchalarni '-'
    .replace(/^-+|-+$/g, "");   // bosh va oxiridagi '-'larni olib tashlash

  // 5. Hammasini kichik harfga o'tkazish (locale bilan kerak bo'lsa .toLowerCase('en'))
  return collapsed.toLowerCase();
}

export const errorMessage = (error: any) => {
  if (!error) return ''
  if (typeof error === 'string') return error
  if (isAxiosError(error)) {
    const respMessage = (error.response?.data as any)?.error?.message ?? error.message
    return Array.isArray(respMessage) ? respMessage.join(', ') : String(respMessage)
  }
  if (error instanceof Error) return error.message
  try { return JSON.stringify(error) } catch { return 'Unknown error' }
}