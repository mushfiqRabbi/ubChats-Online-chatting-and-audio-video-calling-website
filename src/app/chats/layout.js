export default function ChatLayout({ children }) {
  return (
    <div className="h-screen bg-slate-100">
      <header className="bg-emerald-500 fixed top-0 w-full">
        <h1 className="text-center text-3xl text-slate-50 font-bold py-4">
          Header
        </h1>
      </header>
      <main className="bg-emerald-50 h-full pt-[4.25rem]">{children}</main>
    </div>
  );
}
