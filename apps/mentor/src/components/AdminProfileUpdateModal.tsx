import {
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function AdminProfileUpdateModal({
	isOpen,
	onOpen,
	onClose,
	reload,
	syUserId,
	initialProfileUrl,
}: {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	reload: () => void;
	syUserId: string;
	initialProfileUrl: string | null;
}): React.JSX.Element {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const toast = useToast();

	useEffect(() => {
		if (isOpen) {
			setPreviewUrl(initialProfileUrl);
			setFile(null);
		}
	}, [isOpen, initialProfileUrl]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			const url = URL.createObjectURL(selectedFile);
			setPreviewUrl(url);
		}
	};

	const handleSelectImage = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = async () => {
		if (!file) return;

		try {
			setIsUploading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("syUserId", syUserId);

			axios.defaults.withCredentials = true;
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/admin/sy/update/profile`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			toast({
				status: "success",
				description: "Profile successfully updated by admin",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			onClose();
			reload();
		} catch (error) {
			toast({
				status: "error",
				description: "Internal Server Error",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			console.error("Failed to upload profile:", error);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered={true}
				size={"md"}
				motionPreset={"slideInBottom"}
				closeOnOverlayClick={false}
			>
				<ModalOverlay />
				<ModalContent bgColor={"white"} borderRadius={"8px"}>
					<ModalCloseButton
						className="outline-none outline-0"
						color={"rgb(199, 204, 216)"}
						_hover={{
							color: "#f76418",
						}}
					/>
					<ModalBody paddingY={"1.5rem"} paddingX={"1.5rem"}>
						<div className="flex flex-col w-full text-black gap-5">
							<div className="text-black text-center font-bold text-md">
								<div>Update Profile ({syUserId})</div>
							</div>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-2 items-center">
									<div className="relative w-full rounded-md overflow-hidden border">
										{previewUrl ? (
											<img
												src={previewUrl}
												alt="Profile Preview"
												className="w-full max-h-[300px] object-contain"
											/>
										) : (
											<div className="w-full h-[200px] bg-gray-100 flex items-center justify-center text-gray-400">
												No image selected
											</div>
										)}
										{isUploading && (
											<div className="absolute inset-0 bg-black/40 flex justify-center items-center z-20">
												<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
											</div>
										)}
									</div>
									<Input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										display="none"
										onChange={handleFileChange}
									/>
									<button
										type="button"
										className="text-center font-bold text-[#18b0f7] border-2 border-[#18b0f7] hover:bg-[#18b0f7]/10 active:bg-[#18b0f7]/20 duration-300 cursor-pointer w-full py-2 rounded-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
										onClick={handleSelectImage}
										disabled={isUploading}
									>
										Select Image
									</button>
								</div>
								<div className="flex flex-row justify-center">
									<button
										type="button"
										disabled={isUploading || !file}
										className="flex flex-row items-center justify-center gap-2 text-center font-bold text-white bg-[#18b0f7] hover:bg-[#18b0f7]/70 active:bg-[#18b0f7]/50 disabled:bg-gray-400 duration-300 cursor-pointer w-full py-2 rounded-lg"
										onClick={handleUpload}
									>
										{isUploading ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
												Uploading...
											</>
										) : (
											"Upload"
										)}
									</button>
								</div>
							</div>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
