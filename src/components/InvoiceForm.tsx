import React from 'react';
import { InvoiceData, InvoiceItem } from '../types/invoice';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

export const InvoiceForm: React.FC<Props> = ({ invoiceData, setInvoiceData }) => {
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceData({
      ...invoiceData,
      client: { ...invoiceData.client, [e.target.name]: e.target.value },
    });
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceData({
      ...invoiceData,
      details: { ...invoiceData.details, [e.target.name]: e.target.value },
    });
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvoiceData({
      ...invoiceData,
      sender: { ...invoiceData.sender, [e.target.name]: e.target.value },
    });
  };

  const handleSenderNestedChange = (network: 'moov' | 'mtn', field: string, value: string) => {
    setInvoiceData({
      ...invoiceData,
      sender: {
        ...invoiceData.sender,
        [network]: { ...invoiceData.sender[network], [field]: value }
      },
    });
  }

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString().split('T')[0],
          description: '',
          quantity: 1,
          unitPrice: 0,
          discount: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Facture Proforma</h2>

      {/* Sender Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Informations de l'Émetteur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom Complet (Propriétaire)</label>
            <input
              type="text"
              name="name"
              value={invoiceData.sender.name}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom de l'Entreprise / Marque</label>
            <input
              type="text"
              name="contactName"
              value={invoiceData.sender.contactName}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={invoiceData.sender.email}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              name="address"
              value={invoiceData.sender.address}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IFU</label>
            <input
              type="text"
              name="ifu"
              value={invoiceData.sender.ifu}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">RCCM</label>
            <input
              type="text"
              name="rccm"
              value={invoiceData.sender.rccm}
              onChange={handleSenderChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
        </div>

        <h4 className="text-md font-medium mt-4 mb-2 text-gray-600">Comptes Mobile Money</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded bg-gray-50">
            <h5 className="text-sm font-bold text-orange-600 mb-2">Moov Money</h5>
            <input
              type="text"
              placeholder="Nom du compte"
              value={invoiceData.sender.moov.accountName}
              onChange={(e) => handleSenderNestedChange('moov', 'accountName', e.target.value)}
              className="mb-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
            />
            <input
              type="text"
              placeholder="Numéro de compte"
              value={invoiceData.sender.moov.accountNumber}
              onChange={(e) => handleSenderNestedChange('moov', 'accountNumber', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
            />
          </div>
          <div className="p-3 border rounded bg-gray-50">
            <h5 className="text-sm font-bold text-yellow-500 mb-2">MTN Mobile Money</h5>
            <input
              type="text"
              placeholder="Nom du compte"
              value={invoiceData.sender.mtn.accountName}
              onChange={(e) => handleSenderNestedChange('mtn', 'accountName', e.target.value)}
              className="mb-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
            />
            <input
              type="text"
              placeholder="Numéro de compte"
              value={invoiceData.sender.mtn.accountNumber}
              onChange={(e) => handleSenderNestedChange('mtn', 'accountNumber', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
            />
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Informations Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={invoiceData.client.name}
              onChange={handleClientChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact (Email/Tél)</label>
            <input
              type="text"
              name="contact"
              value={invoiceData.client.contact}
              onChange={handleClientChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              name="address"
              value={invoiceData.client.address}
              onChange={handleClientChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pays</label>
            <input
              type="text"
              name="country"
              value={invoiceData.client.country}
              onChange={handleClientChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Détails Proforma</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro Proforma</label>
            <input
              type="text"
              name="proformaNumber"
              value={invoiceData.details.proformaNumber}
              onChange={handleDetailsChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Termes de paiement</label>
            <input
              type="text"
              name="paymentTerms"
              value={invoiceData.details.paymentTerms}
              onChange={handleDetailsChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date de proforma</label>
            <input
              type="date"
              name="issueDate"
              value={invoiceData.details.issueDate}
              onChange={handleDetailsChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date d'expiration</label>
            <input
              type="date"
              name="expiryDate"
              value={invoiceData.details.expiryDate}
              onChange={handleDetailsChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-700">Prestations</h3>
          <button
            onClick={addItem}
            className="flex items-center text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded"
            type="button"
          >
            <Plus size={16} className="mr-1" /> Ajouter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qté</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P.U (XAF)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remise (XAF)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoiceData.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                      className="w-full text-sm border-gray-300 rounded p-1 border"
                    />
                  </td>
                  <td className="px-2 py-2 w-full">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full text-sm border-gray-300 rounded p-1 border"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-16 text-sm border-gray-300 rounded p-1 border text-center"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-24 text-sm border-gray-300 rounded p-1 border text-right"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                      className="w-24 text-sm border-gray-300 rounded p-1 border text-right discount"
                    />
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    XAF {((item.quantity * item.unitPrice) - item.discount).toLocaleString('fr-FR')}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-900"
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="text-xl font-bold">
            Total: XAF {invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0).toLocaleString('fr-FR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
