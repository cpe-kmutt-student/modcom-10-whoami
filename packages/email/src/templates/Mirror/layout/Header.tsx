import { Img, Section } from "@react-email/components";

const CONFIG = {
	logourl: "https://storage.comcamp.io/web-assets/modcom-banner.png",
};

export const Header = () => {
	return (
		<Section>
			<Img
				src={CONFIG.logourl}
				style={{ width: "100%", maxHeight: "500px", maxWidth: "100%" }}
				alt="ComCamp 37 Logo"
				className="mx-auto relative z-10"
			/>
		</Section>
	);
};

export default Header;
