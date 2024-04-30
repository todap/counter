// import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Counter context
// const CounterContext = React.createContext();

// // Reducer function for managing counter state
// const counterReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET':
//       return { count: action.count , myCount: action.myCount};
    
//     case 'INCREMENT':
//       return { ...state, count: state.count + 1 };
//     case 'DECREMENT':
//       return {...state, count: state.count - 1 };
//     case 'INCREMENT-MYCOUNT':
//         return {...state, myCount: state.myCount + 1 };
//     case 'DECREMENT-MYCOUNT':
//         return {...state, myCount: state.myCount - 1 };
//     default:
//       return state;
//   }
// };


// const Home = () => {
//   const { state } = useContext(CounterContext);

//   return (
//     <div>
//       <h1>Counter Value: {state.count}</h1>
//       <Link to="/counter">Counter</Link>
//       <h1>MyCounter Value: {state.myCount}</h1>
//       <Link to="/counter">Counter</Link>
//     </div>
//   );
// };

// const Counter = () => {
//   const { state, dispatch } = useContext(CounterContext);
//   const navigate = useNavigate();

//   const fetchCounter = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:3005/api/counter');
//       dispatch({ type: 'SET', count: response.data.count, myCount: response.data.myCount});
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     fetchCounter();
//   }, [fetchCounter]);

//   const incrementCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:3005/api/counter/increment');
//       dispatch({ type: 'INCREMENT' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   const decrementCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:3005/api/counter/decrement');
//       dispatch({ type: 'DECREMENT' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   const incrementMyCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:3005/api/counter/MyIncrement');
//       dispatch({ type: 'INCREMENT-MYCOUNT' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   const decrementMyCounter = useCallback(async () => {
//     try {
//       await axios.post('http://localhost:3005/api/counter/MyDecrement');
//       dispatch({ type: 'DECREMENT-MYCOUNT' });
//     } catch (err) {
//       console.error(err);
//     }
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Counter</h2>
//       <p>Count: {state.count}</p>
//       <button onClick={incrementCounter}>Increment</button>
//       <button onClick={decrementCounter}>Decrement</button>
//       <button onClick={() => navigate('/')}>Go to Home</button>
//       <br></br>
//       <h2>MyCounter</h2>
//       <p>Count: {state.myCount}</p>
//       <button onClick={incrementMyCounter}>Increment</button>
//       <button onClick={decrementMyCounter}>Decrement</button>

//       <button onClick={() => navigate('/')}>Go to Home</button>
//     </div>
//   );
// };

// const App = () => {
//   const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount:0 });
//   console.log(state);
//   return (
//     <CounterContext.Provider value={{ state, dispatch }}>
//       <Router>
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/counter">Counter</Link>
//               </li>
//             </ul>
//           </nav>

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/counter" element={<Counter />} />
//           </Routes>
//         </div>
//       </Router>
//     </CounterContext.Provider>
//   );
// };

// export default App;

import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CounterContext = React.createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { count: action.count , myCount: action.myCount};
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return {...state, count: state.count - 1 };
    case 'INCREMENT-MYCOUNT':
      return {...state, myCount: state.myCount + 1 };
    case 'DECREMENT-MYCOUNT':
      return {...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <Link to="/counter">Counter</Link>
      <h1>MyCounter Value: {state.myCount}</h1>
      <Link to="/mycounter">MyCounter</Link>
    </div>
  );
};

// New MyCounter component
const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const incrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:3005/api/counter/MyIncrement');
      dispatch({ type: 'INCREMENT-MYCOUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMyCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:3005/api/counter/MyDecrement');
      dispatch({ type: 'DECREMENT-MYCOUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>MyCounter</h2>
      <p>Count: {state.myCount}</p>
      <button onClick={incrementMyCounter}>Increment</button>
      <button onClick={decrementMyCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/counter');
      dispatch({ type: 'SET', count: response.data.count, myCount: response.data.myCount});
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:3005/api/counter/increment');
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('http://localhost:3005/api/counter/decrement');
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
      <br></br>
      <MyCounter /> 
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount: 0 });
  console.log(state);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/mycounter">MyCounter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/mycounter" element={<MyCounter />} /> {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
