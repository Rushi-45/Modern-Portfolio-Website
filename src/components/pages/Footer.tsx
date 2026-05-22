import { motion } from "framer-motion";
import { FiCoffee } from "react-icons/fi";
import { Link } from "react-scroll";
import { BuyMeSupportModal, useBuyMeSupport } from "../common/BuyMeSupport";
import { socialLinks } from "@/constants/social";

const CHAI_URL = "https://buymeachai.ezee.li/rushi45";
const COFFEE_URL = "https://buymeacoffee.com/rushi45";

const Footer = () => {
  const { isOpen, open, close } = useBuyMeSupport();

  return (
    <>
      <footer className="w-full bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-400"
          >
            © {new Date().getFullYear()} Rushi Chudasama. All rights reserved.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-6 text-sm"
          >
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <li key={section}>
                  <Link
                    to={section}
                    href={`#${section}`}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              ),
            )}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 items-center"
          >
            {socialLinks.map(
              ({ href, ariaLabel, icon: Icon, footerHoverColor }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                >
                  <Icon
                    className={`text-xl text-gray-400 ${footerHoverColor} transition duration-300`}
                  />
                </a>
              ),
            )}
            <button
              onClick={open}
              aria-label="Buy me a coffee or chai"
              className="text-xl text-gray-400 hover:text-yellow-400 transition duration-300"
            >
              <FiCoffee />
            </button>
          </motion.div>
        </div>
      </footer>
      <BuyMeSupportModal
        open={isOpen}
        onClose={close}
        chaiUrl={CHAI_URL}
        coffeeUrl={COFFEE_URL}
      />
    </>
  );
};

export default Footer;
