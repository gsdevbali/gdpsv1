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
      plan: "v1.0",
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
      title: "DAFTAR",
      url: "/transaction-all",
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

    {
      title: "ENTRI",
      url: "/jurnal",
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
      title: "ENTRI BAPEL",
      url: "/#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "KAS BON Sementara",
          url: "/#",
        },
        {
          title: "Realisasi",
          url: "/#",
        },

      ],
    },

    // App-2

    {
      title: "AKUN",
      url: "/coa",
      icon: Table2Icon,
      isActive: true,
      items: [
        {
          title: "Daftar (COA)",
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
          title: "AKTIVITAS",
          url: "/aktivitas",
        },
        {
          title: "ARUS KAS",
          url: "/cashflow-recap",
        },
        {
          title: "Penerimaan / Pengeluaran",
          url: "/cashflow",
        },

        {
          title: "BUKU BESAR RIIL",
          url: "/ledger-riil",
        },

        {
          title: "BUKU BESAR NOMINAL",
          url: "/ledger-nom",
        },

        {
          title: "BUKU BESAR",
          url: "/ledger",
        },
        {
          title: "NERACA",
          url: "/neraca-t",
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
