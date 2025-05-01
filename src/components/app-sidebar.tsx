"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Newspaper,
  Printer,
  Settings2,
  Table2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
//import { NavProjects } from "@/components/nav-projects"
//import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
//import ThemeToggle from "./ThemeToggle"
//import AppLogo from "./AppLogo"
// This is sample data.
const data = {
  user: {
    name: "GDPS-APP",
    email: "dev@gs.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "GDPS-APP",
      logo: GalleryVerticalEnd,
      plan: "v1.1",
    },
    {
      name: "dev2",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "dev3",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // APP-CUSTOM

    {
      title: "ENTRI DATA",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "JURNAL (Umum)",
          url: "/jurnal",
        },
        {
          title: "Penerimaan KAS KERK",
          url: "/receive-keb",
        },
        {
          title: "Penerimaan KAS & BANK",
          url: "/receive-other",
        },
        {
          title: "Pengeluaran",
          url: "/expense",
        },
      ],
    },

    {
      title: "RIWAYAT TRANSAKSI",
      url: "#",
      icon: Table2Icon,
      isActive: true,
      items: [
        {
          title: "Transaksi Semua",
          url: "/transaction-all",
        },
        // {
        //   title: "Transaksi Periode",
        //   url: "/transaction-q",
        // },


      ],
    },

    // {
    //   title: "ENTRI BAPEL",
    //   url: "/#",
    //   icon: Newspaper,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "KAS BON Sementara",
    //       url: "/#",
    //     },
    //     {
    //       title: "Realisasi",
    //       url: "/#",
    //     },

    //   ],
    // },

    // App-2

    {
      title: "AKUN (COA)",
      url: "#",
      icon: Table2Icon,
      isActive: true,
      items: [
        {
          title: "Daftar Akun",
          url: "/coa",
        },

      ],
    },

    {
      title: "LAPORAN",
      url: "#",
      icon: Printer,
      isActive: true,
      items: [
        {
          title: "NERACA",
          url: "/neraca-t",
        },
        {
          title: "Lampiran NERACA",
          url: "/lamp-neraca",
        },
        {
          title: "Neraca Saldo",
          url: "/neraca-saldo",
        },
        {
          title: "Neraca Saldo RIIL",
          url: "/neraca-saldo-riil",
        },
        {
          title: "Neraca Saldo NOMINAL",
          url: "/neraca-saldo-nom",
        },
        {
          title: "Aktivitas & Arus Kas",
          url: "/aktivitas",
        },
        // {
        //   title: "NERACA SALDO ASET BERSIH",
        //   url: "/neraca-saldo-ab",
        // },
        // {
        //   title: "ARUS KAS",
        //   url: "/cashflow-recap",
        // },
        {
          title: "Penerimaan / Pengeluaran",
          url: "/cashflow",
        },

        {
          title: "Buku Besar RIIL",
          url: "/ledger-riil",
        },

        {
          title: "Buku Besar NOMINAL",
          url: "/ledger-nom",
        },

        {
          title: "Buku Besar",
          url: "/ledger",
        },
        // {
        //   title: "NERACA SALDO",
        //   url: "/neraca-saldo",
        // },



      ],
    },



    {
      title: "Pengaturan",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "Awal",
          url: "#",
        },
        {
          title: "Periode",
          url: "#",
        },
        {
          title: "Lain",
          url: "#",
        },

      ],
    },
  ],
  // projects: [
  //   {
  //     name: "ASET",
  //     url: "#",
  //     icon: LandPlot,
  //   },
  //   {
  //     name: "PAYROL",
  //     url: "#",
  //     icon: PersonStanding,
  //   },
  //   {
  //     name: "KONTAK",
  //     url: "#",
  //     icon: ListIcon,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="print:hidden">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        {/* <AppLogo /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
        {/* <ThemeToggle /> */}
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
