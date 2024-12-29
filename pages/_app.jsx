// importation du css
import { ThemeProvider } from "@/contexts/themeContext";
import LayoutPage from "@/layouts/layout";
import "@/public/css/schedule.css";
import { usePathname } from "next/navigation";

export default function MyApp({ Component, pageProps }) {
    const pathname = usePathname()
    // Exclude specific paths from the layout
    const excludeLayoutPaths = ["/planification/planification"]; 
  
    if (excludeLayoutPaths.includes(pathname)) {
      return <Component {...pageProps} />;
    } else {
      return (
        <LayoutPage>
          
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
          
        </LayoutPage>
          
      );
    }
  }