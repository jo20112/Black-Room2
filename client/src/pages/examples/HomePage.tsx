import HomePage from "../HomePage";
import { ThemeProvider } from "@/lib/theme-provider";

export default function HomePageExample() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
