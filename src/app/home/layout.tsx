import Aside from "@/components/Layout/Aside";
import ClientWrapper from "@/components/ClientWrapper";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ClientWrapper>
        <Aside />
      </ClientWrapper>
      <div className="ml-16 md:ml-56 flex-1 p-4 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
