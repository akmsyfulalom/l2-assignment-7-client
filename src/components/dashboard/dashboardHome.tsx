import { NavLink, Outlet } from "react-router-dom";
import {
  CircleUser,
  Home,
  Menu,
  Search,
  SquareDashedKanban,
  GalleryVerticalEnd,
  Handshake,
  BookHeart,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toggleTheme } from "@/redux/features/theme/theme";

export function HomeDashboard() {
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div
        className={`hidden border-r  md:block ${
          darkMode ? "border-gray-600" : ""
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={`flex h-14 items-center border-b  px-4 lg:h-[60px] lg:px-6 ${
              darkMode ? "border-gray-600" : ""
            }`}
          >
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <div>
                <h1
                  className={`text-2xl md:text-4xl font-bold ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  DCHM
                </h1>
              </div>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/create-supply"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
              >
                <SquareDashedKanban />
                Create Supply
              </NavLink>
              <NavLink
                to="/dashboard/all-supply"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
              >
                <GalleryVerticalEnd />
                All Supply
              </NavLink>
              <NavLink
                to="/dashboard/create-testimonial"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
              >
                <BookHeart />
                Create Testimonial
              </NavLink>
              <NavLink
                to="/dashboard/create-community-post"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
              >
                <Handshake />
                Community
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className={`flex h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6 ${
            darkMode ? "border-gray-600" : ""
          }`}
        >
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <div>
                    <img src="/public/DCHM.png" />
                  </div>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/create-supply"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 hover:text-gray-300"
                >
                  <SquareDashedKanban />
                  Create Supply
                </NavLink>
                <NavLink
                  to="/dashboard/all-supply"
                  className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
                >
                  <GalleryVerticalEnd />
                  All Supply
                </NavLink>
                <NavLink
                  to="/dashboard/create-testimonial"
                  className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
                >
                  <BookHeart />
                  Create Testimonial
                </NavLink>
                <NavLink
                  to="/dashboard/create-community-post"
                  className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-300"
                >
                  <Handshake />
                  Community
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none  pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <NavLink to="/">Back to Home</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <button
              onClick={handleToggleTheme}
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
            >
              {darkMode ? <Sun /> : <Moon size={24} />}
            </button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
