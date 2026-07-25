import type React from "react";

export default function PageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
	return (
		<>
			<div className="relative min-h-screen bg-[#f5fbfc]">
				<img
					src="https://s3.aboutnon.in.th/public/og-whoami.jpg"
					alt="bg"
					className="fixed inset-0 h-full w-full object-cover"
				/>
				<div className="relative z-10 min-h-screen">{children}</div>
			</div>
		</>
	);
}
