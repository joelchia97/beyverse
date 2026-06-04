export function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <section className="container-page py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">BEYBUKU Encyclopedia</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black text-white md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
    </section>
  );
}
