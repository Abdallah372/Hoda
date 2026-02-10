import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main
          className={`
            flex-grow transition-all duration-300 min-h-[calc(100vh-4rem)]
            ${isSidebarOpen ? "lg:mr-64" : "lg:mr-20"}
          `}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
