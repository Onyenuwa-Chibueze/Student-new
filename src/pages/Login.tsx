import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const floatingShapes = [
  { size: 80, x: "10%", y: "20%", delay: 0, duration: 7 },
  { size: 120, x: "85%", y: "15%", delay: 1, duration: 9 },
  { size: 60, x: "75%", y: "75%", delay: 2, duration: 6 },
  { size: 100, x: "15%", y: "80%", delay: 0.5, duration: 8 },
  { size: 40, x: "50%", y: "10%", delay: 1.5, duration: 5 },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      toast({ title: "Login failed", description: "Invalid email or password.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4 relative overflow-hidden">
      {/* Floating background shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/10 blur-xl"
          style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Home button */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button asChild variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-secondary/20 gap-2">
          <Link to="/"><ArrowLeft className="w-4 h-4" /> Back to Home</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="shadow-elevated border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-2">
            <motion.div
              className="mx-auto w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-3"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              <GraduationCap className="w-7 h-7 text-accent-foreground" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
              <CardDescription className="mt-1">Sign in to your admin dashboard</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === "email" ? "text-accent" : "text-muted-foreground"}`} />
                  <Input
                    id="email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your email" required
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === "password" ? "text-accent" : "text-muted-foreground"}`} />
                  <Input
                    id="password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••" required
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full gradient-accent text-accent-foreground font-semibold">Sign In</Button>
                </motion.div>
              </motion.div>
            </form>
            <motion.p
              className="mt-4 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
