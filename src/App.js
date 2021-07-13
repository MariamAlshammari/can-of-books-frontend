import React from 'react';
import axios from 'axios';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BestBooks from './BestBooks'
import Profile from './components/Profile';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookArr: [],
      showBooksComponent: false,
      userEmail:''
      
    }
  }
  componentDidMount= async () => {
    try {
    const { user }=this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`})
  
      
      
        
        let url=`${process.env.REACT_APP_PORT}books?userEmail=malshammari37@gmail.com`;

      let result = await axios.get(url);
      
      await this.setState({
        bookArr: result.data,
        showBooksComponent: true
      });

    } catch (error) {
      console.log(error);
    }}

    
  // localhost:3001/addCat?catName=fluffy&catBreed=baldi&ownerName=razan
  addBook = async(event) =>{
    event.preventDefault();
    let bookName = event.target.bookName.value;
    let bookDescribtion = event.target.bookDescribtion.value;
    let ownerName = this.state.userEmail

    const bookFormData = {
      bookName :event.target.bookName.value,
      bookDescribtion :event.target.bookDescribtion.value,
      ownerName :this.state.userEmail
    }
    // let booksData = await axios.get(`${this.state.server}/addBook?bookName=${bookName}&bookDescribtion=${bookDescribtion}&ownerName=${userEmail}`)

    let booksData = await axios.post(`${this.state.server}/addBook`,bookFormData)

    this.setState({
      books: booksData.data
    })

  }
  
  render() {
    
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

              {this.props.auth0.isAuthenticated ?
                <BestBooks />
                :
                <Login />}

              
            </Route>
            <Route exact path="/profile">
              {this.props.auth0.isAuthenticated && <Profile /> }
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
        
      </>
    );
   
    
  }
}

export default withAuth0(App);
