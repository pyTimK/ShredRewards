import { useState, useEffect } from "react";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export const enum DeviceType {
	Smartphone,
	Tablet,
	Desktop,
}

export default function useDevice() {
	const [device, setDevice] = useState(DeviceType.Smartphone);

	useEffect(() => {
		function handleResize() {
			let newDevice = DeviceType.Smartphone;
			if (getWindowDimensions().width > 600) newDevice = DeviceType.Tablet;
			if (getWindowDimensions().width > 980) newDevice = DeviceType.Desktop;
			setDevice(newDevice);
		}
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { device };
}
