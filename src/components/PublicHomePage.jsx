import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRobot, FaTimes } from 'react-icons/fa';

const PublicHomePage = () => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get('http://localhost:5000/api/courses');
        setCourses(coursesRes.data);

        try {
          const lecturersRes = await axios.get('http://localhost:5000/api/lecturers');
          setLecturers(lecturersRes.data);
        } catch {
          setLecturers([]);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center py-40 text-xl font-semibold">Loading...</div>;

  const features = [
    { title: 'Experienced Instructors', desc: 'Learn from industry-certified professionals with real-world experience.' },
    { title: 'Comprehensive Courses', desc: 'From beginners to professionals: Web Dev, Graphic Design, Programming & more.' },
    { title: 'Flexible Learning Options', desc: 'Adapt your education with flexible schedules and online options.' },
    { title: 'State-of-the-Art Facilities', desc: 'Equipped with latest technology for optimal learning.' },
    { title: 'Analytical Support', desc: 'Advanced IT analytics, system optimization, software testing & compliance.' },
    { title: 'Consultation', desc: 'Expert ICT guidance to tackle challenges and optimize networks.' }
  ];

  return (
    <div className="font-sans text-gray-800 scroll-smooth scroll-pt-20 relative">

      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="text-2xl font-bold text-firebrick flex items-center gap-2">
            <img src="/images/icons/LOGO.svg" alt="Logo" className="w-10 h-10 object-contain" />
            ITDLH - Negombo
          </Link>
          <div className="space-x-6 hidden md:flex">
            <a href="#vision" className="hover:text-firebrick transition">Vision & Mission</a>
            <a href="#features" className="hover:text-firebrick transition">Features</a>
            <a href="#courses" className="hover:text-firebrick transition">Courses</a>
            <a href="#lecturers" className="hover:text-firebrick transition">Lecturers</a>
            <a href="#contact" className="hover:text-firebrick transition">Contact</a>
            <Link to="/login" className="bg-firebrick text-white px-4 py-2 rounded shadow hover:bg-red-700 transition">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen bg-gradient-to-r from-red-600 via-firebrick to-red-800 text-white flex items-center px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-firebrick to-darkRed opacity-80 z-0"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Left: Logo + Motto */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/icons/LOGO.svg"
              alt="LMS Logo"
              className="w-40 h-40 md:w-48 md:h-48 rounded-lg bg-white border-2 border-gold shadow-lg object-contain"
            />
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white">Learn. Grow. Succeed.</h2>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            className="md:ml-10 max-w-lg text-center md:text-left"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-snug">
              <span className="text-gold">Information Technology & Distance Learning Hub</span>  <span className="text-white">Negombo</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100">
              Bridging the gap between technology and education with quality IT courses, professional training, and experienced instructors.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center md:justify-start">
              <a href="#courses" className="bg-white text-firebrick font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">View Courses</a>
              <a href="#signup" className="bg-gold text-firebrick font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition">Sign Up Now</a>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto p-8 mt-24 space-y-32">
        {/* Vision & Mission */}
        <motion.section
          id="vision"
          className="text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-firebrick mb-6">Vision & Mission</h2>
          <p className="max-w-3xl mx-auto text-lg mb-4">
            Our institute was established to bridge the gap between technology and education. We deliver quality IT courses, professional training, and advanced facilities to equip individuals with the skills to succeed in the modern digital world.
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-firebrick text-center mb-12">Discover Our Exclusive Features</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Courses Section */}
        <motion.section
          id="courses"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-firebrick text-center mb-12">Our Courses</h2>
          {courses.length === 0 ? (
            <p className="text-center text-gray-600">No courses available.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {courses.map(course => (
                <motion.div
                  key={course.course_id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{course.course_name}</h3>
                  <div className="text-lg font-semibold text-green-600">
                    Fee: Rs. {Number(course.amount).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Lecturers Section */}
        <motion.section
          id="lecturers"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-firebrick text-center mb-12">Meet Our Lecturers</h2>
          {lecturers.length === 0 ? (
            <p className="text-center text-gray-600">Lecturer information coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lecturers.map(lecturer => (
                <div key={lecturer.lecturer_id} className="bg-white rounded-2xl shadow-lg text-center p-6 hover:scale-105 transform transition-all duration-300">
                  <img src={lecturer.image_url} alt={lecturer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200" />
                  <h3 className="text-xl font-bold">{lecturer.name}</h3>
                  <p className="text-md text-blue-600 font-semibold mb-2">{lecturer.title}</p>
                  <p className="text-gray-600">{lecturer.bio}</p>
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">ITDLH - Negombo</h3>
            <p>Distance learning center details, courses, lecturers, and guidance to enhance your career.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p>📞 +94 112 785 141</p>
            <p>✉ info@moha.gov.lk</p>
            <p>📍 Isurupaya, Battaramulla, Sri Lanka</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#vision" className="hover:text-firebrick transition">Vision & Mission</a></li>
              <li><a href="#features" className="hover:text-firebrick transition">Features</a></li>
              <li><a href="#courses" className="hover:text-firebrick transition">Courses</a></li>
              <li><a href="#lecturers" className="hover:text-firebrick transition">Lecturers</a></li>
              <li><Link to="/login" className="hover:text-firebrick transition">Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12 border-t border-gray-700 pt-6 text-sm">&copy; 2025 IT & DL Hub. All rights reserved.</div>
      </footer>

      {/* ChatBot UI */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

// ChatBot Component
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleOpen = () => setOpen(!open);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);

    // Placeholder bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: "Hello! How can I assist you today?" }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="flex flex-col items-end">
      {open && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden mb-3">
          <div className="bg-firebrick text-white px-4 py-2 flex justify-between items-center">
            <span className="font-bold">ITDLH ChatBot</span>
            <button onClick={toggleOpen}><FaTimes /></button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.from === 'user' ? 'bg-firebrick text-white self-end' : 'bg-gray-200 text-gray-800 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-300 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded px-3 py-2 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-firebrick text-white px-4 py-2 rounded hover:bg-red-700">Send</button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={toggleOpen}
          className="bg-firebrick text-white p-4 rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center"
        >
          <FaRobot size={24} />
        </button>
      )}
    </div>
  );
};

export default PublicHomePage;
