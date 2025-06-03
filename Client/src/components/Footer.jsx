import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import logo from '/logo.svg';

const Footer = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1D232A] text-neutral-content py-12"
        >
            <div className="px-6 md:px-12 lg:px-24 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logo} alt="logo" className='h-10 w-10 mr-2' />
                            <span className="text-2xl font-bold">HobbyHub</span>
                        </div>
                        <p className="opacity-70 mb-4">
                            Connecting passionate people through shared interests since 2025.
                        </p>
                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Visit our Facebook page"
                            >
                                <FaFacebookF />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Visit our Twitter page"
                            >
                                <FaTwitter />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Visit our Instagram page"
                            >
                                <FaInstagram />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Visit our LinkedIn page"
                            >
                                <FaLinkedinIn />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link></li>
                                <li><Link to="/groups" className="opacity-70 hover:opacity-100 transition-opacity">All Groups</Link></li>
                                <li><Link to="/createGroup" className="opacity-70 hover:opacity-100 transition-opacity">Create a Group</Link></li>
                                <li><Link to="/about" className="opacity-70 hover:opacity-100 transition-opacity">About Us</Link></li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="opacity-70 hover:opacity-100 transition-opacity">Help Center</Link></li>
                                <li><Link to="/guidelines" className="opacity-70 hover:opacity-100 transition-opacity">Community Guidelines</Link></li>
                                <li><Link to="/privacy" className="opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="opacity-70 hover:opacity-100 transition-opacity">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3 }}
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <FaEnvelope className="mt-1 opacity-70" />
                                    <span className="opacity-70">info@hobbyhub.com</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaPhone className="mt-1 opacity-70" />
                                    <span className="opacity-70">(123) 456-7890</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaMapMarkerAlt className="mt-1 opacity-70" />
                                    <span className="opacity-70">123 Hobby Street, Community City</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-neutral-content border-opacity-20"></div>

                <div className="text-center mt-6 opacity-70">
                    <p>© {new Date().getFullYear()} HobbyHub. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;