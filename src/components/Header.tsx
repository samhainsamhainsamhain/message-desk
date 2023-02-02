import Link from "next/link";
import { useRouter } from "next/router";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: "About", href: "/" },
  { name: "Average Numbers", href: "/task/numbers" },
  { name: "Message Board", href: "/task/messages" },
  {
    name: "Github Repo",
    href: "https://github.com/samhainsamhainsamhain/message-desk",
  },
];

const Header = () => {
  const router = useRouter();

  return (
    <header className="absolute flex w-full justify-center bg-slate-900 bg-opacity-30 p-5 align-middle">
      <nav className="flex gap-16">
        {navLinks.map((link) => {
          if (router.asPath === link.href) return null;
          return (
            <Link
              className="text-2xl font-medium text-[hsl(280,100%,70%)] transition-colors hover:text-[hsl(280,100%,90%)] "
              href={link.href}
              key={Math.random()}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
