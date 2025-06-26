// Terms.jsx
import React from "react";
import { FaUsers, FaComments, FaShieldAlt, FaUserCheck, FaBookOpen, FaExclamationTriangle } from "react-icons/fa";

const sections = [
  {
    icon: <FaUsers className="text-base-content mr-2" />,
    title: "Community Guidelines",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>Be respectful and courteous to all members.</li>
          <li>Embrace diversity and foster an inclusive environment.</li>
          <li>Help create a safe space for sharing hobbies and interests.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FaBookOpen className="text-base-content mr-2" />,
    title: "Group Management",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>Group creators and leaders are responsible for maintaining a positive group culture.</li>
          <li>Events and activities must comply with local laws and platform policies.</li>
          <li>Promote collaboration and constructive feedback within your group.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FaComments className="text-base-content mr-2" />,
    title: "User Conduct",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>No harassment, hate speech, or discrimination of any kind.</li>
          <li>Do not spam, advertise, or solicit in groups or messages.</li>
          <li>Report inappropriate behavior using the platform's reporting tools.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FaShieldAlt className="text-base-content mr-2" />,
    title: "Content & Privacy",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>Share only content you have the rights to post.</li>
          <li>Respect the privacy of other members—do not share personal information without consent.</li>
          <li>All user data is handled according to our privacy policy.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FaUserCheck className="text-base-content mr-2" />,
    title: "Account & Security",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>Keep your account information secure and do not share your password.</li>
          <li>Notify us immediately of any unauthorized account activity.</li>
          <li>Accounts may be suspended or terminated for violations of these terms.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FaExclamationTriangle className="text-base-content mr-2" />,
    title: "Platform Usage",
    content: (
      <>
        <ul className="list-disc ml-6 space-y-2">
          <li>Use HobbyHub for its intended purpose: connecting through hobbies and interests.</li>
          <li>Do not attempt to disrupt or misuse the platform or its services.</li>
          <li>We reserve the right to update these terms as needed. Continued use constitutes acceptance of any changes.</li>
        </ul>
      </>
    ),
  },
];

const Terms = () => (
  <main className="bg-base-100 text-base-content min-h-screen py-16 px-6 md:px-12 lg:px-24 container mx-auto">
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Terms of Service</h1>
      <p className="text-center text-base-content/80 mb-6">Last updated: June 26, 2025</p>
      <p className="mb-10 text-lg text-center opacity-90">
        Welcome to HobbyHub! By using our platform, you agree to follow these community guidelines and terms designed to keep our hobby groups safe, inclusive, and enjoyable for everyone.
      </p>
      <div className="space-y-6">
        {sections.map((section) => (
          <details key={section.title} className="bg-base-200 rounded-xl p-6 shadow-md group" open>
            <summary className="flex items-center cursor-pointer text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded group-open:text-base-content transition-colors">
              {section.icon}
              {section.title}
            </summary>
            <div className="mt-4 text-base-content/90">{section.content}</div>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center text-base-content/70 text-sm">
        For questions or support, contact us at <a href="mailto:info@hobbyhub.com" className="underline text-primary">info@hobbyhub.com</a>.
      </div>
    </section>
  </main>
);

export default Terms;