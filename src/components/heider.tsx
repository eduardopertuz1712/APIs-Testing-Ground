import Link from "next/link";

export default function Heider() {
    return (
        <nav className="p-6 bg-blue-600 text-white flex justify-around">
            <Link href="/" className="text-xl font-bold">
                Home
            </Link>
            <Link href="/rick" className="text-xl font-bold">
                Rick and Morty
            </Link>
            <Link href="/dragon" className="text-xl font-bold">
                Dragon Ball
            </Link>
            <Link href="/pokemom" className="text-xl font-bold">
                Pokemon
            </Link>
            <Link href="/kimetsu" className="text-xl font-bold">
                Kimetsu no Yaiba
            </Link>
            <Link href="/futuama" className="text-xl font-bold">
                Futuama
            </Link>
            <Link href="/simpson" className="text-xl font-bold">
                Simpson
            </Link>
            <Link href="/star" className="text-xl font-bold">
                Star Wars
            </Link>
        </nav>
    );
}