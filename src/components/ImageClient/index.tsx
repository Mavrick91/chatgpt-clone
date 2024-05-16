"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

const ImageClient = (props: ImageProps) => {
	return <Image {...props} alt={props.alt} />;
};

export default ImageClient;
