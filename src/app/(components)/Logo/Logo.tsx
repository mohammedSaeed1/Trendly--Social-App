import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center lg:hidden p-2">
            <Image
                src="/trendly-logo-dark.svg"
                width={170}
                height={100}
                alt="Trendly logo"
                priority
            />
        </Link>
    )
}
