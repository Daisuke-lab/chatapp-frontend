import React, {useState, useEffect, useMemo} from 'react'
import TinderCard from 'react-tinder-card'
import '../assets/Cards.css'
import Header from './Header'
import Footer from './Footer'
import Card from './Card'
import '../assets/Footer.css'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';



const alredyRemoved = []
function Cards() {
  //const people = [] is tsame as this
  //people = this.state
  //setPeople = setState
  let users = [{name: 'kanna hashimoto',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8UPpwQxL6RFeJ5tNGbpYDkOOB0OCTzq1kgw&usqp=CAU'
  },
  {name: 'yui niigaki',
  image: 'https://aisaregirl.com/wp-content/uploads/2019/10/aragaki.jpg'
  }]


  const [people, setPeople] = useState([
      {name: 'kanna hashimoto',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8UPpwQxL6RFeJ5tNGbpYDkOOB0OCTzq1kgw&usqp=CAU'
    },
    {name: 'yui niigaki',
    image: 'https://aisaregirl.com/wp-content/uploads/2019/10/aragaki.jpg' 

    }]);
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(people.length).fill(0).map(i => React.createRef()), [])
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
      alredyRemoved.push(nameToDelete)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
      users = users.filter(person => person.name !== name)
      setPeople(users)
    }
  
    const swipe = (dir) => {
      const cardsLeft = people.filter(person => !alredyRemoved.includes(person.name))
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
        const index = people.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
        alredyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].current.swipe(dir) // Swipe the card!
      }
    }

  return (
      <div>
      <Header/>
    <div className="cards">
      {people.map((person, index) => (
        <TinderCard
        ref={childRefs[index]} className='swipe' 
        key={person.name} onSwipe={(dir) => swiped(dir, person.name)}
        onCardLeftScreen={() => outOfFrame(person.name)}
        preventSwipe={['up', 'down']}>
          <Card data={person}/>
        </TinderCard>
      ))}
    </div>
    <div className="footer">
      <IconButton id='swipeButtons_nope' onClick={() => swipe('left')}>
        <CloseIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_repeat'>
        <ReplayIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_like' onClick={() => swipe('right')}>
        <FavoriteIcon fontSize='large'/>
      </IconButton>
    </div>
    </div>
  );
}

export default Cards;

{/* <div className='card'
        style={{ backgroundImage:"url(" + person.image + ")"}}>
          <h3>{person.name}</h3>
        </div> */}