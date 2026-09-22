import { InvoiceData } from '../types/invoice';

export function encodeInvoiceData(data: InvoiceData): string {
  if (typeof window === 'undefined') return ''; // Safety check for SSR
  const jsonString = JSON.stringify(data);
  return window.btoa(encodeURIComponent(jsonString));
}

export function decodeInvoiceData(encodedData: string): InvoiceData | null {
  if (typeof window === 'undefined') return null;
  try {
    const jsonString = decodeURIComponent(window.atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode invoice data:", error);
    return null;
  }
}
