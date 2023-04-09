import React, { useEffect, useState } from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";


const Newsletter = () => {
  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   axios.post('/api/gmail-accounts/')
  //     .then(response => setGmailAccounts(response.data))
  //     .catch(error => console.log(error));
  // }, []);
  let getToken = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    console.log(e.target.value)
    // axios.get('http://127.0.0.1:8000/roomsession/', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     //'Authorization': 'Token 0dba9d202f030608724613043df6dbb4bd0e4d86', 
    //     'Authorization': 'Token 562aa9f6b2f54b6784d2dd3fc02f4ccee1c60d0b',
    //   },
    // })
    e.preventDefault();
    const data = {email}
    const res = await axios.post('http://127.0.0.1:8000/jobs/api/gmail-accounts/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken}`,
      }
    })
      .then(response => {
        console.log(response);
        alert("Done! Now You are now Subscriber, wait 20 seconds to get you email")
        setEmail("")
      })
      .catch(error => {
        console.log(error);
        alert("Please Type an email")
      });
    console.log({email});
  };
  return (
    <section style={{marginTop:"8%"}} className=" p-5 container">
      <Container className="newsletter ">
        <Row>
          <Col  className="text-center">
            <h2 className="mb-4">Subscribe to Our Newsletter</h2>
            <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className=" row subscribe">
              <input onChange={(e) => setEmail(e.target.value)} type="text" className="col-9" placeholder="Email" value={email}/>
              <button type="submit" style={{backgroundColor:"#25caac"}} className="btn btn-outline-light rounded-5 text-right col-3">Subscribe</button>
            </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;