'use client';

import { format } from 'date-fns';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import { createTransaction } from '@/actions/TransEntryActions';
import { saveTransaction } from './TransactionActions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { getAccounts } from '@/actions/AccountAction';
// import JurnalUmumMain from './JurnalUmumMain';

//

// interface Account {
//     id: number;
//     code: string;
//     name: string;
// }

// interface TransactionDetail {
//     date: string;
//     description: string;
//     ref: string;
//     mediaPath: string;
//     debit: number;
//     credit: number;
//     accountId: number;
// }

// to reset
// const initialTransaction: TransactionDetail = {
//     date: '',
//     description: '',
//     ref: '',
//     mediaPath: '',
//     debit: 0,
//     credit: 0,
//     accountId: 0,
// };

export default function JurnalUmum() {

    // const [mainData, setMainData] = useState({
    //     date: format(new Date(), 'yyyy-MM-dd'), // Initialize with today's date
    //     description: '',
    //     ref: '',
    //     accountId: 0,
    // });

    const [transactions, setTransactions] = useState<TransactionDetail[]>([{
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        ref: '',
        mediaPath: '',
        debit: 0,
        credit: 0,
        accountId: 0,
    }]);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    // const [accounts, setAccounts] = useState<Account[]>([]);
    //const router = useRouter();

    const difference = Math.abs(totalDebit - totalCredit);
    const isBalanced = difference === 0;


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

    useEffect(() => {
        const newTotalDebit = transactions.reduce((sum, transaction) => sum + transaction.debit, 0);
        const newTotalCredit = transactions.reduce((sum, transaction) => sum + transaction.credit, 0);
        setTotalDebit(newTotalDebit);
        setTotalCredit(newTotalCredit);
    }, [transactions]);

    const handleAddTransaction = () => {
        setTransactions([...transactions, {
            date: '',
            description: '',
            ref: '',
            mediaPath: '',
            debit: 0,
            credit: 0,
            accountId: 0,
        }]);
    };

    const handleMainChange = (e) => {
        const { name, value } = e.target;
        const newMainData = { ...mainData, [name]: value };
        setMainData(newMainData);

        if (name === 'date') {
            const updatedTransactions = transactions.map(transaction => ({
                ...transaction,
                date: value
            }));
            setTransactions(updatedTransactions);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = {
            ...updatedTransactions[index],
            [field]: value,
            date: mainData.date // Always use the date from mainData
        };

        // If the user is entering a debit value, clear the credit value and vice versa
        if (field === 'debit' && value !== 0) {
            updatedTransactions[index].credit = 0;
        } else if (field === 'credit' && value !== 0) {
            updatedTransactions[index].debit = 0;
        }

        console.log(updatedTransactions)
        setTransactions(updatedTransactions);
    };
    // const handleChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const updatedTransactions = transactions.map((t, i) => {
    //       if (i === index) {
    //         return { ...t, [name]: value };
    //       }
    //       return t;
    //     });
    //     setTransactions(updatedTransactions);
    //   };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (transactions.length < 2) {
    //         alert('Minimal dua transaksi diperlukan untuk jurnal umum.');
    //         return;
    //     }
    //     try {
    //         await createTransaction(transactions);
    //         router.push('/jurnal'); // Redirect to transactions list page
    //     } catch (error) {
    //         console.error('Error creating transactions:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        console.log("formData")
        console.log(formData)

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

    const handleSubmitX = async (e) => {
        e.preventDefault();

        if (!isBalanced || transactions.length < 2) {
            alert('Transaksi harus seimbang dan minimal memiliki dua entri.');
            return;
        }

        const data = {
            main: {
                date: mainData.date,
                description: mainData.description,
                ref: mainData.ref,
                accountId: Number(mainData.accountId),
            },
            details: transactions.map(t => ({
                accountId: Number(t.accountId),
                debit: Number(t.debit),
                credit: Number(t.credit),
                description: t.description,
                date: mainData.date,
            }))
        };

        try {
            const result = await saveTransaction(data);
            console.log('Transaction saved:', result);
            // Handle successful submission (e.g., show success message, reset form)
            handleReset();
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Error saving transaction. Please try again.');
        }
    };

    const handleReset = () => {
        setTransactions([{ ...initialTransaction }]);
    };

    return (
        <>
            <h5>KETERANGAN:</h5>
            <div className='bg-gray-100 shadow-md rounded-lg p-3 space-y-4'>

                {/* <JurnalUmumMain /> */}

                {/* Start of Main Form */}

                <form>
                    <div>
                        <select
                            name="accountId"
                            className='border p-2 rounded w-[100%]'
                            value={mainData.accountId}
                            onChange={handleMainChange}
                        >
                            <option value="">Select an account</option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.code} - {account.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 space-y-4 gap-2'>


                        <div>
                            {/* <Label htmlFor="date" className="text-sm font-medium">Tanggal</Label> */}
                            <input
                                name="date"
                                value={mainData.date}
                                onChange={handleMainChange}
                                type="date"
                                id="date"
                                className="flex rounded-md border p-2 p-2 w-[100%]"
                            />
                        </div>
                        <div>
                            {/* <Label htmlFor="reference" className="text-sm font-medium">Nomor</Label> */}
                            <input
                                name="ref"
                                value={mainData.ref}
                                onChange={handleMainChange}
                                type="text"
                                id="reference"
                                className="flex rounded-md border p-2 p-2 w-[100%]"
                                placeholder="Nomor referensi"
                            />
                        </div>
                        <div>
                            {/* <Label htmlFor="tag" className="text-sm font-medium">Nomor</Label> */}
                            <input
                                //value={mainData.accountId}
                                name="tag"
                                type="text"
                                id="tag"
                                className="flex rounded-md border p-2 p-2 w-[100%]"
                                placeholder="Tag"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="description" className="text-sm font-medium">Deskripsi</Label>
                            <textarea
                                name="description"
                                value={mainData.description}
                                onChange={handleMainChange}
                                id="description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Uraian transaksi"
                            ></textarea>
                        </div>

                    </div>

                </form>


                {/* end of Main Form */}
            </div>
            <div className='container mx-auto py-4'>

                <div className='flex justify-between gap-2'>
                    <p className='w-[80px] text-center'></p>
                    <p className='w-[100%] text-center'>Akun</p>
                    <p className='w-[100%] text-center'>Deskripsi</p>
                    <p className='w-[100%] text-center'>Debit</p>
                    <p className='w-[100%] text-center'>Kredit</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-3'>

                    {transactions.map((transaction, index) => (
                        <div key={index} className='bg-gray-200 shadow-md rounded-lg p-3 gap-4'>
                            <div className='flex justify-between gap-2'>
                                {/* <Label>Akun: </Label> */}
                                <p className='text-lg text-bold w-[80px]'>{index + 1}</p>
                                <select
                                    value={transaction.accountId}
                                    onChange={(e) => handleChange(index, 'accountId', parseInt(e.target.value))}
                                    required
                                    className='border p-2 rounded w-[100%]'
                                >
                                    <option value="">Select an account</option>
                                    {accounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.code} - {account.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    value={transaction.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    placeholder="Description"
                                    required
                                    className='border p-2 rounded w-[100%]'
                                />

                                <input
                                    type="number"
                                    value={transaction.debit || ''}
                                    onChange={(e) => handleChange(index, 'debit', parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    className='border p-2 rounded w-[100%]'
                                    disabled={transaction.credit > 0}
                                />

                                <input
                                    type="number"
                                    value={transaction.credit || ''}
                                    onChange={(e) => handleChange(index, 'credit', parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    className='border p-2 rounded w-[100%]'
                                    disabled={transaction.debit > 0}
                                />

                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between items-center bg-gray-600 shadow-md rounded-lg p-6'>
                        <div>
                            <Button type="button" onClick={handleAddTransaction} className="mr-2">Tambah</Button>
                            <Button type="button" onClick={handleReset} variant="outline">Reset</Button>
                        </div>
                        <div>
                            {/* <p>Total Debit: {totalDebit.toFixed(2)}</p> */}
                            {/* <p>Total Credit: {totalCredit.toFixed(2)}</p> */}
                            <p className={isBalanced ? 'text-green-300' : 'text-orange-500'}>
                                Perbedaan: {difference.toFixed(2)}
                            </p>
                        </div>
                        <Button
                            type="submit"
                            disabled={!isBalanced || transactions.length < 2}
                        >
                            SIMPAN Transaksi
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}