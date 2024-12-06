import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const images = [
  'o1.jpg',
  'o2.jpg',
  'o3.jpg',
  'o4.jpg',
  'o5.jpg',
  'o6.jpg',
  'o7.jpg',
  'o8.jpg',
  'o9.jpg',
  'o10.jpg'
];

export default class LightboxExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div style={{width:"210px",margin:"auto"}}> 
        {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
         Ordination
        </button> */}
        <div>
                 <h3 className="text-center text-light bg-info py-1 mx-5 mt-5 rounded" style={{ fontWeight:"100" ,width:"210px", marginBottom:"0" }}>Ordination</h3>
        <div className="p-1 mx-5 bg-info border border-light rounded" onClick={() => this.setState({ isOpen: true })} style={{ cursor:"pointer",border:"1px solid black",width:"210px" }}>
         {/* <h3 className="text-center text-light" style={{ fontWeight:"100" }}>Ordination</h3> */}
          <div>
          <img className="m-1 rounded-circle" src="o1.jpg" width="90" height="50" />
          <img className="m-1 rounded-circle" src="o2.jpg" width="90" height="50" />
          </div>
          <div>
          <img className="m-1 rounded-circle" src="o3.jpg" width="90" height="50" />
          <img className="m-1 rounded-circle" src="o4.jpg" width="90" height="50" />
          </div>
        </div>
        </div>
         
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}