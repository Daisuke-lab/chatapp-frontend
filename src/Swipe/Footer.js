import React from 'react'
import '../assets/Footer.css'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';


import StarRateIcon from '@material-ui/icons/StarRate';

const onLike = () => {
  console.log('Like')
}
function Footer() {
  return (
    <div className="footer">
      <IconButton id='swipeButtons_nope' >
        <CloseIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_repeat'>
        <ReplayIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_like'>
        <FavoriteIcon fontSize='large'/>
      </IconButton>
    </div>
  );
}

export default Footer;

// <IconButton id='swipeButtons_star' >
// <StarRateIcon fontSize='large'/>
// </IconButton>