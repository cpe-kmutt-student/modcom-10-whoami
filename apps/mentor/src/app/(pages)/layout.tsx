import type React from "react";

export default function PageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
	return (
		<>
			<div className="bg-[#f5fbfc] min-h-screen">{children}</div>
		</>
	);
}
