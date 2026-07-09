"use client";

import { createAuthClient } from "@repo/auth/client";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import Logo from "../../../assets/logo.png";
import MicrosoftIcon from "../../../components/icons/Microsoft";
import { authClient, signIn } from "../../../libs/auth-client";

export default function LoginPage(): React.JSX.Element {
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

	const handleMicrosoftSignIn = async () => {
		setIsRedirecting(true);
		await signIn.social({
			provider: "microsoft",
			callbackURL: process.env.NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL, // Use absolute URL to redirect back to frontend
		});
	};

	return (
		<>
			<div className="mx-auto container w-full px-5">
				<div className="flex flex-row items-center justify-center min-h-screen">
					<div className="border shadow-2xl rounded-3xl p-10 flex flex-col items-center">
						<Image src={Logo} alt="logo" className="w-28 h-28" />

						<div className="font-bold text-2xl mt-6">Mentor Profile</div>
						<div className="text-center">
							Sign in with your KMUTT account and give them some hint
						</div>

						<button
							disabled={isRedirecting}
							onClick={() => handleMicrosoftSignIn()}
							type="button"
							className="relative flex flex-row  mt-10 border rounded-2xl py-3 w-full sm:w-fit sm:px-14 justify-center items-center hover:bg-[#CAF0F8] shadow-md duration-300 hover:px-6 active:scale-[.97] group"
						>
							{!isRedirecting ? (
								<>
									<MicrosoftIcon className="h-6 w-6" />
									<div className="text-black ml-2 group-hover:text-[#351800] font-semibold text-sm sm:text-lg duration-300">
										Continue with KMUTT{" "}
										<span className="hidden sm:inline-flex">Account</span>
									</div>
								</>
							) : (
								<LoaderCircle className="text-center animate-spin" />
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
