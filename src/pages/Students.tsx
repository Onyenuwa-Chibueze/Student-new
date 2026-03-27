import { useState } from "react";
import { useStudents, Student } from "@/contexts/StudentContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Pencil, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { programs } from "@/data/programs";

const Students = () => {
  const { students, updateStudent, deleteStudent } = useStudents();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState({ name: "", age: "", department: "", regNumber: "", email: "", phone: "", gender: "" });

  const departments = [...new Set(students.map((s) => s.department))];

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || (s.regNumber || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q);
    const matchDept = filterDept === "all" || s.department === filterDept;
    return matchSearch && matchDept;
  });

  const openEdit = (s: Student) => {
    setEditStudent(s);
    setEditForm({ name: s.name, age: String(s.age), department: s.department, regNumber: s.regNumber || "", email: s.email || "", phone: s.phone || "", gender: s.gender || "" });
  };

  const handleEdit = () => {
    if (!editStudent) return;
    updateStudent(editStudent.id, { name: editForm.name, age: Number(editForm.age), department: editForm.department, regNumber: editForm.regNumber, email: editForm.email, phone: editForm.phone, gender: editForm.gender });
    setEditStudent(null);
    toast({ title: "Student updated" });
  };

  const handleDelete = (id: string, name: string) => {
    deleteStudent(id);
    toast({ title: "Student deleted", description: `${name} has been removed.` });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-display text-foreground">Student Directory</h1>
        <p className="text-muted-foreground text-sm">Manage and view all enrolled students</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, reg number, or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No students found. Add some students to get started.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden shadow-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Reg No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{s.regNumber || "—"}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.gender || "—"}</TableCell>
                  <TableCell>{s.age}</TableCell>
                  <TableCell className="text-sm">{s.email || "—"}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(s)} className="text-muted-foreground hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id, s.name)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Student</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <Input value={editForm.regNumber} onChange={(e) => setEditForm({ ...editForm, regNumber: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input type="number" value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={editForm.gender} onValueChange={(v) => setEditForm({ ...editForm, gender: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Department</Label>
              <Select value={editForm.department} onValueChange={(v) => setEditForm({ ...editForm, department: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStudent(null)}>Cancel</Button>
            <Button onClick={handleEdit} className="gradient-accent text-accent-foreground">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
