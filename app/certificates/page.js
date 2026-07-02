import { createClient } from "@supabase/supabase-js";

async function getCertificates() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export default async function CertificatesPage() {
  const certs = await getCertificates();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-mono text-teal text-sm mb-2">CREDENTIALS</p>
      <h1 className="font-display font-bold text-4xl mb-12">Certificates</h1>

      {certs.length === 0 && (
        <p className="text-slate font-mono text-sm">
          No certificates yet — add some from the admin dashboard.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {certs.map((c) => (
          <div
            key={c.id}
            className="border border-white/10 rounded-lg overflow-hidden bg-navylight hover:border-gold/50 transition-colors"
          >
            {c.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.image_url} alt={c.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-5">
              <h3 className="font-display font-bold text-base mb-1">{c.title}</h3>
              <p className="text-slate text-sm">{c.issuer}</p>
              {c.issue_date && (
                <p className="text-xs text-slate font-mono mt-2">{c.issue_date}</p>
              )}
              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-teal hover:underline mt-2 inline-block"
                >
                  View credential →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
