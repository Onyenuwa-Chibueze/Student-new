import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { programs } from "@/data/programs";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const ProgramDetail = () => {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <LandingNavbar />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-display">Program Not Found</h1>
          <Button asChild className="mt-6"><Link to="/#programs">Back to Programs</Link></Button>
        </div>
      </div>
    );
  }

  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Banner */}
      <section className="gradient-hero py-20">
        <div className="container px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Link to="/#programs" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Programs
            </Link>
          </motion.div>
          <motion.div className="flex items-center gap-4 mb-4" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center">
              <Icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display text-primary-foreground">{program.name}</h1>
            </div>
          </motion.div>
          <motion.div className="flex flex-wrap gap-6 mt-6" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <Clock className="w-4 h-4" /> {program.duration}
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <GraduationCap className="w-4 h-4" /> {program.degree}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl font-display text-foreground mb-4">About This Program</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{program.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 mt-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <h3 className="text-xl font-display text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Program Highlights
              </h3>
              <ul className="space-y-3">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <h3 className="text-xl font-display text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" /> Career Paths
              </h3>
              <ul className="space-y-3">
                {program.careers.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div className="mt-16 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
            <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold px-10">
              <Link to="/contact">Apply Now</Link>
            </Button>
          </motion.div>
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

export default ProgramDetail;
