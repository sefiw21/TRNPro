import { TaskbarMenu } from "@/components/layouts/header/components/TaskbarMenu.tsx";
import { motion } from "framer-motion";
import { Bell, ShieldAlert } from "lucide-react";
import Logo from "../../components/layouts/header/components/Logo.tsx";
import { BackButton, Button } from "../../components/Ui/forms/Button.tsx";
import Profile from "../profile/Profile.tsx";
import UsersTable from "./components/UsersTable.tsx";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 font-sans antialiased flex flex-col relative">

      {/* 1. AMBIENT BACKGROUND (Subtle red/blue mix for "Admin" authority) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. UNIFIED NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton className="hover:scale-105 transition-transform" />
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/10 transition-all rounded-full"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <div className="hidden md:block h-6 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2">
              <Profile />
              <TaskbarMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-10 pb-24 flex-1 flex flex-col">

        {/* Header Section */}
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {/* Admin Badge */}
            <div className="flex items-center gap-2 text-rose-500 mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">System Control</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-2">
              Manage user accounts, assign roles, and monitor system activity across the Debre Selam platform.
            </p>
          </motion.div>
        </header>

        {/* Data Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full flex-1"
        >
          {/* We wrap the table in a subtle glassmorphism card to make it pop off the background */}
          <div className="w-full rounded-2xl bg-[#0f172a]/40 backdrop-blur-md border border-white/5 shadow-xl overflow-hidden p-4 md:p-6">
            <UsersTable />
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default AdminDashboard;