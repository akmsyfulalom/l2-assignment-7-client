import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toggleTheme } from "@/redux/features/theme/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleUser, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { darkMode } = useAppSelector((store) => store.theme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      <header
        className={`sticky top-0 flex h-16 items-center gap-4 border-b shadow-2xl px-4 md:px-6 ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-lg lg:gap-6  ">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div>
              <img src="/DCHM.png" className="shrink-0" />
            </div>
          </NavLink>
          <NavLink to="/" className="transition-colors hover:text-gray-300 ">
            Home
          </NavLink>
          <NavLink
            to="/supplies"
            className=" transition-colors hover:text-gray-300"
          >
            Supplies
          </NavLink>
          <NavLink
            to="/about-us"
            className="  transition-colors hover:text-gray-300"
          >
            About
          </NavLink>
          <NavLink
            to="/leaderboard"
            className=" transition-colors hover:text-gray-300"
          >
            Loaderboard
          </NavLink>
          <NavLink
            to="/community"
            className=" transition-colors hover:text-gray-300"
          >
            Community
          </NavLink>

          <NavLink
            to="/volunteer"
            className=" transition-colors hover:text-gray-300"
          >
            Volunteer
          </NavLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`shrink-0 md:hidden ${darkMode ? "text-black" : ""}`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <NavLink
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <div>
                <h1
                  className={`text-2xl md:text-4xl font-bold ${
                    darkMode ? "text-black" : ""
                  }`}
                >
                  DCHM
                </h1>
                </div>
              </NavLink>

              <NavLink
                to="/"
                className=" transition-colors hover:text-gray-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/supplies"
                className=" transition-colors hover:text-gray-300"
              >
                Supplies
              </NavLink>
              <NavLink
                to="/about-us"
                className=" transition-colors hover:text-gray-300"
              >
                About Us
              </NavLink>
              <NavLink
                to="/leaderboard"
                className=" transition-colors hover:text-gray-300"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/community"
                className=" transition-colors hover:text-gray-300"
              >
                Community
              </NavLink>
              <NavLink
                to="/volunteer"
                className="transition-colors hover:text-gray-300"
              >
                Volunteer
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {user ? (
            <NavLink to="/dashboard" className=" hover:text-gray-300">
              Dashboard
            </NavLink>
          ) : (
            ""
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className={`${darkMode ? "text-black":""}`}>
              <NavLink to="/login">Login</NavLink>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          )}
        </div>
        <div>
          <button
            onClick={handleToggleTheme}
            className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
          >
            {darkMode ? <Sun /> : <Moon size={24} />}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
