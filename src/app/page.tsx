"use client"

import Divider from "@/components/Divider";
import PageLayout from "@/components/PageLayout";
import MenuBox1 from "@/components/MenuBox1";
import MenuBox2 from "@/components/MenuBox2";
import MenuBox3 from "@/components/MenuBox3";
import global from "@/config.js";

export default function Home() {

  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  return (
    <>

      <PageLayout header={header} footer={footer}>

        <h1 className="text-3xl font-bold">Selamat datang!</h1>
        <p className="pt-3">GDPSApp - Anda pemakai Aplikasi Keuangan GKI Denpasar - Bali. Aplikasi ini membantu: Mencatat Transaksi, Pembukuan dan Membuat Laporan Posisi Keuangan. </p>

        <Divider />
        <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            <MenuBox1 title="JURNAL" desc="Entri Jurnal Umum" menulink='/jurnal' />
            <MenuBox1 title="KAS KERK" desc="Entri KAS KERK" menulink='/receive-keb' />
            <MenuBox1 title="BANK" desc="Entri Penerimaan BANK" menulink='/receive-other' />
            <MenuBox1 title="PENGELUARAN" desc="Entri Pengeluaran" menulink='/expense' />
            <MenuBox1 title="AKUN" desc="Daftar Akun" menulink='/coa' />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <MenuBox2 title="AKTIVITAS" desc="Laporan Aktivitas Bulanan" menulink='/aktivitas' />
            <MenuBox2 title="ARUS KAS" desc="Laporan Arus Kas Bulanan" menulink='/cashflow-recap' />
            <MenuBox2 title="BUKU BESAR" desc="Laporan Transaksi Buku Besar" menulink='/ledger' />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <MenuBox3 title="PENERIMAAN/PENGELUARAN" desc="Laporan Penerimaan/Pengeluaran Bulanan" menulink='/cashflow' />
            <MenuBox3 title="NERACA" desc="Laporan Neraca Bulanan" menulink='/neraca-t' />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

      </PageLayout>


    </>
  );
}
