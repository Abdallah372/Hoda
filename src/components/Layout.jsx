import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  return (
    <div className="min-h-screen bg-app transition-colors duration-500 flex flex-col">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 pt-16 lg:pt-16 pb-20 lg:pb-0 relative overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main
          className={`
            flex-1 transition-all duration-300 min-w-0
            ${isSidebarOpen ? "lg:mr-64" : "lg:mr-20"}
          `}
        >
          <div className="container-main py-6 sm:py-8 lg:py-10">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-1 left-4 right-4 z-50">
        <BottomNav onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
    </div>
  );
};

export default Layout;
