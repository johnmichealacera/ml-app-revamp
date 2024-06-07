import SideNav from '@/app/ui/dashboard/sidenav';
import { Metadata } from 'next';
import HeaderNav from '../ui/dashboard/headernav';
 
export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none">
        <HeaderNav />
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-full flex-none md:w-64">
          <SideNav />
        </aside>
        <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}