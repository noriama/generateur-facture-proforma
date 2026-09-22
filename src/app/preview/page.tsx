"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeInvoiceData } from '../../utils/data';
import { InvoiceData } from '../../types/invoice';
import dynamic from 'next/dynamic';

const PDFPreviewer = dynamic(() => import('../../components/PDFPreviewer'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 w-full h-full min-h-[800px] flex items-center justify-center">Chargement du PDF...</div>
});

function PreviewContent() {
  const searchParams = useSearchParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      const decoded = decodeInvoiceData(dataParam);
      if (decoded) {
        setInvoiceData(decoded);
      }
    }
  }, [searchParams]);

  if (!invoiceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Aucune donnée de facture trouvée ou lien invalide.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
      <PDFPreviewer invoiceData={invoiceData} />
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  )
}
