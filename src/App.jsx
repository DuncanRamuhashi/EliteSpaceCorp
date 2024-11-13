import React, { useEffect, useState } from 'react';

function App() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [joke, setJoke] = useState(null); // State to hold a single joke
  const [loadingJokes, setLoadingJokes] = useState(true); // State to track if jokes are loading

  // Fetch random dog media (image or video)
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
 
  const fetchJokes = async () => {  // Specify that this is a void function by using `: void`
    setLoadingJokes(true); // Start loading the joke when the button is clicked
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke', {
        method: 'GET',
      });
  
      if (response.ok) {
        const data = await response.json();
        setJoke(data); // Set the joke to the state (single joke object)
        setLoadingJokes(false); // Stop loading once the joke is set
      } else {
        throw new Error('Failed to fetch joke');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setLoadingJokes(false); // Stop loading if there's an error
    }
  };
  
  // Use effect to fetch dog media when the component mounts
  useEffect(() => {
    fetchDog();

  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 fixed w-full top-0 left-0 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-extrabold text-white">Izinja</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="text-white hover:text-gray-200 transition">About</a></li>
            <li><a href="#media" className="text-white hover:text-gray-200 transition">Media</a></li>
            <li><a href="#contact" className="text-white hover:text-gray-200 transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 flex flex-col justify-center items-center text-center p-10 pt-28">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Izinja</h1>
        <p className="text-lg text-white mb-8">A world of random dog media, powered by Duncan Ramuhashi.</p>
        <a href="#media">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105">Get Started</button>
        </a>
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
              <img className="w-full max-w-lg h-auto md:h-96 rounded-lg shadow-lg mb-6" src={mediaUrl} alt="Random dog" />
            )
          ) : (
            <p className="text-lg">Loading media...</p>
          )}
           {loadingJokes ? (
          <div className="animate-spin border-t-4 border-blue-600 w-12 h-12 rounded-full mb-4"></div>
        ) : (
          joke && (
            <div className="py-5 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg">{joke.setup}</p>
              <p className="text-lg font-semibold mt-2">{joke.punchline}</p>
            </div>
          )
        )}
          <button onClick={fetchDog} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">Next</button>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="flex flex-col justify-center items-center text-center p-10 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">About Izinja</h2>
        <p className="text-lg max-w-2xl mb-6">
          Izinja showcases random dog images and videos. Whether you love dogs or just want to smile, Izinja is here for you!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-600 text-white flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg max-w-2xl mb-8">Reach out to us for more dog content or any inquiries!</p>
        <a href='https://www.petsplace.co.za/puppies.php' target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105">Contact Me</button>
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
