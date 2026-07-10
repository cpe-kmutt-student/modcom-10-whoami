import { randomInt } from "node:crypto";
import {
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import type React from "react";
import { useState } from "react";

export default function LinkAccountModal({
	isOpen,
	onOpen,
	onClose,
	reload,
}: {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	reload: () => void;
}): React.JSX.Element {
	const [inputStudentId, setInputStudentId] = useState<string>("");

	function handleLinkAccount() {
		(async () => {
			try {
				axios.defaults.withCredentials = true;
				const linkAccount = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/account/link`,
					{
						student_id: inputStudentId,
					},
				);

				if (linkAccount.data) {
					onClose();
					reload();
					console.log("Account Linked");
				}
			} catch (e) {
				onOpen();
				console.error(e);
			}
		})();
	}

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
					<ModalBody paddingY={"1.5rem"} paddingX={"1.5rem"}>
						<div className="flex flex-col w-full text-black gap-5">
							<div className="text-black text-center font-normal text-md">
								Please input your{" "}
								<span className="font-bold">KMUTT Student ID</span>
							</div>
							<div className="flex flex-col gap-5">
								<div className="grid grid-row-2 gap-2">
									<Input
										size={"md"}
										borderRadius={"5px"}
										textAlign={"center"}
										placeholder="ex 6807050xxxx"
										borderColor={"#18b0f7"}
										type="number"
										maxLength={11}
										focusBorderColor={"#18b0f7"}
										required={true}
										_hover={{
											borderColor: "#18b0f7",
										}}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setInputStudentId(event.target.value)
										}
									/>
								</div>
								<div className="flex flex-row justify-center">
									<div
										className="text-center font-bold text-white bg-[#18b0f7] hover:bg-[#18b0f7]/70 active:bg-[#18b0f7]/50 duration-300 cursor-pointer w-full py-2 rounded-lg"
										onClick={async () => handleLinkAccount()}
									>
										Link
									</div>
								</div>
							</div>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
