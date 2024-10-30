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
                <p className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </p>

                <Divider />
                <div className="flex flex-1 flex-col gap-4 pt-4 pb-4">
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                      <div className="aspect-video rounded-xl bg-orange-100" />
                      <div className="aspect-video rounded-xl bg-green-100" />
                      <div className="aspect-video rounded-xl bg-blue-100" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>

            </PageLayout>
        </>
  );
}
