'use client';
import React, { ChangeEvent, useState } from 'react';
import { saveTransaction } from './transactionActions';
import { getAccounts } from '@/actions/AccountAction';
import { useEffect } from 'react';
import Divider from '@/components/Divider';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

interface Account {
    id: number;
    code: string;
    name: string;
}

interface Transaction {
    date: string;
    description: string;
    ref: string;
    mediaPath: string;
    debit: number;
    credit: number;
    accountId: number;
    flag: string;
}

// to reset
const initialTransaction: Transaction = {
    date: new Date().toISOString().split('T')[0],
    description: '',
    ref: '',
    mediaPath: '',
    debit: 0,
    credit: 0,
    accountId: 0,
    flag: 'u',
};

const TransactionForm: React.FC = () => {

    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const fetchedAccounts = await getAccounts();
                setAccounts(fetchedAccounts);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const [mainData, setMainData] = useState({
        date: new Date().toISOString().split('T')[0],
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
        accountId: 0,
        flag: 'u',
    }]);

    const isResetEnabled = transactions.length > 1;

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    // Calculate totals immediately

    const difference = Math.abs(totalDebit - totalCredit);
    const isBalanced = difference === 0;

    const isSubmitEnabled = isBalanced && transactions.length > 1;

    //const [displayValues, setDisplayValues] = useState<string[]>(['']);
    // Update the displayValues state to handle both debit and credit
    const [displayValues, setDisplayValues] = useState<{ debit: string[], credit: string[] }>({
        debit: [''],
        credit: ['']
    });

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable interactions

        // Get form data
        const formData = new FormData(e.currentTarget);

        // Append transactions data to formData
        formData.append('transactions', JSON.stringify(transactions));
        try {
            await saveTransaction(formData);
            // Handle successful submission (e.g., show success message, reset form)
            handleReset();
            // Show success toast
            toast({
                title: "SUKSES",
                description: "Transaksi Jurnal Umum berhasil disimpan",
                duration: 3000,
            })
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error saving transaction:', error);
            toast({
                title: "GAGAL",
                description: "Transaksi Jurnal Umum gagal disimpan",
                variant: "destructive",
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false); // Re-enable interactions
        }
    };

    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setMainData({ ...mainData, [e.target.name]: e.target.value });
    };

    //NEW
    const handleTransactionChange = (index: number, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedTransactions = transactions.map((t, i) => {
            if (i === index) {
                const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
    
                if (name === 'debit' || name === 'credit') {
                    const newDisplayValues = {
                        ...displayValues,
                        debit: [...displayValues.debit],
                        credit: [...displayValues.credit]
                    };
                    
                    // Update the changed field's display value
                    newDisplayValues[name][index] = formatCurrency(numericValue);
                    // Reset the other field's display value
                    newDisplayValues[name === 'debit' ? 'credit' : 'debit'][index] = '';
                    
                    setDisplayValues(newDisplayValues);
    
                    // Return updated transaction with one field set to 0
                    return {
                        ...t,
                        debit: name === 'debit' ? numericValue : 0,
                        credit: name === 'credit' ? numericValue : 0
                    };
                }
                
                return { ...t, [name]: value };
            }
            return t;
        });
    
        setTransactions(updatedTransactions);
    
        const newTotalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);
        const newTotalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);
        setTotalDebit(newTotalDebit);
        setTotalCredit(newTotalCredit);
    };


    // const handleTransactionChange = (index: number, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     const updatedTransactions = transactions.map((t, i) => {
    //         if (i === index) {

    //             const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;

    //             if (name === 'debit' || name === 'credit') {
    //                 const newDisplayValues = {
    //                     ...displayValues,
    //                     [name]: [...displayValues[name]]
    //                 };
    //                 newDisplayValues[name][index] = formatCurrency(numericValue);
    //                 setDisplayValues(newDisplayValues);
    //                 return { ...t, [name]: numericValue };
    //             }
                
    //             return { ...t, [name]: value };
            
    //         }
    //         return t;
    //     });

    //     setTransactions(updatedTransactions);

    //     const newTotalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);
    //     const newTotalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);
    //     setTotalDebit(newTotalDebit);
    //     setTotalCredit(newTotalCredit);
    // };

    const addTransaction = () => {
        setTransactions([...transactions, {
            description: '',
            ref: '',
            mediaPath: '',
            debit: 0,
            credit: 0,
            accountId: 0,
            flag: 'u',
        }]);
    };

    const handleReset = () => {
        setTransactions([{ ...initialTransaction }]);
        setMainData({
            date: new Date().toISOString().split('T')[0],
            description: '',
            ref: '',
            accountId: '',
        });
        setDisplayValues({ debit: [''], credit: [''] });
        setTotalDebit(0);
        setTotalCredit(0);
    };

    const removeTransaction = (index: number) => {
        setTransactions(transactions.filter((_, i) => i !== index));
        
        // Update display values
        setDisplayValues({
            debit: displayValues.debit.filter((_, i) => i !== index),
            credit: displayValues.credit.filter((_, i) => i !== index)
        });

        // Update totals after removing transaction
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        const newTotalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);
        const newTotalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);
        setTotalDebit(newTotalDebit);
        setTotalCredit(newTotalCredit);
    };

    return (
        <>
            <div className='bg-gray-100 border dark:bg-slate-800 border-orange-400 shadow-md rounded-lg p-3 space-y-4 w-full'>
                <p className='text-md text-bold mt-1'>Catatan Transaksi:</p>
                <form onSubmit={handleSubmit}>

                    <div className='rounded-lg space-y-2'>

                        <div className='flex justify-between gap-2'>
                            <input
                                required
                                type="date"
                                name="date"
                                value={mainData.date}
                                onChange={handleMainChange}
                                className='w-[100%] p-2 rounded'
                            />
                            <input
                                required
                                type="text"
                                name="ref"
                                value={mainData.ref}
                                onChange={handleMainChange}
                                placeholder="Nomor Referensi"
                                className='w-[100%] p-2 rounded'
                            />


                        </div>


                    </div>
                    {/* Add other TransactionMain fields as needed */}

                    <h4 className='text-md mt-4'>Detail Transaksi:</h4>
                    <Divider />
                    <div className='rounded-lg space-y-1'>
                        {/* Transaction fields */}
                        {transactions.map((transaction, index) => (

                            <div key={index} className='flex justify-between gap-2'>
                                {/* <h4 className='text-sm text-bold items-left'>{index + 1}</h4> */}
                                <div>

                                    <select
                                        value={transaction.accountId}
                                        name='accountId'
                                        onChange={(e) => handleTransactionChange(index, e)}
                                        required
                                        className='border p-2 rounded w-[100px] md:w-[100%] h-[40px]'
                                    >
                                        <option value="">Akun</option>
                                        {accounts.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.code} - {account.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <input
                                    type="text"
                                    name='description'
                                    value={transaction.description}
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Uraian"
                                    className='w-[150px] md:w-[100%] p-2 rounded'
                                />
                                
                                <input
                                    type="text" // Changed from "number" to "text"
                                    name='debit'
                                    value={displayValues.debit[index] || ''}  // Use displayValues instead of direct transaction value
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Jumlah Debit"
                                    className='w-[200px] p-2 rounded'
                                />

                                <input
                                    type="text" // Changed from "number" to "text"
                                    name='credit'
                                    value={displayValues.credit[index] || ''} // Use displayValues instead of direct transaction value
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Jumlah Kredit"
                                    className='w-[200px] p-2 rounded'
                                />
  
                                {/* Add other Transaction fields as needed */}
                                <Button
                                    
                                    variant="ghost"
                                    onClick={() => removeTransaction(index)}
                                    className="bg-red-900 hover:bg-red-600 text-white p-2 rounded"
                                    disabled={isSubmitting}
                                >
                                    <Trash2Icon />
                                </Button>

                            </div>

                        ))}
                    </div>
                    <div className='flex flex-col gap-4 mt-4 mb-2'>
                        <div className='flex flex-row gap-2'>
                            <button className='bg-blue-500 text-white p-2 px-4 rounded-md' 
                                type="button" 
                                onClick={addTransaction}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Proses...' : 'Tambah transaksi'}
                            </button>
                            <button className={`text-white p-2 px-4 rounded-md ${isSubmitEnabled ? 'bg-blue-500' : 'bg-gray-400'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={!isSubmitEnabled || isSubmitting}
                            >
                                {isSubmitting ? 'Menyimpan...' : 'SIMPAN'}
                            </button>
                            <button
                                className={`text-white p-2 px-4 rounded-md ${isResetEnabled ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
                                type="button"
                                onClick={handleReset}
                                disabled={!isResetEnabled || isSubmitting}
                            >
                                Reset
                            </button>
                        </div>
                        <div>
                            <div>
                                <p>Total Debit: {formatCurrency(totalDebit)}</p>
                                <p>Total Credit: {formatCurrency(totalCredit)}</p>
                                <p className={isBalanced ? 'text-green-600' : 'text-orange-500'}>
                                    Perbedaan: {formatCurrency(difference)}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
};

export default TransactionForm;