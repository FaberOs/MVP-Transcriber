import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-white">
      <h1 className="text-8xl font-bold text-black mb-4">404</h1>
      <p className="text-2xl text-black mb-6">Página no encontrada</p>
      <Link href="/app" className="px-4 py-2 bg-[#FCA51D] text-black rounded">
        Volver a Home
      </Link>
    </section>
  );
}
