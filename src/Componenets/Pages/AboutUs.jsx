import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a passionate team dedicated to bringing innovative solutions to
          the world. Our mission is to create products that make a positive
          impact on people's lives by solving real-world problems with creativity,
          expertise, and a deep understanding of our users' needs.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-12">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Our Mission</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Our mission is to deliver high-quality, reliable, and accessible
            products that enhance productivity, creativity, and quality of life.
            We value integrity, innovation, and customer satisfaction above all.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">Meet the Team</h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://i.ibb.co.com/M57nh9vd/man.jpg"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-600">CEO & Founder</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://i.ibb.co.com/sd9N3mzQ/man2.jpg"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">Jane Smith</h4>
            <p className="text-gray-600">Product Manager</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://i.ibb.co.com/8D1ffScg/man3.jpg"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">Michael Brown</h4>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 bg-gray-800 text-white py-12">
        <div className="text-center">
          <h3 className="text-3xl font-semibold">Join Our Journey</h3>
          <p className="text-lg mt-4 max-w-xl mx-auto">
            Be part of our amazing journey and help us create solutions that
            transform industries and improve lives. Together, we can make a difference.
          </p>
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
