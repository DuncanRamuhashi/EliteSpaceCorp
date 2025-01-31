import React, { useEffect, useState } from 'react';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [joke, setJoke] = useState(null);
  const [loadingJokes, setLoadingJokes] = useState(true);

  // Fetch random dog media
  const fetchDog = async () => {
    try {
      const response = await fetch('https://random.dog/woof.json');
      const data = await response.json();

      const videoExtensions = ['mp4', 'webm'];
      const url = data.url;
      const fileExtension = url.split('.').pop();
      setIsVideo(videoExtensions.includes(fileExtension));
      setMediaUrl(url);
      fetchJokes();
    } catch (error) {
      console.error('Error fetching dog media:', error);
    }
  };

  // Fetch random joke
  const fetchJokes = async () => {
    setLoadingJokes(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (response.ok) {
        const data = await response.json();
        setJoke(data);
        setLoadingJokes(false);
      } else {
        throw new Error('Failed to fetch joke');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setLoadingJokes(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="font-sans bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-200 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r  to-indigo-500 fixed w-full top-0 left-0 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="  md:text-3xl font-extrabold text-white">Pawtopia</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="text-white hover:text-pink-300 transition">About</a></li>
            <li><a href="#media" className="text-white hover:text-pink-300 transition">Media</a></li>
            <li><a href="#contact" className="text-white hover:text-pink-300 transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center p-10 pt-28">
        <h1 className="text-5xl font-bold text-pink-300 mb-4">Welcome to Pawtopia</h1>
        <p className="text-lg text-gray-300 mb-8">A cute world of random dog media, powered by Elite Dogs.</p>
        <a href="#media">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-transform transform hover:scale-105">Get Started</button>
        </a>
      </section>

      {/* Media Section */}
      <section id="media" className="min-h-screen flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-bold text-pink-400 mb-4">Random Dog Media</h2>
        <p className="text-lg mb-8 text-gray-300">Click "Next" to see a new dog image or video!</p>
        <div className="flex flex-col justify-center items-center">
          {mediaUrl ? (
            isVideo ? (
              <video className="w-full max-w-lg h-auto rounded-xl shadow-lg mb-6" controls>
                <source src={mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="w-full max-w-lg h-auto rounded-xl shadow-lg mb-6" src={mediaUrl} alt="Random dog" />
            )
          ) : (
            <p className="text-lg">Loading media...</p>
          )}
          {loadingJokes ? (
            <div className="animate-spin border-t-4 border-pink-400 w-12 h-12 rounded-full mb-4"></div>
          ) : (
            joke && (
              <div className="py-5 bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
                <p className="text-lg">{joke.setup}</p>
                <p className="text-lg font-semibold mt-2">{joke.punchline}</p>
              </div>
            )
          )}
          <button onClick={fetchDog} className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-transform transform hover:scale-105">Next</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="flex flex-col justify-center items-center text-center p-10 bg-gray-800">
        <h2 className="text-4xl font-bold text-pink-400 mb-4">About Pawtopia</h2>
        <p className="text-lg max-w-2xl mb-6">
        Pawtopia showcases random dog images and videos. Whether you love dogs or just want to smile, Pawtopia is here for you!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-r  from-gray-900 via-gray-800 to-black  text-white flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg max-w-2xl mb-8">Reach out to us for more dog content or any inquiries!</p>
        <a href='https://dogtownsa.org/pet-category/up-for-adoption/?gad_source=1&gclid=CjwKCAiA7Y28BhAnEiwAAdOJUO1hxwad_LljbcuW5pAX_p6MQhikSECLXJNC3EyP4USiaBmUllWhCRoCHoUQAvD_BwE' target="_blank" rel="noopener noreferrer">
          <button className="bg-gray-900 text-pink-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-transform transform hover:scale-105">Contact Me</button>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black  text-gray-400 p-6 text-center">
        <p>© {new Date().getFullYear()}. Powered by Elite Dogs </p>
      </footer>
    </div>
  );
}

export default App;
