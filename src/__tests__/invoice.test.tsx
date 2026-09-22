import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InvoiceForm from '../components/InvoiceForm';
import { InvoiceData } from '../types/invoice';

describe('InvoiceForm Calculation Logic', () => {
  const initialData: InvoiceData = {
    client: { name: '', contact: '', address: '', country: '' },
    details: { proformaNumber: '', issueDate: '', expiryDate: '', paymentTerms: '' },
    sender: {
      name: '', contactName: '', address: '', email: '', ifu: '', rccm: '',
      moov: { accountName: '', accountNumber: '' },
      mtn: { accountName: '', accountNumber: '' }
    },
    items: [
      { id: '1', date: '2023-01-01', description: 'Item 1', quantity: 2, unitPrice: 100, discount: 20 },
      { id: '2', date: '2023-01-01', description: 'Item 2', quantity: 1, unitPrice: 50, discount: 0 }
    ]
  };

  test('calculates item totals and grand total correctly', () => {
    let currentData = initialData;
    const setInvoiceData = jest.fn((newData: InvoiceData | ((prev: InvoiceData) => InvoiceData)) => {
      // simulate state update
      currentData = typeof newData === 'function' ? newData(currentData) : newData;
    });

    const { rerender } = render(<InvoiceForm invoiceData={currentData} setInvoiceData={setInvoiceData} />);

    // Check initial total: (2 * 100 - 20) + (1 * 50 - 0) = 180 + 50 = 230
    let totalElement = screen.getByText(/Total: XAF 230/);
    expect(totalElement).toBeInTheDocument();

    // Now let's change a value and see if setInvoiceData is called with correct data
    const unitPriceInputs = screen.getAllByRole('spinbutton').filter(input => input.className.includes('w-24') && !input.className.includes('discount'));

    // We expect the third spinbutton to be the unit price of the first item (Qty, UnitPrice, Discount for item 1, then for item 2)
    const firstItemPriceInput = unitPriceInputs[0];

    fireEvent.change(firstItemPriceInput, { target: { value: '200' } });

    expect(setInvoiceData).toHaveBeenCalled();
    const callArg = setInvoiceData.mock.lastCall?.[0];
    if (!callArg) {
      throw new Error("Last call argument is undefined");
    }
    const updatedData = typeof callArg === 'function' ? callArg(currentData) : callArg;

    // The new item data should have unitPrice 200
    expect(updatedData.items[0].unitPrice).toBe(200);

    // If we re-render with updated data, the total should be (2 * 200 - 20) + 50 = 380 + 50 = 430
    rerender(<InvoiceForm invoiceData={updatedData} setInvoiceData={setInvoiceData} />);
    totalElement = screen.getByText(/Total: XAF 430/);
    expect(totalElement).toBeInTheDocument();
  });
});
