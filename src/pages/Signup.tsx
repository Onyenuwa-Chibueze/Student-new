import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, User, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const floatingShapes = [
  { size: 90, x: "8%", y: "25%", delay: 0.2, duration: 8 },
  { size: 110, x: "88%", y: "12%", delay: 0.8, duration: 7 },
  { size: 70, x: "80%", y: "70%", delay: 1.5, duration: 6 },
  { size: 50, x: "20%", y: "85%", delay: 0, duration: 9 },
  { size: 130, x: "45%", y: "5%", delay: 1, duration: 10 },
];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(name, email, password)) {
      navigate("/dashboard");
    } else {
      toast({ title: "Signup failed", description: "Email already exists.", variant: "destructive" });
    }
  };

  const fields = [
    { id: "name", label: "Full Name", type: "text", icon: User, value: name, setter: setName, placeholder: "Valerian Smith" },
    { id: "email", label: "Email", type: "email", icon: Mail, value: email, setter: setEmail, placeholder: "admin@pinnacle.edu" },
    { id: "password", label: "Password", type: "password", icon: Lock, value: password, setter: setPassword, placeholder: "••••••••", minLength: 6 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4 relative overflow-hidden">
      {/* Floating background shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/10 blur-xl"
          style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y }}
          animate={{ y: [0, -25, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
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
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ rotate: -12, scale: 1.1 }}
            >
              <GraduationCap className="w-7 h-7 text-accent-foreground" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <CardTitle className="font-display text-2xl">Create Account</CardTitle>
              <CardDescription className="mt-1">Join Pinnacle Academy admin portal</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field, i) => (
                <motion.div
                  key={field.id}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <div className="relative">
                    <field.icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === field.id ? "text-accent" : "text-muted-foreground"}`} />
                    <Input
                      id={field.id} type={field.type} value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder} required
                      minLength={field.minLength}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full gradient-accent text-accent-foreground font-semibold">Create Account</Button>
                </motion.div>
              </motion.div>
            </form>
            <motion.p
              className="mt-4 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
