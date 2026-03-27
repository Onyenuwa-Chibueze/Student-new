import { Link } from "react-router-dom";
import { GraduationCap, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl text-foreground">
          <GraduationCap className="w-6 h-6 text-accent" />
          Pinnacle Academy
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-body">
          <a href="/#about" className="hover:text-foreground transition-colors">About</a>
          <a href="/#programs" className="hover:text-foreground transition-colors">Programs</a>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="gradient-accent text-accent-foreground font-medium">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
