"use client"

import Divider from "@/components/Divider";
import PageLayout from "@/components/PageLayout";
import MenuBox3 from "@/components/MenuBox3";
import global from "@/config.js";

export default function Home() {

    const header = <h4>{global.pageInfo.headerText}</h4>;
    const footer = <p>{global.pageInfo.footerText}</p>;

    return (
        <>

            <PageLayout header={header} footer={footer}>

                <h1 className="text-3xl font-bold">BUKU BESAR AKUN NOMINAL</h1>

                <Divider />
                <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <MenuBox3 title="PENERIMAAN PERSEMBAHAN" desc="Akun Penerimaan Persembahan" menulink='/ledger-b?title=Penerimaan+Persembahan&type=4&group=8' />
                        <MenuBox3 title="PENERIMAAN LAIN-LAIN" desc="Akun Penerimaan Lain-lain" menulink='/ledger-b?title=Penerimaan+Lain-lain&type=4&group=9' />
                    </div>

                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <MenuBox3 title="BIAYA OPERASIONAL" desc="Akun Biaya Operasional Gereja" menulink='/ledger-b?title=Biaya+Operasional&type=5&group=10' />
                        <MenuBox3 title="BIAYA SEKRETARIAT" desc="Akun Biaya Sekretariat" menulink='/ledger-b?title=Biaya+Sekretariat&type=5&group=11' />
                        <MenuBox3 title="BIAYA BIDANG & BAPEL" desc="Akun Biaya Bidang & Bapel" menulink='/ledger-b?title=Biaya+Bidang+Bapel&type=5&group=12' />
                    </div>


                </div>

            </PageLayout>


        </>
    );
}
