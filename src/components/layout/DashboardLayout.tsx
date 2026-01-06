import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            {/* Sidebar - Fixed width, no longer 'fixed' position */}
            <div className="hidden md:flex w-72 flex-col bg-gray-900 border-r border-gray-800 flex-shrink-0">
                <Sidebar className="h-full" />
            </div>

            {/* Main Content - Takes remaining space and scrollable */}
            <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
                <div className="flex-1 h-full p-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
