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

export default function HintUpdateModal({
	isOpen,
	onOpen,
	onClose,
	reload,
	hintIndex,
	juniorId,
}: {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	reload: () => void;
	hintIndex: number;
	juniorId: string;
}): React.JSX.Element {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const toast = useToast();

	useEffect(() => {
		(async () => {
			try {
				setPreviewUrl(null);
				const getHint = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/junior-hint/${juniorId}/${hintIndex}`,
				);
				setPreviewUrl(getHint.data.fyquest_url);
			} catch (e) {
				setPreviewUrl(null);
			}
		})();
	}, [hintIndex, juniorId]);

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
			formData.append("hintIndex", hintIndex.toString());
			formData.append("fyUserId", juniorId);

			axios.defaults.withCredentials = true;
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/update/hint`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			toast({
				status: "success",
				description: "Updated",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			onClose();
			reload();
		} catch (error) {
			toast({
				status: "success",
				description: "Internal Server Error",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			console.error("Failed to upload hint:", error);
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
								Hint {hintIndex}
							</div>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-2 items-center">
									{previewUrl ? (
										<img
											src={previewUrl}
											alt="Hint Preview"
											className="w-full max-h-[300px] object-contain rounded-md border"
										/>
									) : (
										<div className="w-full h-[200px] bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
											No image selected
										</div>
									)}
									<Input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										display="none"
										onChange={handleFileChange}
									/>
									<div
										className="text-center font-bold text-[#18b0f7] border-2 border-[#18b0f7] hover:bg-[#18b0f7]/10 active:bg-[#18b0f7]/20 duration-300 cursor-pointer w-full py-2 rounded-lg mt-2"
										onClick={handleSelectImage}
									>
										Select Image
									</div>
								</div>
								<div className="flex flex-row justify-center">
									<button
										type="button"
										disabled={isUploading}
										className="text-center font-bold text-white bg-[#18b0f7] hover:bg-[#18b0f7]/70 active:bg-[#18b0f7]/50 disabled:bg-gray-400 duration-300 cursor-pointer w-full py-2 rounded-lg"
										onClick={handleUpload}
									>
										{isUploading ? "Uploading..." : "Upload"}
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
