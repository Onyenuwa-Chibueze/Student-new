import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Award, ArrowRight } from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";
import { programs } from "@/data/programs";
import campusHero from "@/assets/campus-hero.jpg";
import studentsLibrary from "@/assets/students-library.jpg";
import labImage from "@/assets/lab.jpg";
import classroomImage from "@/assets/classroom.jpg";
import TiltImage from "@/components/TiltImage";
import { useRef } from "react";

import ScatterGrid from "@/components/ScatterGrid";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { value: "5,200+", label: "Students Enrolled" },
  { value: "280+", label: "Faculty Members" },
  { value: "96%", label: "Graduate Employment" },
  { value: "45+", label: "Programs Offered" },
];

const Landing = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const heroImgX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 100, damping: 20 });
  const heroImgY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 100, damping: 20 });
  const heroScale = useSpring(1.1, { stiffness: 100, damping: 20 });

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    heroScale.set(1.15);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    heroScale.set(1.1);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingNavbar />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <motion.img src={campusHero} alt="Pinnacle Academy campus" className="w-full h-full object-cover" width={1920} height={1080}
            style={{ x: heroImgX, y: heroImgY, scale: heroScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60" />
        </motion.div>
        <motion.div className="container relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4" style={{ opacity: heroOpacity }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <GraduationCap className="w-4 h-4" /> Shaping Tomorrow's Leaders
            </motion.span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-display text-primary-foreground leading-tight max-w-4xl"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Pinnacle Academy <br />
            <motion.span
              className="text-secondary inline-block"
              initial={{ opacity: 0, y: 20, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Student Portal
            </motion.span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl font-body"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            A comprehensive admin dashboard to manage student profiles, track academic progress, and streamline school operations.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold px-8 text-base hover:opacity-90 transition-opacity">
                <Link to="/login">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 text-base font-semibold transition-all duration-300">
                <a href="#about">Learn More</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-secondary/10 blur-sm"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-secondary/10 blur-sm"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} className="text-center" variants={fadeInScale} custom={i}>
                <motion.div
                  className="text-3xl md:text-4xl font-display text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 150 }}
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideInLeft} custom={0}>
              <h2 className="text-3xl md:text-5xl font-display text-foreground">About <span className="text-accent">Pinnacle Academy</span></h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Founded in 1998, Pinnacle Academy has been at the forefront of education, nurturing young minds to become future leaders.
                Our state-of-the-art campus, world-class faculty, and innovative curriculum provide students with an unparalleled learning experience.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We believe in holistic development — academics, sports, arts, and community service. Our diverse community of students from 40+ countries creates a vibrant multicultural environment.
              </p>
              <motion.div className="mt-8 flex gap-4" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Button asChild className="gradient-accent text-accent-foreground font-medium">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight} custom={0}
            >
              <TiltImage
                src={studentsLibrary} alt="Students in library"
                className="rounded-xl shadow-elevated h-48 col-span-2 relative"
                width={1280} height={864}
              />
              <TiltImage
                src={labImage} alt="Science laboratory"
                className="rounded-xl shadow-card h-40 relative"
                width={800} height={600}
              />
              <TiltImage
                src={classroomImage} alt="Students collaborating in classroom"
                className="rounded-xl shadow-card h-40 relative"
                width={1280} height={864}
              />
              <motion.div
                className="rounded-xl gradient-hero flex items-center justify-center p-6 col-span-2"
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ perspective: 600 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-display text-primary-foreground">25+</div>
                  <div className="text-sm text-primary-foreground/70">Years of Excellence</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 grid md:grid-cols-3 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {[
              { icon: GraduationCap, title: "Academic Excellence", desc: "Rigorous curriculum designed to challenge and inspire students at every level." },
              { icon: Users, title: "Diverse Community", desc: "Students from 40+ countries creating a vibrant multicultural environment." },
              { icon: Award, title: "Award Winning", desc: "Nationally recognized programs with top rankings in STEM and humanities." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-card rounded-lg p-8 shadow-card border border-border hover:shadow-elevated transition-shadow"
                variants={fadeInScale} custom={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-4"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-6 h-6 text-accent-foreground" />
                </motion.div>
                <h3 className="text-xl font-display text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 bg-muted/50">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
          >
            <h2 className="text-3xl md:text-5xl font-display text-foreground">Programs <span className="text-accent">We Offer</span></h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our diverse range of {programs.length} programs designed to prepare students for success.
            </p>
          </motion.div>
          <ScatterGrid className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {programs.map((prog) => (
              <Link
                key={prog.slug}
                to={`/programs/${prog.slug}`}
                className="block bg-card rounded-lg p-6 border border-border shadow-card hover:shadow-elevated transition-all group"
              >
                <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <prog.icon className="w-8 h-8 text-accent mb-3" />
                </motion.div>
                <h3 className="text-lg font-display text-card-foreground group-hover:text-accent transition-colors">{prog.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{prog.shortDesc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </ScatterGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            className="gradient-hero rounded-2xl p-12 md:p-20 text-center relative overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInScale} custom={0}
          >
            {/* Animated background orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-secondary/10 blur-2xl"
              animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-secondary/10 blur-2xl"
              animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display text-primary-foreground">Ready to Manage Your Students?</h2>
              <p className="mt-4 text-primary-foreground/70 text-lg max-w-xl mx-auto">
                Sign in to access the admin dashboard and start managing student profiles, departments, and more.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold px-10 text-base hover:opacity-90 transition-opacity">
                    <Link to="/signup">Create Account <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 text-base font-semibold transition-all duration-300">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Pinnacle Academy. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#programs" className="hover:text-foreground transition-colors">Programs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
