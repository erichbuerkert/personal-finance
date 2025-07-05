import {
  LayoutDashboard,
  BanknoteArrowUp,
  BanknoteArrowDown,
  ArrowDownUp,
  AudioWaveform,
  ChartLine,
  Goal,
  Binoculars,
  HandHelping,
} from "lucide-react"

export const navData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Income",
    url: "/income",
    icon: BanknoteArrowUp,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: BanknoteArrowDown,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowDownUp,
  },
  {
    title: "Flow",
    url: "/flow",
    icon: AudioWaveform,
  },
  {
    title: "Investments",
    url: "/investments",
    icon: ChartLine,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Goal,
  },
  {
    title: "Projections",
    url: "/projections",
    icon: Binoculars,
  },
  {
    title: "Guidance",
    url: "/guidance",
    icon: HandHelping,
  },
]