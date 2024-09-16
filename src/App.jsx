import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const fetchDog = async () => {
    try {
      const response = await fetch('https://random.dog/woof.json');
      const data = await response.json();
      const videoExtensions = ['mp4', 'webm'];
      const url = data.url;
      const fileExtension = url.split('.').pop();
      setIsVideo(videoExtensions.includes(fileExtension));
      setMediaUrl(url);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white fixed w-full top-0 left-0 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">Izinja</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-gray-300">About</a></li>
            <li><a href="#services" className="hover:text-gray-300">Services</a></li>
            <li><a href="#media" className="hover:text-gray-300">Media</a></li>
            <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col justify-center items-center text-center p-10 pt-28">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Izinja</h1>
        <p className="text-lg text-white mb-8">A world of random dog media, powered by Duncan Ramuhashi.</p>
        <a href='#media'>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Started</button>
        </a>
       
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center p-10 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">About Izinja</h2>
        <p className="text-lg max-w-2xl">Izinja showcases random dog images and videos. Whether you love dogs or just want to smile, Izinja is here for you!</p>
      </section>


      {/* Media Section */}
      <section id="media" className="min-h-screen flex flex-col justify-center items-center text-center p-10 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">Random Dog Media</h2>
        <p className="text-lg mb-8">Click "Next" to see a new dog image or video!</p>
        <div className="flex flex-col justify-center items-center">
          {mediaUrl ? (
            isVideo ? (
              <video className="w-full max-w-lg h-auto md:h-96 rounded-lg shadow-lg mb-6" controls>
                <source src={mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="w-full max-w-lg h-auto md:h-96 rounded-lg shadow-lg mb-6" src={mediaUrl} alt="Random media" />
            )
          ) : (
            <p>Loading media...</p>
          )}
          <button onClick={fetchDog} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Next</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-blue-600 text-white flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg max-w-2xl mb-8">Reach out to us for more dog content or any inquiries!</p>
        <a href='https://www.petsplace.co.za/puppies.php' target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Contact Me</button>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        <p>© 2024. Powered by Duncan Ramuhashi</p>
      </footer>
    </div>
  );
}

export default App;
