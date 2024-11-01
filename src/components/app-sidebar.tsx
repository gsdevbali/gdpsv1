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
        {
          title: "Transaksi Periode",
          url: "/transaction-q",
        },
        // {
        //   title: "List Other",
        //   url: "/list-other",
        // },
        // {
        //   title: "Trans test",
        //   url: "/list-transaction",
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
        // {
        //   title: "Tipe Akun",
        //   url: "/coa-type",
        // },
        // {
        //   title: "Group Akun",
        //   url: "/coa-group1",
        // },
        // {
        //   title: "Group Akun-2",
        //   url: "/coa-group2",
        // },
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
          url: "/rep-activity",
        },
        // {
        //   title: "BUKU BESAR",
        //   url: "/rep-ledger",
        // },
        // {
        //   title: "NERACA",
        //   url: "/rep-balance",
        // },
        {
          title: "NERACA",
          url: "/neraca",
        },
      ],
    },

    // {
    //   title: "TEST",
    //   url: "#",
    //   icon: Table2Icon,
    //   isActive: true,
    // },
    // End App-Custom



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
