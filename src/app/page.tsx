import Divider from "@/components/Divider";
import PageLayout from "@/components/PageLayout";
import global from "@/config.js";

export default function Home() {
  const header = <h4>{global.pageInfo.headerText}</h4>;
  const footer = <p>{global.pageInfo.footerText}</p>;
  return (
    <>
            <PageLayout header={header} footer={footer}>
                <h1 className="text-3xl font-bold">Selamat datang!</h1>

                <Divider />

            </PageLayout>
        </>
  );
}
