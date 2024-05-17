"use client";

import Image, { ImageProps } from "next/image";

const ImageClient = (props: ImageProps) => {
	return <Image {...props} alt={props.alt} />;
};

export default ImageClient;
