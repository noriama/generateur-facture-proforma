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

export interface InvoiceData {
  client: ClientInfo;
  items: InvoiceItem[];
}
