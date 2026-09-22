"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { InvoiceData } from '../types/invoice';
import InvoiceForm from '../components/InvoiceForm';

const PDFPreview = dynamic(() => import('../components/PDFPreview'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 w-full h-[800px] rounded flex items-center justify-center">Chargement du PDF...</div>
});

const initialData: InvoiceData = {
  client: {
    name: 'Mr. xxxx xxxx xxxx',
    contact: 'xxxxxxxxxxx@gmail.com',
    address: 'Cameroun',
    country: '',
  },
  details: {
    proformaNumber: 'NB230225',
    issueDate: '2025-02-23',
    expiryDate: '2025-03-02',
    paymentTerms: '07 Jours',
  },
  items: [
    {
      id: '1',
      date: '2025-02-23',
      description: 'Conception de la maquette/packaging',
      quantity: 1,
      unitPrice: 25000,
      discount: 0,
    },
    {
      id: '2',
      date: '2025-02-23',
      description: 'Mock-ups de présentation',
      quantity: 1,
      unitPrice: 5000,
      discount: 0,
    },
    {
      id: '3',
      date: '2025-02-23',
      description: '01 Affiche de présentation du produit final',
      quantity: 1,
      unitPrice: 5000,
      discount: 0,
    },
    {
      id: '4',
      date: '2025-02-23',
      description: '02 Affiches simples de campagne publicitaire',
      quantity: 1,
      unitPrice: 15000,
      discount: 0,
    }
  ],
  sender: {
    name: 'Christ-Roi Mariano HONVOU',
    contactName: 'HnvgrAphity',
    address: 'Porto-Novo / Bénin\nKoutongbé, St Benoit',
    email: 'mhonvou2003@gmail.com',
    ifu: '0202240881807',
    rccm: 'RB/PNO/21 A 22754',
    moov: {
      accountName: 'Honvou J. C. Mariano',
      accountNumber: '(+229) 0155486481',
    },
    mtn: {
      accountName: 'Honvou J. C. Mariano',
      accountNumber: '(+229) 0162208437',
    },
  },
};

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">

        {/* Form Section */}
        <div className="w-full xl:w-1/2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        </div>

        {/* PDF Preview Section */}
        <div className="w-full xl:w-1/2 flex flex-col items-center">
          {isClient && <PDFPreview invoiceData={invoiceData} />}
        </div>

      </div>
    </main>
  );
}
