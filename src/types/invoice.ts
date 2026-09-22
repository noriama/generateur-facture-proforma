export interface InvoiceItem {
  id: string;
  date: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface ClientInfo {
  name: string;
  contact: string;
  address: string;
  country: string;
}

export interface InvoiceDetails {
  proformaNumber: string;
  issueDate: string;
  expiryDate: string;
  paymentTerms: string;
}

export interface SenderInfo {
  name: string;
  contactName: string;
  address: string;
  email: string;
  ifu: string;
  rccm: string;
  moov: {
    accountName: string;
    accountNumber: string;
  };
  mtn: {
    accountName: string;
    accountNumber: string;
  };
}

export interface InvoiceData {
  client: ClientInfo;
  details: InvoiceDetails;
  items: InvoiceItem[];
  sender: SenderInfo;
}
