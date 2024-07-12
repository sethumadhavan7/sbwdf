import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./App.css";

function App() {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [wish, setWish] = useState('');

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const wishes = {
      brother: `Happy Birthday, ${name}! You’re the best brother ever!`,
      sister: `Happy Birthday, ${name}! You’re the best sister ever!`,
      mother: `Happy Birthday, ${name}! You’re the best mother ever!`,
      father: `Happy Birthday, ${name}! You’re the best father ever!`,
      friend: `Happy Birthday, ${name}! You’re the best friend ever!`
    };
    const generatedWish = wishes[relationship.toLowerCase()] || `Happy Birthday, ${name}!`;
    setWish(generatedWish);

    axios.post('https://deploy-mern-api.vercel.app/wish', { name, relationship, wish: generatedWish })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: 'purple', minHeight: '100vh' }}>
      <div className="row w-100">
        <div className="col-12 col-md-6 offset-md-3 bg-white p-3 rounded">
          <h2>Sethumadhavan's Birthday Wisher</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="relationship">
                <strong>Relationship</strong>
              </label>
              <select
                name="relationship"
                className="form-control rounded-0"
                onChange={(e) => setRelationship(e.target.value)}
              >
                <option value="">Select Relationship</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="friend">Friend</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Generate Wish
            </button>
          </form>
          {wish && (
            <div className="mt-3">
              <h3>Your Birthday Wish:</h3>
              <p>{wish}</p>
            </div>
          )}
        </div>
      </div>
      <div className='footerimg'>
        <img src="./images/heart.webp" alt=""/>
      </div>
    </div>
  );
}

export default App;
