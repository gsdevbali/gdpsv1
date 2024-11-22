'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"
import { saveTransaction } from './KasbonBapelActions';
import { getAccountsByType, getAccountsAll } from '@/actions/AccountAction';
import Divider from '@/components/Divider';
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
};


interface OtherFormProps {
    accountId: string;
}


const KasBonBapelForm: React.FC<OtherFormProps> = ({ accountId }) => {
    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [accountsAll, setAccountsAll] = useState<Account[]>([]);
    const { toast } = useToast()

    // fetch accounts by Type id - khusus untuk PENGELUARAN LAIN-LAIN
    // Type: 5 - BIAYA-BIAYA
    // 10 - Biaya Operasional Gereja
    // 11 - Biaya Sekre
    // 12 - Biaya Bidang & Bapel
    // if (accountId === '') {
    useEffect(() => {
        // const fetchAccounts = async () => {
        //     try {
        //         const fetchedAccounts = await getAccountsByType(5);
        //         setAccounts(fetchedAccounts);
        //     } catch (error) {
        //         console.error('Failed to fetch accounts:', error);
        //     }
        // };

        const fetchAccountsAll = async () => {
            try {
                const fetchedAccounts = await getAccountsAll();
                setAccountsAll(fetchedAccounts);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        //fetchAccounts();
        fetchAccountsAll();

    }, []);
    // }

    const [mainData, setMainData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        ref: '',
        accountId: accountId,
    });
    const [transactions, setTransactions] = useState([{
        description: '',
        ref: '',
        mediaPath: '',
        debit: 0,
        credit: 0,
        accountId: 0,
    }]);

    // const isResetEnabled = transactions.length > 1;

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    // Calculate totals immediately

    const isResetEnabled = transactions.length > 1;

    const [displayValues, setDisplayValues] = useState<string[]>(['']);
    //const [setDisplayValues] = useState<string[]>(transactions.map(() => ''));

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
            console.log('accountId: ( from mainData )', mainData.accountId);
            await saveTransaction(formData, mainData.accountId);
            // Handle successful submission (e.g., show success message, reset form)
            // Reset the form
            handleReset();
            // Show success toast
            toast({
                title: "Success",
                description: "Transaction saved successfully",
                duration: 3000,
            })
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error saving transaction:', error);

            // Show error toast
            toast({
                title: "Error",
                description: "Failed to save transaction",
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

    const handleTransactionChange = (index: number, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedTransactions = transactions.map((t, i) => {
            if (i === index) {
                if (name === 'debit') {
                    // Remove non-numeric characters and parse as float
                    const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
                    
                    // Update display values
                    const newDisplayValues = [...displayValues];
                    newDisplayValues[index] = formatCurrency(numericValue);
                    setDisplayValues(newDisplayValues);
                    
                    return { ...t, [name]: numericValue };
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

    const addTransaction = () => {
        setTransactions([...transactions, {
            description: '',
            ref: '',
            mediaPath: '',
            debit: 0,
            credit: 0,
            accountId: 0,
        }]);
    };


    const handleReset = () => {
        setTransactions([{ ...initialTransaction }]);
        setMainData({
            date: new Date().toISOString().split('T')[0],
            description: '',
            ref: '',
            accountId: accountId,
        });
        setDisplayValues(['']);
        setTotalDebit(0);
        setTotalCredit(0);
    };

    const removeTransaction = (index: number) => {
        setTransactions(transactions.filter((_, i) => i !== index));
        setDisplayValues(displayValues.filter((_, i) => i !== index));

        // Update totals after removing transaction
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        const newTotalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);
        const newTotalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);
        setTotalDebit(newTotalDebit);
        setTotalCredit(newTotalCredit);
    };

    return (
        <>
            <div className='bg-gray-100 border dark:bg-slate-800 border-red-500 shadow-md rounded-lg p-3 space-y-4 w-full'>
                <p className='text-md text-bold mt-1'>Catatan Transaksi:</p>
                <form onSubmit={handleSubmit}>

                    <div className='bg-gray-100 border dark:bg-slate-800 rounded-lg space-y-2'>

                        <select
                            required
                            name="accountId"
                            className='border p-2 rounded w-full'
                            value={mainData.accountId}
                            onChange={handleMainChange}
                        >
                            <option value="">Akun (Sumber Dana)</option>
                            {accountsAll.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.code} - {account.name}
                                </option>
                            ))}
                        </select>

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
                                type="text"
                                name="ref"
                                value={mainData.ref}
                                onChange={handleMainChange}
                                placeholder="Nomor Referensi"
                                className='w-[100%] p-2 rounded'
                            />


                        </div>

                        <input
                            type="text"
                            name="description"
                            value={mainData.description}
                            onChange={handleMainChange}
                            placeholder="Uraian transaksi"
                            className='w-[100%] p-2 rounded'
                        />

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
                                        className='border p-2 rounded w-[100%] md:w-[100%] h-[40px]'
                                    >
                                        <option value="">Akun</option>
                                        {accountsAll.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.code} - {account.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <input
                                    required
                                    type="text"
                                    name='description'
                                    value={transaction.description}
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Uraian"
                                    className='w-[100%] md:w-[100%] p-2 rounded'
                                />

                                <input
                                    type="text" // Changed from "number" to "text"
                                    name='debit'
                                    value={displayValues[index] || ''} // Use displayValues instead of direct transaction value
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Jumlah"
                                    className='w-[200px] p-2 rounded'
                                />

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
                            <button 
                                className='bg-blue-500 text-white p-2 px-4 rounded-md' 
                                type="button"
                                onClick={addTransaction}    
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Proses...' : 'Tambah transaksi'}
                            </button>
                            <button
                                className='bg-blue-500 text-white p-2 px-4 rounded-md'
                                type="submit"
                                disabled={isSubmitting}
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
                                {/* <p>Total Pengeluaran: {totalCredit}</p> */}
                                <p className='text-lg text-bold'>Total Pengeluaran: {formatCurrency(totalDebit)}</p>
                                {/* <p>Total Credit: {totalCredit}</p> */}
                                {/* <p className={isBalanced ? 'text-green-600' : 'text-orange-500'}>
                                    Perbedaan: {difference.toFixed(2)}
                                </p> */}
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
};

export default KasBonBapelForm;
