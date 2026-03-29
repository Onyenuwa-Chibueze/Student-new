import { useState } from "react";
import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <section className="gradient-hero py-20">
        <div className="container px-4 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-display text-primary-foreground" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            Get in <span className="text-secondary">Touch</span>
          </motion.h1>
          <motion.p className="mt-4 text-primary-foreground/70 text-lg max-w-xl mx-auto" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            Have questions about admissions, programs, or campus life? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div className="space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div>
                <h2 className="text-2xl font-display text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Reach out through any of these channels or fill in the form.</p>
              </div>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Woman  lecture okpuno Awka" },
                  { icon: Phone, label: "Phone", value: "08155804562" },
                  { icon: Mail, label: "Email", value: "admissions@pinnacle.edu" },
                ].map((item) => (
                  <Card key={item.label} className="shadow-card">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Card className="shadow-elevated">
                <CardContent className="p-8">
                  <h3 className="text-xl font-display text-card-foreground mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help you?" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full gradient-accent text-accent-foreground font-semibold">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Pinnacle Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
