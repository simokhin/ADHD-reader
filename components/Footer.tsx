import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" flex justify-center items-center p-4 ">
      <p>
        Made by{" "}
        <Link
          className="underline hover:opacity-90 transition-opacity ease-in-out duration-300"
          href="https://github.com/simokhin"
          target="_blank"
        >
          Nikita Simokhin
        </Link>
      </p>
    </footer>
  );
}
