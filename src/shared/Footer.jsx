import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="grid grid-cols-2 items-center justify-center text-center">
      <div className="bg-[#1F2937] text-white text-center h-[180px] pt-6">
        <h2 className="pb-2">CONTACT US</h2>
        <p>123 ABS Street, Uni 21, Bangladesh</p>
        <p>+88 123456789</p>
        <p>Mon - Fri: 08:00 - 22:00</p>
        <p>Sat - Sun: 10:00 - 23:00</p>
      </div>
      <div className="bg-[#111827] text-white h-[180px] pt-8">
        <h2 className="pb-2">Follow US</h2>
        <p className="pb-2">Join us on social media</p>
        <div className="flex gap-2 justify-center items-center text-xl"><FaFacebookSquare /> <FaInstagramSquare /> <FaTwitterSquare /></div>
      </div>
      <div className="col-span-2 bg-black text-white p-2">
        <h2>Copyright © CulinaryCloud. All rights reserved.</h2>
      </div>
    </footer>
  );
};

export default Footer;