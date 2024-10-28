'use client';
import React, { useState } from 'react';
import { saveTransaction } from './transactionActions';

const TransactionForm = () => {
  const [mainData, setMainData] = useState({
    date: '',
    description: '',
    ref: '',
    accountId: '',
  });
  const [transactions, setTransactions] = useState([{
    description: '',
    ref: '',
    mediaPath: '',
    debit: 0,
    credit: 0,
    accountId: '',
  }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Append transactions data to formData
    formData.append('transactions', JSON.stringify(transactions));
    try {
      await saveTransaction(formData);
      // Handle successful submission (e.g., show success message, reset form)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error saving transaction:', error);
    }
  };

  const handleMainChange = (e) => {
    setMainData({ ...mainData, [e.target.name]: e.target.value });
  };

  const handleTransactionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTransactions = transactions.map((t, i) => {
      if (i === index) {
        return { ...t, [name]: value };
      }
      return t;
    });
    setTransactions(updatedTransactions);
  };

  const addTransaction = () => {
    setTransactions([...transactions, {
      description: '',
      ref: '',
      mediaPath: '',
      debit: 0,
      credit: 0,
      accountId: '',
    }]);
  };

  return (
    <div className=' w-full border rounded-lg p-3'>
    <form onSubmit={handleSubmit}>
    
      <div className='bg-gray-100 shadow-md rounded-lg p-3 space-x-2'>
      {/* TransactionMain fields */}
      <input
        type="date"
        name="date"
        value={mainData.date}
        onChange={handleMainChange}
        className='w-[160px]'
      />
      <input
        type="text"
        name="description"
        value={mainData.description}
        onChange={handleMainChange}
        placeholder="Main Description"
        className='w-[30%]'
      />
      <input
        type="text"
        name="ref"
        value={mainData.ref}
        onChange={handleMainChange}
        placeholder="Reference"
      />
      <input
        type="number"
        name="accountId"
        value={mainData.accountId}
        onChange={handleMainChange}
        placeholder="Account ID"
      />

      </div>
      {/* Add other TransactionMain fields as needed */}

      <div className='bg-gray-200 shadow-md rounded-lg p-3 space-x-2'>
      {/* Transaction fields */}
      {transactions.map((transaction, index) => (
        <div key={index}>
          <input
            type="text"
            name='description'
            value={transaction.description}
            onChange={(e) => handleTransactionChange(index, e)}
            placeholder="Transaction Description"
          />
          <input
            type="number"
            name='debit'
            value={transaction.debit}
            onChange={(e) => handleTransactionChange(index, e)}
            placeholder="Debit"
          />
          <input
            type="number"
            name='credit'
            value={transaction.credit}
            onChange={(e) => handleTransactionChange(index, e)}
            placeholder="Credit"
          />
          <input
            type="number"
            name='accountId'
            value={transaction.accountId}
            onChange={(e) => handleTransactionChange(index, e)}
            placeholder="Account ID"
          />
          {/* Add other Transaction fields as needed */}
        </div>
      ))}
      </div>
        <div className='flex bg-gray-300 p-2 gap-2'>
            <button className='bg-blue-500 text-white p-2 rounded-md' type="button" onClick={addTransaction}>Add Transaction</button>
            <button className='bg-blue-500 text-white p-2 rounded-md' type="submit">Submit</button>
       </div>
    </form>
    </div>
  );
};

export default TransactionForm;