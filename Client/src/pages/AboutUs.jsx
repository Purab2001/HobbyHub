import React, { useContext } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaLayerGroup, FaHandshake, FaHeart, FaUserShield, FaRocket } from "react-icons/fa";
import Button from "../ui/Button";
import TypewriterEffect from "../ui/TypewriterEffect";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const stats = [
  { icon: <FaUsers />, label: "Members", value: "12,000+" },
  { icon: <FaLayerGroup />, label: "Groups", value: "350+" },
  { icon: <FaGlobe />, label: "Cities", value: "40+" },
  { icon: <FaRocket />, label: "Countries", value: "10+" }
];

const values = [
  { icon: <FaHandshake />, title: "Community", desc: "We foster genuine connections and support among hobbyists." },
  { icon: <FaHeart />, title: "Passion", desc: "We celebrate the joy and creativity hobbies bring to life." },
  { icon: <FaUserShield />, title: "Inclusion", desc: "Everyone is welcome, regardless of background or experience." },
  { icon: <FaRocket />, title: "Growth", desc: "We encourage learning, sharing, and personal development." }
];

const teamRoles = [
  { role: "Development", desc: "Building and maintaining a seamless, secure, and scalable platform." },
  { role: "Community Management", desc: "Ensuring a welcoming, safe, and engaging environment for all." },
  { role: "Content", desc: "Curating and creating resources to inspire and inform our members." },
  { role: "Support", desc: "Helping users with any questions, feedback, or technical issues." }
];

const AboutUs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoinClick = (e) => {
    if (user) {
      e.preventDefault();
      toast.info("You're already a member! Explore groups to connect with others.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/groups");
    }
  };

  return (
    <main className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <motion.section
        className="py-16 px-6 md:px-12 lg:px-24 container mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="About HobbyHub"
      >
        <div className="mb-4">
          <h1 className="text-4xl font-extrabold">Connecting Communities Through Shared Passions</h1>
        </div>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          HobbyHub brings people together to discover, share, and grow through their favorite hobbies. Join a thriving community built on passion, inclusion, and connection.
        </p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          variants={cardVariants}
        >
          <Button
            variant="primary"
            size="lg"
            className="min-w-[140px]"
            as={Link}
            to="/register"
            onClick={handleJoinClick}
          >
            Join Community
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[140px]"
            as={Link}
            to="/groups"
          >
            Explore Groups
          </Button>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-12 px-6 md:px-12 lg:px-24 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="Mission and Vision"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.article
            className="bg-base-200 rounded-xl p-8 shadow-md"
            variants={cardVariants}
            tabIndex={0}
            aria-label="Mission"
          >
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="opacity-90">
              To bring people together through their hobbies and interests, fostering lifelong friendships and personal growth.
            </p>
          </motion.article>
          <motion.article
            className="bg-base-200 rounded-xl p-8 shadow-md"
            variants={cardVariants}
            tabIndex={0}
            aria-label="Vision"
          >
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="opacity-90">
              Building the world's largest, most inclusive community of hobby enthusiasts.
            </p>
          </motion.article>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="py-12 px-6 md:px-12 lg:px-24 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="Our Story"
      >
        <motion.article
          className="max-w-3xl mx-auto text-center"
          variants={cardVariants}
          tabIndex={0}
        >
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg opacity-90 mb-2">
            HobbyHub was founded by a group of friends who wanted to make it easier for people to find and connect with others who share their passions.
          </p>
          <p className="opacity-80">
            What started as a small local project has grown into a global community, empowering thousands to discover new hobbies, build friendships, and share their journeys.
          </p>
        </motion.article>
      </motion.section>

      {/* Values */}
      <motion.section
        className="py-12 px-6 md:px-12 lg:px-24 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="Our Values"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <motion.article
              key={v.title}
              className="bg-base-200 rounded-xl p-6 flex flex-col items-center text-center shadow-md transition-transform duration-200 hover:scale-105 focus-within:scale-105"
              variants={cardVariants}
              tabIndex={0}
              aria-label={v.title}
            >
              <span className="text-3xl mb-3 text-base-content">{v.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="opacity-80">{v.desc}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Team Roles */}
      <motion.section
        className="py-12 px-6 md:px-12 lg:px-24 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="Team Roles"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Team Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamRoles.map((role) => (
            <motion.article
              key={role.role}
              className="bg-base-200 rounded-xl p-6 shadow-md text-center transition-transform duration-200 hover:scale-105 focus-within:scale-105"
              variants={cardVariants}
              tabIndex={0}
              aria-label={role.role}
            >
              <h3 className="text-lg font-semibold mb-2">{role.role}</h3>
              <p className="opacity-80">{role.desc}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="py-12 px-6 md:px-12 lg:px-24 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        aria-label="Community Statistics"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Community at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center bg-base-200 rounded-xl p-6 shadow-md w-full"
              variants={cardVariants}
              tabIndex={0}
              aria-label={stat.label}
            >
              <span className="text-3xl mb-2 text-base-content">{stat.icon}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="opacity-70">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default AboutUs;