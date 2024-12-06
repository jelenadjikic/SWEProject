import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'fam.jpg',
    key: '2'
  },
  {
    src: 'baka.jpg',
    key: '3'
  },
  {
    src: 'bw.jpg',
    key: '3'
  },
 
  {
    src: 'dentist1.jpg',
    key: '1'
  }
];

const Carous = () => <UncontrolledCarousel items={items} />;

export default Carous;
