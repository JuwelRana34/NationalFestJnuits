import Link from "next/link";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
	children: ReactNode;
};

const navItems = [
	{ href: "/dashboard", label: "Overview" },
	{ href: "/dashboard/events", label: "Events" },
	{ href: "/dashboard/teams", label: "Teams" },
	{ href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-6 lg:px-8">
				<aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold">Dashboard</h2>
					<nav className="space-y-1">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
							>
								{item.label}
							</Link>
						))}
					</nav>
				</aside>

				<main className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
