import React from 'react';  
const Home = () => {
    return (
        <div className="homepage">
        

              {/* Hero Section */}
              <div className="hero bg-gray-100 relative text-center py-10">
                  <div className="overlay bg-black bg-opacity-25 absolute inset-0"></div>
                  <div className="content relative z-10">
                      <h2 className="text-xl font-bold text-white">
                          Welcome to Scalpelly
                      </h2>
                      <p className="text-white">Best Healthcare Solution In Your City</p>
                  </div>
              </div>

              {/* Main Section */}
              <main className="main py-10 px-4">
                  <div className="grid grid-cols-3 gap-4">
                      <div className="card bg-white shadow p-4">
                          <h3>Find One of Our Doctors</h3>
                          <button className="btn-primary">Find a Doctor</button>
                      </div>
                      <div className="card bg-white shadow p-4">
                          <h3>Schedule an Appointment</h3>
                          <button className="btn-primary">Request Appointment</button>
                      </div>
                      <div className="card bg-white shadow p-4">
                          <h3>Log In to Dashboard</h3>
                          <button className="btn-primary">Login</button>
                      </div>
                  </div>
              </main>

              {/* Footer */}
              <footer className="footer bg-gray-200 text-center py-4">
                  <p>A healthier you starts here. Make an appointment now!</p>
                  <button className="btn-secondary">Schedule an Appointment</button>
              </footer>
        </div>
    );
};

export default Home;
