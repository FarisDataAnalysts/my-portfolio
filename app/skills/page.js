import { createClient } from "@supabase/supabase-js";

async function getSkills() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-mono text-teal text-sm mb-2">CAPABILITIES</p>
      <h1 className="font-display font-bold text-4xl mb-12">Skills</h1>

      {skills.length === 0 && (
        <p className="text-slate font-mono text-sm">
          No skills yet — add some from the admin dashboard.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {skills.map((s) => (
          <div key={s.id}>
            <div className="flex justify-between mb-2">
              <span className="font-mono text-sm">{s.name}</span>
              <span className="font-mono text-sm text-gold mono-num">
                {s.proficiency}%
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded overflow-hidden">
              <div
                className="h-full bg-teal"
                style={{ width: `${s.proficiency}%` }}
              />
            </div>
            {s.category && (
              <p className="text-xs text-slate mt-1">{s.category}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
