import { createClient } from "@supabase/supabase-js";

async function getProjects() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-mono text-teal text-sm mb-2">WORK</p>
      <h1 className="font-display font-bold text-4xl mb-12">Projects</h1>

      {projects.length === 0 && (
        <p className="text-slate font-mono text-sm">
          No projects yet — add some from the admin dashboard.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="border border-white/10 rounded-lg overflow-hidden hover:border-teal/50 transition-colors bg-navylight"
          >
            {p.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-slate text-sm mb-4">{p.description}</p>
              {p.tech_stack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 border border-teal/30 text-teal rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-4 text-sm font-mono">
                {p.project_url && (
                  <a href={p.project_url} target="_blank" rel="noreferrer" className="text-gold hover:underline">
                    Live →
                  </a>
                )}
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="text-slate hover:text-teal">
                    Code →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
