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

                <h1 className="text-3xl font-bold">BUKU BESAR AKUN RIIL</h1>

                <Divider />
                <div className="flex flex-1 flex-col gap-4 pt-4 pb-5">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <MenuBox1 title="AKTIVA LANCAR" desc="Akun Kas/Bank/dll" menulink='/ledger-a?title=Aktiva+Lancar&type=1&group=1' />
                        <MenuBox1 title="AKTIVA TETAP" desc="Akun Aset" menulink='/ledger-a?title=Aktiva+Tetap&type=1&group=2' />
                        <MenuBox1 title="AKTIVA LAIN-LAIN" desc="Akun Aktiva Lainnya" menulink='/ledger-a?title=Aktiva+Lain-lain&type=1&group=3' />
                    </div>

                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <MenuBox3 title="KEWAJIBAN LANCAR" desc="Akun Kewajiban Lancar" menulink='/ledger-a?title=Kewajiban+Lancar&type=2&group=4' />
                        <MenuBox3 title="KEWAJIBAN JANGKA PANJANG" desc="Akun Kewajiban Jangka Panjang" menulink='/ledger-a?title=Kewajiban+Jangka+Panjang&type=2&group=5' />
                    </div>

                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <MenuBox3 title="ASET BERSIH" desc="Akun Aset Bersih" menulink='/ledger-a?title=Aset+Bersih&type=3&group=6' />
                        <MenuBox3 title="KENAIKAN/PENURUNAN ASET" desc="Akun Kenaikan/Penurunan Aset Bersih" menulink='/ledger-a?title=Kenaikan/Penurunan+Aset+Bersih&type=3&group=7' />
                    </div>


                </div>

            </PageLayout>


        </>
    );
}
