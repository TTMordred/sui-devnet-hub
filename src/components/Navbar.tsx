
import { Link, useLocation } from "react-router-dom";
import WalletConnect from "./WalletConnect";
import { cn } from "@/lib/utils";
import BlurContainer from "./BlurContainer";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Faucet", path: "/faucet" },
    { name: "Mint NFT", path: "/nft-mint" },
    { name: "Contracts", path: "/contracts" },
    { name: "Resources", path: "/resources" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <BlurContainer
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300",
          scrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg"
            : "bg-white/30 dark:bg-gray-900/30 backdrop-blur-md"
        )}
        blurIntensity="none"
        borderStyle="none"
        elevation={scrolled ? "md" : "sm"}
        rounded="lg"
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sui-300 to-sui-500 flex items-center justify-center text-white font-bold text-xl shadow-neon-sm">
                  S
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  Sui Testnet
                </span>
              </div>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-sui-600 dark:hover:text-sui-300",
                    location.pathname === link.path
                      ? "text-sui-600 dark:text-sui-300"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex md:items-center">
            <WalletConnect />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <div className="flex items-center gap-2">
              <WalletConnect />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </BlurContainer>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out transform",
          mobileMenuOpen
            ? "opacity-100 scale-100 max-h-screen"
            : "opacity-0 scale-95 max-h-0 pointer-events-none"
        )}
      >
        <BlurContainer
          className="mx-4 mt-2 px-2 py-3 rounded-lg"
          backgroundOpacity="medium"
          elevation="md"
          borderStyle="light"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                  location.pathname === link.path
                    ? "bg-sui-100 dark:bg-sui-900/40 text-sui-800 dark:text-sui-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </BlurContainer>
      </div>
    </header>
  );
}
