"use client";

import React, { useState } from 'react';
import { InvoiceData } from '../types/invoice';
import InvoiceForm from '../components/InvoiceForm';

const initialData: InvoiceData = {
  client: {
    name: '',
    contact: '',
    address: '',
    country: '',
  },
  items: [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
    }
  ],
};

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialData);

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center items-start">
      <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
    </main>
  );
}
