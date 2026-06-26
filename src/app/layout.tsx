import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}:{
  children:React.ReactNode;
}){

return(

<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
        {children}
      </div>
    </ThemeProvider>
  </body>
</html>

);

}