"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children, title = "Tableau de bord" }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 