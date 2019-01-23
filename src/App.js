import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'cb7ce68aa6724ad39df9ca85b01805c0'
 });

const particlesOptions = {
  "particles": {
      "number": {
          "value": 200
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  constructor() {
    super(); // so we can use this
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value,});
  }

  onButtonSubmit = (event) => {
    console.log('clicked');
    this.setState({imageURL: this.state.input});

    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} />
        <Logo />
        <Register />
        { this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <div>
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
            </div>
          }
      </div>
    );
  }
}

export default App;
