import dynamic from "next/dynamic";
import Link from "next/link";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const stats = [
  { label: "years experience", value: "09" },
  { label: "core tools", value: "04" },
  { label: "students trained", value: "100+" },
];

export default function Home() {
  return (
    <div>
      <section className="relative h-[90vh] overflow-hidden data-grid-bg">
        <Hero3D />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <p className="font-mono text-teal text-sm mb-4 tracking-widest">
            KARACHI, PAKISTAN — DATA ANALYST
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Muhammad Faris turns raw data into decisions.
          </h1>
          <p className="mt-6 max-w-xl text-slate text-lg">
            Excel, SQL, Python and Power BI — building dashboards, models and
            training the next generation of analysts.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-teal text-navy font-mono text-sm font-medium rounded hover:bg-gold transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/skills"
              className="px-6 py-3 border border-slate/40 text-offwhite font-mono text-sm rounded hover:border-teal transition-colors"
            >
              See Skills
            </Link>
          </div>

          <div className="mt-14 flex gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-3xl text-gold mono-num">{s.value}</p>
                <p className="text-xs text-slate uppercase tracking-wide mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
