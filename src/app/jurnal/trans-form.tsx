'use client';
import React, { ChangeEvent, useState } from 'react';
import { saveTransaction } from './transactionActionsNew';
import { getAccounts } from '@/actions/AccountAction';
import { useEffect } from 'react';
import Divider from '@/components/Divider';
import { toast } from '@/hooks/use-toast';

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

    // useEffect(() => {
    //     const newTotalDebit = transactions.reduce((sum, transaction) => sum + transaction.debit, 0);
    //     const newTotalCredit = transactions.reduce((sum, transaction) => sum + transaction.credit, 0);
    //     setTotalDebit(newTotalDebit);
    //     setTotalCredit(newTotalCredit);
    // }, [transactions]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        }
    };

    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setMainData({ ...mainData, [e.target.name]: e.target.value });
    };

    const handleTransactionChange = (index: number, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedTransactions = transactions.map((t, i) => {
            if (i === index) {
                // return { ...t, [name]: value };

                // const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
                    
                //     // Update display values
                // const newDisplayValues = [...displayValues];
                // newDisplayValues[index] = formatCurrency(numericValue);
                // setDisplayValues(newDisplayValues);

                // return { ...t, [name]: name === 'debit' || name === 'credit' ? parseFloat(value) || 0 : numericValue };
                // Update display values for debit and credit separately
                const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;

                if (name === 'debit' || name === 'credit') {
                    const newDisplayValues = {
                        ...displayValues,
                        [name]: [...displayValues[name]]
                    };
                    newDisplayValues[name][index] = formatCurrency(numericValue);
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
            flag: 'u',
        }]);
    };

    const handleReset = () => {
        setTransactions([{ ...initialTransaction }]);
    };

    return (
        <>
            <div className='bg-gray-100 shadow-md rounded-lg p-3 space-y-4 w-full'>
                <p className='text-md text-bold mt-1'>Catatan Transaksi:</p>
                <form onSubmit={handleSubmit}>

                    <div className='bg-gray-100 rounded-lg space-y-2'>
                        {/* TransactionMain fields */}
                        {/* <select
                            name="accountId"
                            className='border p-2 rounded w-full'
                            value={mainData.accountId}
                            onChange={handleMainChange}
                        >
                            <option value="">Akun</option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.code} - {account.name}
                                </option>
                            ))}
                        </select> */}

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
                            {/* <input
                                type="number"
                                name="accountId"
                                value={mainData.accountId}
                                onChange={handleMainChange}
                                placeholder="Account ID"
                                className='w-[100%] p-2 rounded'
                            /> */}

                        </div>

                        {/* <input
                            type="text"
                            name="description"
                            value={mainData.description}
                            onChange={handleMainChange}
                            placeholder="Uraian transaksi"
                            className='w-[100%] p-2 rounded'
                        /> */}

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
                                {/* <input
                                    type="number"
                                    name='credit'
                                    value={transaction.credit || ''}
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Kredit"
                                    className='w-[200px] p-2 rounded'
                                /> */}
                                {/* <input
                                    type="number"
                                    name='accountId'
                                    value={transaction.accountId}
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Account ID"
                                /> */}
                                {/* Add other Transaction fields as needed */}

                            </div>

                        ))}
                    </div>
                    <div className='flex flex-col gap-4 mt-4 mb-2'>
                        <div className='flex flex-row gap-2'>
                            <button className='bg-blue-500 text-white p-2 px-4 rounded-md' type="button" onClick={addTransaction}>Tambah transaksi</button>
                            <button
                                className={`text-white p-2 px-4 rounded-md ${isSubmitEnabled ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
                                type="submit"
                                disabled={!isSubmitEnabled}
                            >
                                SIMPAN
                            </button>
                            <button
                                className={`text-white p-2 px-4 rounded-md ${isResetEnabled ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
                                type="button"
                                onClick={handleReset}
                                disabled={!isResetEnabled}
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