// importation du css
import LayoutPage from "@/layouts/layout";
import "@/public/css/schedule.css";
import { usePathname } from "next/navigation";

export default function MyApp({ Component, pageProps }) {
    const pathname = usePathname()
    // Exclude specific paths from the layout
    const excludeLayoutPaths = ["/pdf/pdf-renderer"]; 
  
    if (excludeLayoutPaths.includes(pathname)) {
      return <Component {...pageProps} />;
    } else {
      return (
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
          
      );
    }
  }