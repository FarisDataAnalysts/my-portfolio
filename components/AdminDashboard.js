"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { LogOut, Trash2, Plus, Upload } from "lucide-react";

const TABS = ["projects", "skills", "certificates"];

const EMPTY = {
  projects: { title: "", description: "", tech_stack: "", image_url: "", project_url: "", github_url: "", featured: false, sort_order: 0 },
  skills: { name: "", category: "", proficiency: 70, sort_order: 0 },
  certificates: { title: "", issuer: "", issue_date: "", credential_url: "", image_url: "", sort_order: 0 },
};

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [tab, setTab] = useState("projects");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(EMPTY.projects);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(EMPTY[tab]);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function load() {
    const { data } = await supabase.from(tab).select("*").order("sort_order");
    setRows(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${tab}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (tab === "projects" && typeof payload.tech_stack === "string") {
      payload.tech_stack = payload.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    delete payload.id;
    delete payload.created_at;
    const { error } = await supabase.from(tab).insert(payload);
    setSaving(false);
    if (!error) {
      setForm(EMPTY[tab]);
      load();
    }
  }

  async function handleDelete(id) {
    await supabase.from(tab).delete().eq("id", id);
    load();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-teal text-sm mb-1">DASHBOARD</p>
          <h1 className="font-display font-bold text-3xl">Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-mono text-slate hover:text-red-400"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-mono capitalize border-b-2 -mb-px transition-colors ${
              tab === t ? "border-teal text-teal" : "border-transparent text-slate"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* FORM */}
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <h2 className="font-mono text-sm text-gold mb-1 flex items-center gap-2">
            <Plus size={14} /> Add new {tab.slice(0, -1)}
          </h2>

          {tab === "projects" && (
            <>
              <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <Textarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
              <Input label="Tech stack (comma separated)" value={form.tech_stack} onChange={(v) => setForm({ ...form, tech_stack: v })} />
              <Input label="Live project URL" value={form.project_url} onChange={(v) => setForm({ ...form, project_url: v })} />
              <Input label="GitHub URL" value={form.github_url} onChange={(v) => setForm({ ...form, github_url: v })} />
            </>
          )}

          {tab === "skills" && (
            <>
              <Input label="Skill name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
              <Input
                label="Proficiency (1-100)"
                type="number"
                value={form.proficiency}
                onChange={(v) => setForm({ ...form, proficiency: Number(v) })}
              />
            </>
          )}

          {tab === "certificates" && (
            <>
              <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <Input label="Issuer" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} />
              <Input label="Issue date" type="date" value={form.issue_date} onChange={(v) => setForm({ ...form, issue_date: v })} />
              <Input label="Credential URL" value={form.credential_url} onChange={(v) => setForm({ ...form, credential_url: v })} />
            </>
          )}

          {(tab === "projects" || tab === "certificates") && (
            <div>
              <label className="text-xs font-mono text-slate">Image</label>
              <div className="flex items-center gap-3 mt-1">
                <label className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded cursor-pointer text-sm font-mono hover:border-teal">
                  <Upload size={14} />
                  {uploading ? "Uploading..." : "Choose file"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
                {form.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image_url} alt="preview" className="w-12 h-12 object-cover rounded" />
                )}
              </div>
            </div>
          )}

          <Input
            label="Sort order"
            type="number"
            value={form.sort_order}
            onChange={(v) => setForm({ ...form, sort_order: Number(v) })}
          />

          <button
            type="submit"
            disabled={saving}
            className="mt-3 px-6 py-3 bg-teal text-navy font-mono text-sm font-medium rounded hover:bg-gold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>

        {/* LIST */}
        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-sm text-gold mb-1">
            Existing ({rows.length})
          </h2>
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between border border-white/10 rounded px-4 py-3 bg-navylight"
            >
              <span className="text-sm">{r.title || r.name}</span>
              <button onClick={() => handleDelete(r.id)} aria-label="Delete" className="text-slate hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="text-sm text-slate font-mono">Nothing here yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="text-xs font-mono text-slate">{label}</label>
      <input
        type={type}
        required={required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-navylight border border-white/10 rounded px-3 py-2 text-sm focus:border-teal outline-none"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-mono text-slate">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full mt-1 bg-navylight border border-white/10 rounded px-3 py-2 text-sm focus:border-teal outline-none"
      />
    </div>
  );
}
