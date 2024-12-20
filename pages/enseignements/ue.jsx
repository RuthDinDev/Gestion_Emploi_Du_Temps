import Profil from "@/components/generals/profil.component";
import FooterLayout from "@/layouts/footer";
import SidebarPage from "@/layouts/sidebar";
import { MdLightMode } from "react-icons/md";

function UePage(){
    return(
        <div className="p-2 l-0 border-black sm:ml-64">
            {/* titre de la page */}
        <title>Home | UE</title>

            <div className="flex flex-col gap-y-4">
                tous le contenu de UE ici
            </div>
            
        </div>
    )

}
export default UePage;