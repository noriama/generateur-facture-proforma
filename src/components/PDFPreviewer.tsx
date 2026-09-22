import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { InvoiceData } from '../types/invoice';

interface Props {
  invoiceData: InvoiceData;
}

export default function PDFPreviewer({ invoiceData }: Props) {
  return (
    <div className="w-full flex-col flex items-center justify-center">
        <div className="max-w-5xl w-full flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Votre Facture Proforma</h1>
          <PDFDownloadLink
            document={<InvoicePDF data={invoiceData} />}
            fileName={`Proforma-${invoiceData.client.name.replace(/\s+/g, '-')}.pdf`}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors"
          >
            {/* @ts-ignore */}
            {({ loading }: { loading: boolean }) => (loading ? 'Préparation...' : 'Télécharger le PDF')}
          </PDFDownloadLink>
        </div>

        <div className="w-full max-w-5xl flex-grow bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '85vh' }}>
          <PDFViewer width="100%" height="100%" className="border-none">
            <InvoicePDF data={invoiceData} />
          </PDFViewer>
        </div>
    </div>
  );
}
