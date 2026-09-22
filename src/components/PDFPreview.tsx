"use client";

import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { InvoiceData } from '../types/invoice';

interface Props {
  invoiceData: InvoiceData;
}

export default function PDFPreview({ invoiceData }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Prévisualisation PDF</h2>
        <PDFDownloadLink
          document={<InvoicePDF data={invoiceData} />}
          fileName={`Proforma-${invoiceData.details.proformaNumber}.pdf`}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {/* @ts-ignore */}
          {({ loading }: { loading: boolean }) => (loading ? 'Préparation...' : 'Télécharger PDF')}
        </PDFDownloadLink>
      </div>

      <div className="w-full flex-grow bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '800px' }}>
        <PDFViewer width="100%" height="100%" className="border-none">
          <InvoicePDF data={invoiceData} />
        </PDFViewer>
      </div>
    </div>
  );
}
