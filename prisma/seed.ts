//import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {


  const tag  = 
  [
      {
        "id": 1,
        "name": "persembahan",
        "flag": ""
      },
      {
        "id": 2,
        "name": "operasional",
        "flag": ""
      },
      {
        "id": 3,
        "name": "biaya",
        "flag": ""
      },
      {
        "id": 4,
        "name": "aset",
        "flag": ""
      }
  ]

  for (const data of tag) {
    await prisma.tag.upsert({
      where: { name: data.name },
      update: {},
      create: {
        id: data.id,
        name: data.name,
        flag: data.flag,
      },
    });
  }
  
  console.log('Seeding data for Tag completed.');


  // Seed data untuk AccountType
  const accountType = 
  [
    {
      "id": 1,
      "name": "Aktiva",
      "flag": "D"
    },
    {
      "id": 2,
      "name": "Kewajiban",
      "flag": "D"
    },
    {
      "id": 3,
      "name": "Aset Bersih",
      "flag": "K"
    },
    {
      "id": 4,
      "name": "Penerimaan",
      "flag": "K"
    },
    {
      "id": 5,
      "name": "Biaya-biaya",
      "flag": "K"
    },
  ]
  //Upsert AccountType data
  //const accountTypeRecords = [];
  for (const data of accountType) {
    await prisma.accountType.upsert({
      where: { name: data.name },
      update: {},
      create: {
        id: data.id,
        name: data.name,
        flag: data.flag,
      },
    });
  }

  // Upsert AccountType data
  // const accountTypeRecords = [];
  // for (const type of accountTypes) {
  //   const accountType = await prisma.accountType.upsert({
  //     where: { type },
  //     update: {},
  //     create: { type },
  //   });
  //   accountTypeRecords.push(accountType);
  // }

  console.log('Seeding data for AccountType completed.');


  // Seed data untuk AccountGroup ( Pengelompokan di UI )
  const accountGroup = 
  [
    {
      "id": 1,
      "name": "KAS",
      "flag": "i"
    },
    {
      "id": 2,
      "name": "BANK",
      "flag": "i"
    },
    {
      "id": 3,
      "name": "DEPOSITO",
      "flag": "i"
    },
    {
      "id": 4,
      "name": "BON SEMENTARA BIDANG",
      "flag": "i"
    },
    {
      "id": 5,
      "name": "BON SEMENTARA BAPEL/KOMISI/PANITIA",
      "flag": "i"
    },
    {
      "id": 6,
      "name": "PIUTANG KARYAWAN & TPK",
      "flag": "o"
    },
    {
      "id": 7,
      "name": "PIUTANG JEMAAT",
      "flag": "o"
    },
    {
      "id": 8,
      "name": "PIUTANG RELOKASI",
      "flag": "o"
    },
    {
      "id": 9,
      "name": "BIAYA DIBAYAR DIMUKA DANA PERUMAHAN EMERITUS PENDETA",
      "flag": "o"
    },
    {
      "id": 10,
      "name": "TANAH",
      "flag": "a"
    },
    {
      "id": 11,
      "name": "BANGUNAN",
      "flag": "a"
    },
    {
      "id": 12,
      "name": "KENDARAAN",
      "flag": "a"
    },
    {
      "id": 13,
      "name": "INVENTARIS",
      "flag": "a"
    },
    {
      "id": 14,
      "name": "AKUMULASI PENYUSUTAN",
      "flag": "a"
    },
    {
      "id": 15,
      "name": "AKTIVA LAIN-LAIN",
      "flag": "a"
    },
    {
      "id": 16,
      "name": "HUTANG BIAYA",
      "flag": "o"
    },
    {
      "id": 17,
      "name": "HUTANG LAIN-LAIN",
      "flag": "o"
    },
    {
      "id": 18,
      "name": "KEWAJIBAN JANGKA PANJANG",
      "flag": "o"
    },
    {
      "id": 19,
      "name": "ASET BERSIH",
      "flag": "a"
    },
    {
      "id": 20,
      "name": "PENERIMAAN PERSEMBAHAN",
      "flag": "i"
    },
    {
      "id": 21,
      "name": "PENERIMAAN LAIN-LAIN/KHUSUS",
      "flag": "i"
    },
    {
      "id": 22,
      "name": "BIAYA OPERASIONAL GEREJA",
      "flag": "o"
    },
    {
      "id": 23,
      "name": "BIAYA SEKRETARIAT",
      "flag": "o"
    },
    {
      "id": 24,
      "name": "BIAYA BIDANG/BAPEL/KOMISI & PANITIA",
      "flag": "o"
    }
  ]
  // Upsert AccountGroup data
  // const accountGroupRecords = [];
  // for (const name of accountGroup) {
  //   const accountGroup = await prisma.accountGroup.upsert({
  //     where: { name },
  //     update: {},
  //     create: { name },
  //   });
  //   accountGroupRecords.push(accountGroup);
  // }

  //const accountGroupRecords = [];
  for (const data of accountGroup) {
    await prisma.accountGroup.upsert({
      where: { name: data.name },
      update: {},
      create: {
        id: data.id,
        name: data.name,
        flag: data.flag,
      },
    });
  }

  console.log('Seeding data for AccountGroup completed.');



  // Seed data untuk AccountGroup2 ( Pengelompokan di UI )
  const accountGroup2 = 
  [
    {
      "id": 1,
      "name": "Aktiva Lancar",
      "flag": "a"
    },
    {
      "id": 2,
      "name": "Aktiva Tetap",
      "flag": "a"
    },
    {
      "id": 3,
      "name": "Aktiva Lain-Lain",
      "flag": "a"
    },
    {
      "id": 4,
      "name": "Kewajiban Lancar",
      "flag": "k"
    },
    {
      "id": 5,
      "name": "Kewajiban Jangka Panjang",
      "flag": "k"
    },
    {
      "id": 6,
      "name": "Aset Bersih Awal",
      "flag": "k"
    },
    {
      "id": 7,
      "name": "Kenaikan ( Penurunan ) Aset Bersih",
      "flag": "k"
    },
    {
      "id": 8,
      "name": "Penerimaan Persembahan",
      "flag": "a"
    },
    {
      "id": 9,
      "name": "Penerimaan Lain-Lain",
      "flag": "a"
    },
    {
      "id": 10,
      "name": "Biaya Operasional Gereja",
      "flag": "a"
    },
    {
      "id": 11,
      "name": "Biaya Sekretariat",
      "flag": "a"
    },
    {
      "id": 12,
      "name": "Biaya Bidang & Bapel",
      "flag": "a"
    }
  ]

  //const accountGroup2Records = [];
  for (const data of accountGroup2) {
    await prisma.accountGroup2.upsert({
      where: { name: data.name },
      update: {},
      create: {
        id: data.id,
        name: data.name,
        flag: data.flag,
      },
    });
  }

  console.log('Seeding data for AccountGroup2 completed.');

  
// Seed data untuk Account
const accounts = 
[
  {
    "accountTypeId": 1,
    "accountGroupId": 1,
    "accountGroup2Id": 1,
    "code": "11.10.001",
    "name": "Kas Kecil"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 1,
    "accountGroup2Id": 1,
    "code": "11.11.001",
    "name": "Kas Kerk"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.21.001",
    "name": "Bank BCA 7725421222"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.22.001",
    "name": "Bank BCA 7725576366"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.25.001",
    "name": "Bank BCA Bajem"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.29.001",
    "name": "Bank BCA 7725422300"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.29.002",
    "name": "Bank Mandiri Taspen Pos"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.29.003",
    "name": "Bank Mandiri"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 2,
    "accountGroup2Id": 1,
    "code": "11.29.004",
    "name": "Bank BRI X532"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.001",
    "name": "Deposito BPR Kas Seri 3016"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.002",
    "name": "Deposito BPR Kas Seri 3298"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.003",
    "name": "Deposito Mandiri Taspen Pos Seri BD 891137"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.004",
    "name": "Deposito Mandiri Taspen Pos seri BD 996555"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.005",
    "name": "Deposito Mandiri Taspen Pos seri BD 1017183"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.006",
    "name": "Deposito Mandiri Taspen Pos seri BD 1038813"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 3,
    "accountGroup2Id": 1,
    "code": "11.30.007",
    "name": "Deposito Mandiri seri AF 323978"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 4,
    "accountGroup2Id": 1,
    "code": "11.41.000",
    "name": "Bon Sementara Bidang Persekutuan"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 4,
    "accountGroup2Id": 1,
    "code": "11.42.000",
    "name": "Bon Sementara Bidang Kespel"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 4,
    "accountGroup2Id": 1,
    "code": "11.43.000",
    "name": "Bon Sementara Bidang Pembinaan"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 4,
    "accountGroup2Id": 1,
    "code": "11.44.000",
    "name": "Bon Sementara Bidang Kategorial"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 4,
    "accountGroup2Id": 1,
    "code": "11.45.000",
    "name": "Bon Sementara Bidang Sarpras"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.41.100",
    "name": "Bon Sementara Komulit"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.42.100",
    "name": "Bon Sementara KPK"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.42.200",
    "name": "Bon Sementara Bajem"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.44.100",
    "name": "Bon Sementara Komisi Anak"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.44.200",
    "name": "Bon Sementara Komisi Remaja"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.44.300",
    "name": "Bon Sementara Komisi Pemuda"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.44.400",
    "name": "Bon Sementara Komisi Dewasa"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.45.100",
    "name": "Bon Sementara Komisi Audio Visual"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.48.100",
    "name": "Bon Sementara Panter I"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.48.200",
    "name": "Bon Sementara Panter II"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 5,
    "accountGroup2Id": 1,
    "code": "11.49.100",
    "name": "Bon Sementara PPGG"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 6,
    "accountGroup2Id": 1,
    "code": "11.51.001",
    "name": "Piutang TPK DOB"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 6,
    "accountGroup2Id": 1,
    "code": "11.51.002",
    "name": "Piutang Afrid Omega"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 7,
    "accountGroup2Id": 1,
    "code": "11.52.001",
    "name": "Piutang Nana"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 7,
    "accountGroup2Id": 1,
    "code": "11.52.002",
    "name": "Piutang Anastasia"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 8,
    "accountGroup2Id": 1,
    "code": "11.59.001",
    "name": "Piutang Januar Pribadi"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 8,
    "accountGroup2Id": 1,
    "code": "11.59.002",
    "name": "Piutang Pembelian Mobil"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 9,
    "accountGroup2Id": 1,
    "code": "11.60.001",
    "name": "Dana Perumahan Emeritus Pendeta YA"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 9,
    "accountGroup2Id": 1,
    "code": "11.60.002",
    "name": "Dana Perumahan Emeritus Pendeta MC"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 10,
    "accountGroup2Id": 2,
    "code": "12.10.001",
    "name": "Tanah JL Raya Puputan 156, Denpasar"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 10,
    "accountGroup2Id": 2,
    "code": "12.10.002",
    "name": "Tanah JL Tukad Badung XIII/8, Denpasar"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 10,
    "accountGroup2Id": 2,
    "code": "12.10.003",
    "name": "Tanah Desa Sanur Kaja, Densel, Denpasar"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 11,
    "accountGroup2Id": 2,
    "code": "12.20.001",
    "name": "Gedung Gereja Jl Raya Puputan 156, Denpasar"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 11,
    "accountGroup2Id": 2,
    "code": "12.20.002",
    "name": "Gedung Pastori Jl Tukad Badung XIII/8, Denpasar"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 12,
    "accountGroup2Id": 2,
    "code": "12.30.001",
    "name": "Honda Hitam Revo"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 12,
    "accountGroup2Id": 2,
    "code": "12.30.002",
    "name": "Honda Merah Vario"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 12,
    "accountGroup2Id": 2,
    "code": "12.30.003",
    "name": "Toyota Avanza 1,5 G MT Dark Grey"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 13,
    "accountGroup2Id": 2,
    "code": "12.41.000",
    "name": "Inventaris Kantor"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 13,
    "accountGroup2Id": 2,
    "code": "12.42.000",
    "name": "Inventaris Ibadah"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 13,
    "accountGroup2Id": 2,
    "code": "12.43.000",
    "name": "Inventaris Pastori"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 13,
    "accountGroup2Id": 2,
    "code": "12.44.000",
    "name": "Inventaris Bajem"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 14,
    "accountGroup2Id": 2,
    "code": "12.92.000",
    "name": "Akumulasi Penyusutan Gedung"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 14,
    "accountGroup2Id": 2,
    "code": "12.93.000",
    "name": "Akumulasi Penyusutan Kendaraan"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 14,
    "accountGroup2Id": 2,
    "code": "12.94.000",
    "name": "Akumulasi Penyusutan Inventaris"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 15,
    "accountGroup2Id": 3,
    "code": "13.10.000",
    "name": "Tanah Dalam Penyelesaian"
  },
  {
    "accountTypeId": 1,
    "accountGroupId": 15,
    "accountGroup2Id": 3,
    "code": "13.20.001",
    "name": "Gedung Dalam Penyelesaian Gereja Sanur"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 16,
    "accountGroup2Id": 4,
    "code": "21.11.000",
    "name": "Dana Titipan Pernikahan"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 16,
    "accountGroup2Id": 4,
    "code": "21.12.000",
    "name": "Dana Titipan Bina Pranikah"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 16,
    "accountGroup2Id": 4,
    "code": "21.19.001",
    "name": "Hutang TJBJ Sinode Wilayah"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 16,
    "accountGroup2Id": 4,
    "code": "21.19.002",
    "name": "Hutang TJBJ Klasis"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 17,
    "accountGroup2Id": 4,
    "code": "21.90.001",
    "name": "Hutang Pembelian Mobil"
  },
  {
    "accountTypeId": 2,
    "accountGroupId": 18,
    "accountGroup2Id": 5,
    "code": "22.10.000",
    "name": "Hutang Lebih Dari 1 Tahun"
  },
  {
    "accountTypeId": 3,
    "accountGroupId": 19,
    "accountGroup2Id": 6,
    "code": "31.10.000",
    "name": "Aset Bersih Awal Bulan/Tahun"
  },
  {
    "accountTypeId": 3,
    "accountGroupId": 19,
    "accountGroup2Id": 7,
    "code": "32.10.000",
    "name": "Kenaikan ( Penurunan ) Aset Bersih"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.01.000",
    "name": "Kantong Merah"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.02.000",
    "name": "Perpuluhan"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.03.000",
    "name": "Sampul Bulanan"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.04.000",
    "name": "Sampul Syukur/Nazar"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.05.000",
    "name": "Persembahan Anak"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.06.000",
    "name": "Persembahan Remaja"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.07.000",
    "name": "Persembahan Pemuda"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.08.001",
    "name": "Persembahan Dewasa Muda"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.08.002",
    "name": "Persembahan Dewasa"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.08.003",
    "name": "Persembahan Usia Indah"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.08.004",
    "name": "Persembahan Pasutri"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.09.000",
    "name": "Persembahan Syukur/Sektor"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.10.000",
    "name": "Hari Raya Gerejawi"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 20,
    "accountGroup2Id": 8,
    "code": "41.11.000",
    "name": "Kebaktian Pernikahan"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 8,
    "code": "42.01.000",
    "name": "Penerimaan Relokasi"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 8,
    "code": "42.02.000",
    "name": "Penerimaan Kantong Ungu"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 9,
    "code": "42.09.001",
    "name": "Bunga Deposito KAS"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 9,
    "code": "42.09.002",
    "name": "Bunga Deposito & Tabungan Mandiri Taspen Pos"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 9,
    "code": "42.09.003",
    "name": "Bunga Deposito & Tabungan Mandiri"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 9,
    "code": "42.09.004",
    "name": "Bunga Deposito & Tabungan BRI X532"
  },
  {
    "accountTypeId": 4,
    "accountGroupId": 21,
    "accountGroup2Id": 9,
    "code": "42.99.999",
    "name": "Penerimaan Lain-Lain"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.001",
    "name": "Jaminan Kebutuhan Hidup & Tunjangan Pendeta"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.002",
    "name": "Jaminan Kebutuhan Hidup TPK DO"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.003",
    "name": "JKH TPK SE"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.004",
    "name": "Premi dana pensiun Pdt YA + MC"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.005",
    "name": "Reimburse Pendeta"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.006",
    "name": "Reimburse TPK DOB"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.007",
    "name": "Reimburse TPK SES"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.008",
    "name": "TJBJ Sinwil & Klasis"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.009",
    "name": "Tunjangan cuti tahunan pdt & TPK"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.010",
    "name": "Gaji Karyawan"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.011",
    "name": "Maintenance + Listrik Aston"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.012",
    "name": "Biaya administrasi bank + pajak bunga"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.013",
    "name": "Tali Asih/Bantuan/Sumbangan"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.998",
    "name": "Penyusutan"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 22,
    "accountGroup2Id": 10,
    "code": "51.00.999",
    "name": "Lain-Lain"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.001",
    "name": "Biaya Perlengkapan Kantor Gereja"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.002",
    "name": "Keperluan/Perlengkapan Rumah Tangga Gereja"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.003",
    "name": "Administrasi Bank"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.004",
    "name": "Pemeliharaan/Perlengkapan Gereja"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.005",
    "name": "Biaya Keamanan"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.006",
    "name": "Konsumsi Minggu, Rapat"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.007",
    "name": "BPJS Tenaga Kerja & BPJS Kesehatan"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.008",
    "name": "Listrik & PDAM Gereja & Pastori"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.009",
    "name": "Fax + Telepon Gereja"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.010",
    "name": "Iuran Sampah"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.011",
    "name": "Sarpras"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 23,
    "accountGroup2Id": 11,
    "code": "52.00.999",
    "name": "Lain-Lain"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.001",
    "name": "Biaya Bidang Persekutuan LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.002",
    "name": "Biaya Bidang Persekutuan KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.003",
    "name": "Biaya Bidang Persekutuan KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.004",
    "name": "Biaya Bidang Persekutuan DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.005",
    "name": "Biaya Bidang Persekutuan MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.006",
    "name": "Biaya Bidang Persekutuan KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.101",
    "name": "Biaya Komulit LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.102",
    "name": "Biaya Komulit KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.103",
    "name": "Biaya Komulit KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.104",
    "name": "Biaya Komulit DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.105",
    "name": "Biaya Komulit MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.41.106",
    "name": "Biaya Komulit KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.001",
    "name": "Biaya Bidang Kespel LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.002",
    "name": "Biaya Bidang Kespel KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.003",
    "name": "Biaya Bidang Kespel KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.004",
    "name": "Biaya Bidang Kespel DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.005",
    "name": "Biaya Bidang Kespel MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.006",
    "name": "Biaya Bidang Kespel KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.101",
    "name": "Biaya KPK LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.102",
    "name": "Biaya KPK KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.103",
    "name": "Biaya KPK KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.104",
    "name": "Biaya KPK DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.105",
    "name": "Biaya KPK MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.106",
    "name": "Biaya KPK KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.201",
    "name": "Biaya Bajem LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.202",
    "name": "Biaya Bajem KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.203",
    "name": "Biaya Bajem KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.204",
    "name": "Biaya Bajem DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.205",
    "name": "Biaya Bajem MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.42.206",
    "name": "Biaya Bajem KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.001",
    "name": "Biaya Bidang Pembinaan LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.002",
    "name": "Biaya Bidang Pembinaan KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.003",
    "name": "Biaya Bidang Pembinaan KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.004",
    "name": "Biaya Bidang Pembinaan DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.005",
    "name": "Biaya Bidang Pembinaan MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.43.006",
    "name": "Biaya Bidang Pembinaan KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.001",
    "name": "Biaya Bidang Kategorial LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.002",
    "name": "Biaya Bidang Kategorial KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.003",
    "name": "Biaya Bidang Kategorial KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.004",
    "name": "Biaya Bidang Kategorial DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.005",
    "name": "Biaya Bidang Kategorial MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.006",
    "name": "Biaya Bidang Kategorial KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.101",
    "name": "Biaya Komisi Anak LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.102",
    "name": "Biaya Komisi Anak KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.103",
    "name": "Biaya Komisi Anak KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.104",
    "name": "Biaya Komisi Anak DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.105",
    "name": "Biaya Komisi Anak MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.106",
    "name": "Biaya Komisi Anak KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.201",
    "name": "Biaya Komisi Remaja LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.202",
    "name": "Biaya Komisi Remaja KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.203",
    "name": "Biaya Komisi Remaja KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.204",
    "name": "Biaya Komisi Remaja DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.205",
    "name": "Biaya Komisi Remaja MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.206",
    "name": "Biaya Komisi Remaja KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.301",
    "name": "Biaya Komisi Pemuda LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.302",
    "name": "Biaya Komisi Pemuda KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.303",
    "name": "Biaya Komisi Pemuda KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.304",
    "name": "Biaya Komisi Pemuda DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.305",
    "name": "Biaya Komisi Pemuda MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.306",
    "name": "Biaya Komisi Pemuda KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.401",
    "name": "Biaya Komisi Dewasa LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.402",
    "name": "Biaya Komisi Dewasa KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.403",
    "name": "Biaya Komisi Dewasa KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.404",
    "name": "Biaya Komisi Dewasa DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.405",
    "name": "Biaya Komisi Dewasa MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.44.406",
    "name": "Biaya Komisi Dewasa KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.001",
    "name": "Biaya Bidang Sarpras LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.002",
    "name": "Biaya Bidang Sarpras KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.003",
    "name": "Biaya Bidang Sarpras KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.004",
    "name": "Biaya Bidang Sarpras DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.005",
    "name": "Biaya Bidang Sarpras MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.006",
    "name": "Biaya Bidang Sarpras KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.101",
    "name": "Biaya Komisi Audio Visual LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.102",
    "name": "Biaya Komisi Audio Visual KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.103",
    "name": "Biaya Komisi Audio Visual KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.104",
    "name": "Biaya Komisi Audio Visual DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.105",
    "name": "Biaya Komisi Audio Visual MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.45.106",
    "name": "Biaya Komisi Audio Visual KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.101",
    "name": "Biaya Sementara Panter I LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.102",
    "name": "Biaya Sementara Panter I KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.103",
    "name": "Biaya Sementara Panter I KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.104",
    "name": "Biaya Sementara Panter I DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.105",
    "name": "Biaya Sementara Panter I MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.106",
    "name": "Biaya Sementara Panter I KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.201",
    "name": "Biaya Sementara Panter II LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.202",
    "name": "Biaya Sementara Panter II KERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.203",
    "name": "Biaya Sementara Panter II KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.204",
    "name": "Biaya Sementara Panter II DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.205",
    "name": "Biaya Sementara Panter II MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.48.206",
    "name": "Biaya Sementara Panter II KEPEMIMPINAN"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.101",
    "name": "Biaya PPGG LYTURGIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.102",
    "name": "Biaya PPGGKERYGMA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.103",
    "name": "Biaya PPGG KOINONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.104",
    "name": "Biaya PPGG DIAKONIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.105",
    "name": "Biaya PPGG MARTYRIA"
  },
  {
    "accountTypeId": 5,
    "accountGroupId": 24,
    "accountGroup2Id": 12,
    "code": "53.49.106",
    "name": "Biaya PPGG KEPEMIMPINAN"
  }
]

for (const data of accounts) {
  await prisma.account.upsert({
    where: { code: data.code },
    update: {},
    create: {
      code: data.code,
      name: data.name,
      accountTypeId: data.accountTypeId,
      accountGroupId: data.accountGroupId!,
      accountGroup2Id: data.accountGroup2Id!,
    },
  });
}

console.log('Seeding data for Account completed.');
}



  
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
