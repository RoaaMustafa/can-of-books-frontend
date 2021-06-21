import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./myFavoriteBooks.css";
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from "react-bootstrap/Carousel";
require("dotenv").config();

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // showComponent: false,
    };
  }
  componentDidMount = () => {
    let server = process.env.REACT_APP_SERVER_URL;
    let bookReqUrl = `${server}/books?email=${this.props.auth0.user.email}`;
    // console.log(server);
    axios.get(bookReqUrl).then((bookResult) => {
      let dataBook = bookResult.data;
      this.setState({
     data: dataBook
      })
    });
    console.log(this.state.data);
    // console.log(this.state.data);
    // console.log(this.state.dataBook);
  };
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Carousel fade>
          {/* {isAuthenticated && this.componentDidMount()} */}
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>This is a collection of my favorite books</p>
          </Jumbotron>
          {
            this.state.data.map((item, indx) => {
              return (
                <Carousel.Item key={indx} interval={1000}>
                  <img
                    className="d-block w-100"
                    src={item.status}
                    alt="slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
