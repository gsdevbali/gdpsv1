"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LandPlot,
  ListIcon,
  Newspaper,
  PersonStanding,
  Printer,
  Settings2,
  Table2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
//import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import ThemeToggle from "./ThemeToggle"

// This is sample data.
const data = {
  user: {
    name: "dev",
    email: "dev@gs.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "dev1",
      logo: GalleryVerticalEnd,
      plan: "v1App",
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
      url: "#",
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

    // App-2

    {
      title: "AKUN",
      url: "#",
      icon: Table2Icon,
      isActive: true,
      items: [
        {
          title: "Daftar (COA)",
          url: "/coa",
        },
        {
          title: "Tipe Akun",
          url: "/coa-type",
        },
        {
          title: "Group 1",
          url: "/coa-group1",
        },
        {
          title: "Group 2",
          url: "/coa-group2",
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
          title: "AKTIVITAS R/L",
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

    // End App-Custom



    {
      title: "Pengaturan",
      url: "#",
      icon: Settings2,
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
  projects: [
    {
      name: "ASET",
      url: "#",
      icon: LandPlot,
    },
    {
      name: "PAYROL",
      url: "#",
      icon: PersonStanding,
    },
    {
      name: "KONTAK",
      url: "#",
      icon: ListIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}