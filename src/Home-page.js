import React, { useEffect, useState } from 'react';
import './home-page.css';
import './navbar.css';
import axios from 'axios';



export const HomePage = () => {
   const [status, setStatus] = useState(false);
   const [userData, setUserData] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [searchValue, setSearchValue] = useState('');
   const [activIndex, setActivIndex] = useState(null);

   const click = (value) => {
    setActivIndex(value)
   }

   useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  //  const search = (value) => {
  //      return setSearchValue(value);
  //  }
   
  // const filterUsers = userData.filter((user => user.name.toLowerCase().include(searchValue.toLocaleLowerCase())));
  return (
    <div style={status === true ? { zIndex: 1 } : {}} className="p-5 position-relative">
      <h1 className="fw-bold">Users</h1>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-lg-end">
          <input onChange={(e) => {setSearchValue(e.target.value)}} className="navbar-brand rounded-3" placeholder="Search users" />
          <div>
            <button
              onClick={() => setStatus(true)}
              style={status === true ? { display: "none" } : {}}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {
              status === false 
              ? (
                <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
                  <ul className="navbar-nav">
                    <li style={activIndex === 0 ? {backgroundColor: "rgb(110, 102, 223)", color: "white", borderRadius:'10px'} : {}} onClick={() => {click(0)}} className="nav-item list">
                      <a className="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li style={activIndex === 1 ? {backgroundColor: "rgb(110, 102, 223)", color: "white", borderRadius:'10px'} : {}} onClick={() => {click(1)}}  className="nav-item list">
                      <a className="nav-link" href="#">Features</a>
                    </li>
                    <li style={activIndex === 2 ? {backgroundColor: "rgb(110, 102, 223)", color: "white", borderRadius:'10px'} : {}} onClick={() => {click(2)}}  className="nav-item list">
                      <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li style={activIndex === 3 ? {backgroundColor: "rgb(110, 102, 223)", color: "white", borderRadius:'10px'} : {}} onClick={() => {click(3)}} className="nav-item list">
                      <a className="nav-link" aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                </div>
              ) 
              : (
                <div
                  style={{ left: status === false ? -100 : 0, transition: 'left 2s' }}
                  className="bodyNavbar bg-white position-absolute top-0 right-0"
                >
                  <button
                    onClick={() => setStatus(false)}
                    type="button"
                    className="btn btn-primary mx-3 my-3"
                  >
                    <i className="fw-bold fa-5x bi bi-x-lg"></i>
                  </button>
                  <ul className="">
                  <li className="list">
                       <a className="" aria-current="page" href="#">Home</a>
                  </li>

                    <li className="list">
                      <a className="" href="#">Features</a>
                    </li>
                    <li className="list">
                      <a className="" href="#">Pricing</a>
                    </li>
                    <li className="list">
                      <a className="">Disabled</a>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </div>
      </nav>
      <div className="row mt-5">
        {userData.filter(item => searchValue === "" ? userData : item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.username.toLowerCase().includes(searchValue.toLowerCase()) || item.address.city.toLowerCase().includes(searchValue.toLowerCase()) || item.company.name.toLowerCase().includes(searchValue.toLowerCase()) ).map(user => (
          <div key={user.id} className="col-lg-4 col-12 col-md-6 col-sm-12">
            <div className="card1 d-flex mt-4 rounded-4 py-4 px-3">
              <img
                width="100px"
                height="100px"
                className="object-fit-cover rounded-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAll_iIwU59RPDJtIIWVusSkLAhCgayKBrw&s"
                alt="User Avatar"
              />
              <div>
                <p className="p-0 m-0 fw-bold">{user.name}</p>
                <p style={{ fontSize: '14px' }} className="fw-bold p-0 m-0">{user.username}</p>
                <p className='p-0 m-0'><i class="bi bi-house-door-fill pe-1"></i>  {user.address.city}</p>
                <p className='p-0 m-0'><i class="bi bi-telephone-fill pe-1"></i>{user.phone.slice(0,12)}</p>
                <p className='p-0 m-0'><i class="bi bi-buildings-fill pe-1"></i>{user.company.name}</p>
                <div className="d-flex gap-3 flex-wrap">
                  <p className="border px-2 rounded-3 m-0 text-primary">clothes</p>
                  <p className="border px-2 rounded-3 p-0 m-0 text-primary mt-0">storm</p>
                  <p className="border px-2 rounded-3 p-0 m-0 text-primary mt-0">clothes</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
