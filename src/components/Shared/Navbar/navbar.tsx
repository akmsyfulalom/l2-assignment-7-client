import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleUser, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center  gap-4 border-b bg-background px-4 md:px-6 ">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-lg lg:gap-6  ">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div>
              <img src="/DCHM.png" />
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="/supplies"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Supplies
          </NavLink>
          <NavLink
            to="/about-us"
            className=" text-foreground transition-colors hover:text-foreground"
          >
            About
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Loaderboard
          </NavLink>
          <NavLink
            to="/community"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Community
          </NavLink>

          <NavLink
            to="/volunteer"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Volunteer
          </NavLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
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
                  <img src="/DCHM.png" />
                </div>
              </NavLink>

              <NavLink
                to="/"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Home
              </NavLink>
              <NavLink
                to="/supplies"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Supplies
              </NavLink>
              <NavLink
                to="/about-us"
                className="text-foreground transition-colors hover:text-foreground"
              >
                About Us
              </NavLink>
              <NavLink
                to="/leaderboard"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/community"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Community
              </NavLink>
              <NavLink
                to="/volunteer"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Volunteer
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {user ? (
            <NavLink
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
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
            <Button variant="outline" className="">
              <NavLink to="/login">Login</NavLink>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
