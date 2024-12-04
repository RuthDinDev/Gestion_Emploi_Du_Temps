import Dashboard from "@/pages/dashboard/dashboard";
import FooterLayout from "./footer";
import SidebarPage from "./sidebar";
import { useShowSidebar } from "@/hooks/hooks";
import HeaderPage from "./header";


function LayoutPage({ children }) {
    const handleShowSidebar = useShowSidebar((state) => state.isShown);
    return (
      <div className={`relative flex flex-col justify-between  w-screen h-screen p-3 bg-[#f8fafc] dark:bg-[#18181b]  transition-all duration-300 ease-out`}>
        
        {/* Titre de la page */} 
          <title>Home | Schedule</title>


        {/* Contenu de la page */}

        {/* Zone du Header */}
          <HeaderPage/>

        {/* Dashboard Page Content Zone */}
        <div className="flex gap-x-3 w-full h-full overflow-hidden w-full transition-all duration-300 ease-out border dark:border-[#505050] rounded-md bg-transparent dark:bg-[#696969] overflow-y-auto scrollbar">
          {/* Dashboard Page SideBar Zone */}
          <SidebarPage />

          {/* le reste du corp du travail */}
          {children}
        </div>
      </div>
    );
  }
  
  export default LayoutPage;
  