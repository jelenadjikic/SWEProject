import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthContext from "./context/auth-context";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthLogin from "./components/AuthLogin";
import Admin from "./components/auth/users/Admin";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import ChangeUserPassword from "./components/auth/users/ChangeUserPassword";
import AddUser from "./components/auth/users/AddUser";
import AddPatient from "./components/auth/patients/AddPatient";
import Patients from "./components/auth/patients/Patients";
import Records from "./components/auth/patients/Records";
import Forum from "./components/auth/forum/Forum";
import Messages from "./components/auth/messages/Messages";
import PatientSchedule from "./components/auth/schedual/PatientSchedule";
import UserSchedule from "./components/auth/schedual/UserSchedule";
import Carton from "./components/auth/patients/Carton";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/auth/users/Users";
import Footer from "./components/pages/Footer"
import About from "./components/pages/About";
import Gallery from "./components/pages/Gallery";
import Ourteam from "./components/pages/OurTeam";
import Aestethic from './components/pages/Aestethic';
import Surgery from './components/pages/Surgery';
import Endodontics from './components/pages/Endodontics';
// import Reservation from './components/auth/schedual/Reservation';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage.getItem("tokenExpiration")
  );
  const context = useContext(AuthContext);

  const logout = () => {
    console.log("Logged out");
    setName("");
    setRole("");
    setToken("");
    setTokenExpiration("");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    console.log("name", context.name);
    console.log("Token", context.token);
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          name,
          setName,
          role,
          setRole,
          tokenExpiration,
          setTokenExpiration,
          logout,
        }}
      >
        <ApolloProvider client={client}>
          <Router>
            <Header />
            <div className="cont">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/ourteam" component= {Ourteam}/>
                <Route path="/authLogin" component={AuthLogin} />
                {/* <Route path="/admin" component={ Admin } /> */}
                <Route path="/admin">
                  {" "}
                  {token !== null ? (
                    <Admin />
                  ) : (
                    <Redirect to="/authLogin" />
                  )}{" "}
                </Route>

                {/* <Route path="/users" component={ Users } /> */}
                <Route path="/users">
                  {" "}
                  {role === "admin" && token !== null ? (
                    <Users />
                  ) : (
                    <Redirect to="/authLogin" />
                  )}{" "}
                </Route>
                <Route path="/addUser">
                  {" "}
                  {role === "admin" && token !== null ? (
                    <AddUser />
                  ) : (
                    <Redirect to="/authLogin" />
                  )}{" "}
                </Route>

                {/* <Route path="/addUser" component={ AddUser } /> */}
                {/* <Route path="/changeUserPassword" component={ ChangeUserPassword } /> */}
                <Route path="/changeUserPassword">
                  {" "}
                  {token !== "" ? (
                    <ChangeUserPassword />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>

                {/* <Route path="/addPatient" component={ AddPatient} /> */}
                <Route path="/addPatient">
                  {" "}
                  {role === "user" && token !== null ? (
                    <AddPatient />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>

                {/* <Route path="/patients" component={ Patients } /> */}
                <Route path="/patients">
                  {" "}
                  {role === "user" && token !== null ? (
                    <Patients />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>

                <Route path="/forum" component={Forum} />
                <Route path="/records" component={Records} />
                {/* <Route path="/records"> { role==="user" ? <Records />:< Redirect to="/"/>  } </Route> */}
                {/* <Route path="/messages" component={ Messages } /> */}
                {/* <Route path="/patients" > { role==="user" && token!==null  ?  <Patients/> : < Redirect to="/"/>  } </Route> */}
                <Route path="/messages">
                  {" "}
                  {token !== "" ? <Messages /> : <Redirect to="/" />}{" "}
                </Route>

                {/* <Route path="/patientSchedule" component={ PatientSchedule } /> */}
                <Route path="/patientSchedule">
                  {" "}
                  {role === "patient" && token !== "" ? (
                    <PatientSchedule />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>

                {/* <Route path="/userSchedule" component={ UserSchedule } /> */}
                <Route path="/userSchedule">
                  {" "}
                  {role === "user" && token !== null ? (
                    <UserSchedule />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>
                {/* <Route path="/carton" component={ Carton} /> */}
                <Route path="/carton">
                  {" "}
                  {role === "patient" && token !== "" ? (
                    <Carton />
                  ) : (
                    <Redirect to="/" />
                  )}{" "}
                </Route>

                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/aesthetic" component= { Aestethic } />
                <Route path="/surgery" component= { Surgery } />
                <Route path="/endodontics" component={ Endodontics } />
                {/* <Route path="/reservation" component={ Reservation} /> */}
                {/* <Route path="/admin" > { role==="admin" && token!==null  ?  <Admin/> : < Redirect to="/login"/>  } </Route> */}
              </Switch>
            </div>
            <Footer/>
          </Router>
        </ApolloProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
