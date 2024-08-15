"use client";

function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>Ocurrió un error!</h2>
      <button
        className="rounded-xl bg-black px-4 py-2 text-white"
        onClick={() => reset()}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

export default Error;
