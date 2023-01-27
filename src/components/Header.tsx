import Link from "next/link";
import { FC } from "react";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: "Mean Numbers", href: "/numbers" },
  { name: "Message Board", href: "/messages" },
  {
    name: "Github Repo",
    href: "https://github.com/samhainsamhainsamhain/message-desk",
  },
];

const Header: FC = () => {
  return (
    <header className="flex justify-center bg-slate-900 bg-opacity-30 p-5 align-middle">
      <nav className="flex gap-16">
        {navLinks.map((link) => (
          <Link
            className="text-2xl font-medium text-[hsl(280,100%,70%)] transition-colors hover:text-[hsl(280,100%,90%)] "
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
