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
                        <MenuBox1 title="AKTIVA LANCAR" desc="Akun Kas/Bank/dll" menulink='/x2?title=Aktiva+Lancar&type=1&group=1' />
                        <MenuBox1 title="AKTIVA TETAP" desc="Akun Aset" menulink='/x2?title=Aktiva+Tetap&type=1&group=2' />
                        <MenuBox1 title="AKTIVA LAIN-LAIN" desc="Akun Aktiva Lainnya" menulink='/x2?title=Aktiva+Lain-lain&type=1&group=3' />
                    </div>


                </div>

            </PageLayout>


        </>
    );
}
