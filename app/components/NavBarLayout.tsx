"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as LinkBoard
} from "@nextui-org/react";
import Link from "next/link";
import Decoder from "../utilities/Decoder"
import { loadavg } from "os";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserJSON | any>()
  interface UserJSON {
    sub: string;
    exp: number;
    iss: string;
    aud: string;

  } 
  //localStorage.removeItem('token');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(Decoder(token));
      setLogin(true);
    }
  }, []);
  

  

  const menuItems = ["Dashboard" ,"Profile",  "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-green-950">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-white">HWDO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <LinkBoard className="text-white" href="dashboard">
          Dashboard
          </LinkBoard>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#" aria-current="page">
            Profile
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
      {login ? (
        <>
          {<NavbarItem className="rounded-lg border p-2 text-white">
              Welcome {user.sub}!
             </NavbarItem>}
        </>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex ">
            <Link className="text-secondary" href="/login">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="rounded-xl bg-purple-950 p-2 text-secondary" href="/signup">
              Sign Up
            </Link>
          </NavbarItem>
        </>
      )} 
 
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <LinkBoard
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={`${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </LinkBoard>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
