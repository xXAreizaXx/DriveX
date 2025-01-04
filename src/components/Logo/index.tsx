// NextJS
import Image from "next/image";

// Interfaces
interface ImageProps {
    height?: number;
    width?: number;
}

export default function Logo(props: ImageProps) {
    return <Image
        {...props}
        alt="Logo"
        height={props.height || 50}
        src="/logo.svg"
        width={props.width || 150}
    />;
}
