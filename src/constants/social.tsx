import { FiMail, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import type { IconType } from "react-icons";
import { siteConfig } from "@/constants/site";

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
    href: `mailto:${siteConfig.email}`,
    icon: FiMail,
    color: "red",
    ariaLabel: `Send email to ${siteConfig.name}`,
    footerHoverColor: "hover:text-red-400",
  },
  {
    title: "LinkedIn",
    subtitle: "Professional Profile",
    href: siteConfig.social.linkedin,
    icon: FiLinkedin,
    color: "blue",
    ariaLabel: `Visit ${siteConfig.name}'s LinkedIn profile`,
    footerHoverColor: "hover:text-blue-400",
  },
  {
    title: "Instagram",
    subtitle: "Follow me",
    href: siteConfig.social.instagram,
    icon: FiInstagram,
    color: "pink",
    ariaLabel: `Visit ${siteConfig.name}'s Instagram profile`,
    footerHoverColor: "hover:text-pink-400",
  },
  {
    title: "GitHub",
    subtitle: "Open Source Contributions",
    href: siteConfig.social.github,
    icon: FiGithub,
    color: "gray",
    ariaLabel: `Visit ${siteConfig.name}'s GitHub profile`,
    footerHoverColor: "hover:text-gray-300",
  },
];
