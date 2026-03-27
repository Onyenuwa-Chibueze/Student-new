import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/contexts/StudentContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, GraduationCap, BookOpen, UserPlus, ArrowRight, Clock, UserCheck, UserMinus, Pencil, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatDistanceToNow } from "date-fns";

const CHART_COLORS = [
  "hsl(45, 80%, 55%)",
  "hsl(220, 60%, 35%)",
  "hsl(160, 50%, 45%)",
  "hsl(0, 65%, 55%)",
  "hsl(280, 50%, 50%)",
  "hsl(30, 70%, 50%)",
  "hsl(190, 60%, 45%)",
  "hsl(340, 55%, 50%)",
];

const Dashboard = () => {
  const { user } = useAuth();
  const { students, activityLog } = useStudents();

  const departments = [...new Set(students.map((s) => s.department))];
  const firstName = user?.name.split(" ")[0] || "Admin";

  const deptData = departments.map((dept) => ({
    name: dept,
    value: students.filter((s) => s.department === dept).length,
  }));

  const ageGroups = [
    { range: "16-18", min: 16, max: 18 },
    { range: "19-21", min: 19, max: 21 },
    { range: "22-24", min: 22, max: 24 },
    { range: "25+", min: 25, max: 999 },
  ];
  const ageData = ageGroups.map((g) => ({
    range: g.range,
    count: students.filter((s) => s.age >= g.min && s.age <= g.max).length,
  }));

  const genderData = [
    { name: "Male", value: students.filter((s) => s.gender === "Male").length },
    { name: "Female", value: students.filter((s) => s.gender === "Female").length },
    { name: "Other", value: students.filter((s) => s.gender === "Other").length },
  ].filter((g) => g.value > 0);

  const GENDER_COLORS = ["hsl(220, 60%, 45%)", "hsl(340, 65%, 55%)", "hsl(160, 50%, 45%)"];

  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5);

  const recentActivity = activityLog.slice(0, 8);

  const activityIcon = (action: string) => {
    switch (action) {
      case "added": return <UserCheck className="w-4 h-4 text-green-500" />;
      case "edited": return <Pencil className="w-4 h-4 text-accent" />;
      case "deleted": return <UserMinus className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-foreground">
            Hi, <span className="text-accent">{firstName}</span> 👋
          </h1>
          <p className="mt-1 text-muted-foreground">Welcome to your admin dashboard</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-card-foreground">{students.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            <BookOpen className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-card-foreground">{departments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active departments</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Age</CardTitle>
            <GraduationCap className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-card-foreground">
              {students.length ? Math.round(students.reduce((a, s) => a + s.age, 0) / students.length) : "—"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Student age average</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Male / Female</CardTitle>
            <Users className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-card-foreground">
              {students.filter((s) => s.gender === "Male").length} / {students.filter((s) => s.gender === "Female").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Gender breakdown</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
            <TrendingUp className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display text-card-foreground">{activityLog.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total actions logged</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/dashboard/add-student">
          <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer group border-dashed border-2 hover:border-accent">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">Add Student</p>
                <p className="text-xs text-muted-foreground">Enroll a new student</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/students">
          <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer group border-dashed border-2 hover:border-accent">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">View All Students</p>
                <p className="text-xs text-muted-foreground">Browse student directory</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/">
          <Card className="shadow-card hover:shadow-elevated transition-all cursor-pointer group border-dashed border-2 hover:border-accent">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">Visit Website</p>
                <p className="text-xs text-muted-foreground">Go to landing page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Students by Department</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            {deptData.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-10">No data yet. Add students to see the chart.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                      {deptData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {deptData.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {deptData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Age Distribution</CardTitle>
            <CardDescription>Student age groups</CardDescription>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-10">No data yet. Add students to see the chart.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="range" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                    <Bar dataKey="count" fill="hsl(45, 80%, 55%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Gender Distribution</CardTitle>
            <CardDescription>Male vs Female vs Other</CardDescription>
          </CardHeader>
          <CardContent>
            {genderData.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-10">No data yet. Add students to see the chart.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                      {genderData.map((_, i) => (
                        <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {genderData.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {genderData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: GENDER_COLORS[i % GENDER_COLORS.length] }} />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Recent Students & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Students */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">Recent Students</CardTitle>
              <CardDescription>Last 5 students added</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-accent">
              <Link to="/dashboard/students">View all <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentStudents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No students yet. Click "Add Student" to get started.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.age}</TableCell>
                      <TableCell>{s.department}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {s.createdAt ? formatDistanceToNow(new Date(s.createdAt), { addSuffix: true }) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Activity Feed</CardTitle>
            <CardDescription>Recent actions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No activity yet.</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div className="mt-0.5">{activityIcon(log.action)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground">
                        <span className="font-medium">{log.studentName}</span>{" "}
                        <span className="text-muted-foreground">was {log.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
