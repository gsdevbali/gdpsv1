'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"
import { saveTransaction } from './persembahanActionsNew';
import { getAccountsByGroup2 } from '@/actions/AccountAction';
import Divider from '@/components/Divider';

interface Account {
    id: number;
    code: string;
    name: string;
}

// interface MainData {
//     date: string;
//     description: string;
//     ref: string;
//     accountId: 2; // 2 is account id for Account: 'Kas Kerk'
// }

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


interface PersembahanFormProps {
    accountId: string;
}


const PersembahanForm: React.FC<PersembahanFormProps> = ({ accountId }) => {

    const [accounts, setAccounts] = useState<Account[]>([]);
    const { toast } = useToast()

    // fetch accounts by group2 id - khusus untuk penerimaan persembaha
    // 8 is group2 id for Group2: 'persembahan
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const fetchedAccounts = await getAccountsByGroup2(8); // 8 is group2 id for persembahan
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
    //const [setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    // Calculate totals immediately


    //const difference = Math.abs(totalDebit - totalCredit);
    //const isBalanced = difference === 0;

    // const isSubmitEnabled = isBalanced && transactions.length > 1;
    // Remove isBalanced and isSubmitEnabled
    const isResetEnabled = transactions.length > 1;

    const [displayValues, setDisplayValues] = useState<string[]>(transactions.map(() => ''));
    //const [setDisplayValues] = useState<string[]>(transactions.map(() => ''));

    // const formatCurrency = (value: number): string => {
    //     return new Intl.NumberFormat('id-ID', {
    //         style: 'currency',
    //         currency: 'IDR',
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     }).format(value);
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        }
    };

    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setMainData({ ...mainData, [e.target.name]: e.target.value });
    };

    const handleTransactionChange = (index: number, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // const updatedTransactions = transactions.map((t, i) => {
        //     if (i === index) {
        //         // return { ...t, [name]: value };
        //         return { ...t, [name]: name === 'debit' || name === 'credit' ? parseFloat(value) || 0 : value };
        //     }
        //     return t;
        // });
        const updatedTransactions = transactions.map((t, i) => {
            if (i === index) {
                if (name === 'debit') {
                    // Remove non-numeric characters and parse as float
                    const numericValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
                    return { ...t, [name]: numericValue };
                }
                return { ...t, [name]: value };
            }
            return t;
        });

        setTransactions(updatedTransactions);

        // const newTotalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);
        // const newTotalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);

        // setTotalDebit(newTotalDebit);
        // setTotalCredit(newTotalCredit);
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

    // const handleDebitChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = e.target.value.replace(/[^\d]/g, '');
    //     const numericValue = parseInt(inputValue, 10) || 0;

    //     // Update display value
    //     const newDisplayValues = [...displayValues];
    //     newDisplayValues[index] = inputValue;
    //     setDisplayValues(newDisplayValues);

    //     // Update actual transaction value
    //     handleTransactionChange(index, {
    //         target: {
    //             name: 'debit',
    //             value: numericValue.toString()
    //         }
    //     } as ChangeEvent<HTMLInputElement>);
    // };

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

    return (
        <>
            <div className='bg-gray-100 shadow-md rounded-lg p-3 space-y-4 w-full'>
                <p className='text-md text-bold mt-1'>Catatan Transaksi:</p>
                <form onSubmit={handleSubmit}>

                    <div className='bg-gray-100 rounded-lg space-y-2'>
                        {/* TransactionMain fields */}
                        {/* <input
                            type="number"
                            name="accountId"
                            value={mainData.accountId}
                            onChange={handleMainChange}
                            placeholder="Account ID"
                            className='w-[100%] p-2 rounded'
                        /> */}
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
                                        className='border p-2 rounded w-[100%] md:w-[400px] h-[40px]'
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
                                    className='w-[100%] md:w-[80%] p-2 rounded'
                                />
                                {/* <input
                                    type="number"
                                    name='debit'
                                    //value={transaction.debit || ''}
                                    //value={formatCurrency(transaction.debit)}
                                    //value={transaction.debit === 0 ? '' : formatCurrency(transaction.debit)}
                                    value={displayValues[index]}
                                    onChange={(e) => handleDebitChange(index, e)}
                                    onBlur={() => {
                                        const newDisplayValues = [...displayValues];
                                        newDisplayValues[index] = transactions[index].debit ? formatCurrency(transactions[index].debit) : '';
                                        setDisplayValues(newDisplayValues);
                                    }}
                                    onFocus={() => {
                                        const newDisplayValues = [...displayValues];
                                        newDisplayValues[index] = transactions[index].debit.toString();
                                        setDisplayValues(newDisplayValues);
                                    }}
                                    placeholder="Jumlah"
                                    className='w-[200px] p-2 rounded'
                                /> */}
                                <input
                                    type="number"
                                    name='credit'
                                    value={transaction.credit || ''}
                                    onChange={(e) => handleTransactionChange(index, e)}
                                    placeholder="Jumlah"
                                    className='w-[200px] p-2 rounded'
                                />
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
                                className='bg-blue-500 text-white p-2 px-4 rounded-md'
                                type="submit"
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
                                {/* <p>Total Penerimaan: {totalDebit}</p> */}
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

export default PersembahanForm;
