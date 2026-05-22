import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import type { IconType } from "react-icons";

export interface SocialLink {
  title: string;
  subtitle: string;
  href: string;
  icon: IconType;
  color: "red" | "blue" | "pink" | "gray";
  ariaLabel: string;
  footerHoverColor: string;
}

export const socialLinks: SocialLink[] = [
  {
    title: "Email",
    subtitle: "Get in touch",
    href: "mailto:rushi.positive@gmail.com",
    icon: FiMail,
    color: "red",
    ariaLabel: "Send email to Rushi Chudasama",
    footerHoverColor: "hover:text-red-400",
  },
  {
    title: "LinkedIn",
    subtitle: "Professional Profile",
    href: "https://www.linkedin.com/in/rushi-chudasama-63473819a/",
    icon: FiLinkedin,
    color: "blue",
    ariaLabel: "Visit Rushi Chudasama's LinkedIn profile",
    footerHoverColor: "hover:text-blue-400",
  },
  {
    title: "Instagram",
    subtitle: "Follow me",
    href: "https://www.instagram.com/rushiii.js",
    icon: FiInstagram,
    color: "pink",
    ariaLabel: "Visit Rushi Chudasama's Instagram profile",
    footerHoverColor: "hover:text-pink-400",
  },
  {
    title: "GitHub",
    subtitle: "Open Source Contributions",
    href: "https://github.com/Rushi-45/",
    icon: FiGithub,
    color: "gray",
    ariaLabel: "Visit Rushi Chudasama's GitHub profile",
    footerHoverColor: "hover:text-gray-300",
  },
];
