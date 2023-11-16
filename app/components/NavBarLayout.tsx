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
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const userCode:UserJSON = Decoder(token);
      setUser(userCode);
      setLogin(true);
    }
  },[login])

  const menuItems = ["Profile", "Dashboard", "Activity", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-green-950">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-black">HWDO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-white" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      {login ? (
        <>
          {<NavbarItem className="rounded-lg border p-2 ">
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
              href="#"
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
