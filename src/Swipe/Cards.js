import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import TinderCard from 'react-tinder-card'
import Ripple from '@bit/joshk.react-spinners-css.ripple';
import '../assets/Swipe/Cards.css'
import Header from './Header'
import Footer from './Footer'
import Match from './Match'
import Card from './Card'
import Card2 from './Card2'
import * as swipe_actions from '../store/actions/swipe_action'
import * as chat_actions from '../store/actions/chat_action'
import * as contact_actions from '../store/actions/contact_action'


function Cards(props) {
    

    const [people, setPeople] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [popup, setPopup] = useState(false)
    const [matchedPerson, setMatchedPerson] = useState()
    const [ripple, setRipple] = useState(false)
    let alredyRemoved = []

    useEffect(async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/list/`)
      console.log('data::',res.data)
      if (Array.isArray(res.data)) {
        setPeople(...people, ...res.data)
      }
      props.receive_swipe(props.id)
    }, [])

    let users = people
    const childRefs = useMemo(() => Array(people.length).fill(0).map(i => React.createRef(), []))
  
    const swiped = (direction, person) => {
      console.log('name:',person.name)
      setLastDirection(direction)
      alredyRemoved.push(person.name)
      if (direction === 'right') {
        props.Swipe(props.swipe_id, person.user, person.user)
        axios.get(`${process.env.REACT_APP_API_URL}/swipe/detail/${person.user}/`)
        .then(res => {
          if (res.data.liked.includes(props.id)) {
            console.log('MATCH')
            setMatchedPerson(person)
            setPopup(true)
            props.chat_create(props.id, person.user)
            props.add_friend(props.id, person.user)

          }
        })
      } else {
        props.Swipe(props.swipe_id, person.user, null)
      }
    }

    function onClose() {
      setPopup(false)
    }

  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
      users = users.filter(person => person.name !== name)
      setPeople(users)
    }
    const swipe = (dir) => {
      const cardsLeft = people.filter(person => !alredyRemoved.includes(person.name))
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1]
        const index = people.map(person => person.name).indexOf(toBeRemoved.name)
        // alredyRemoved.push(toBeRemoved) 
        childRefs[index].current.swipe(dir)
        swiped(dir, toBeRemoved)
      }
    }
    if (props.swiped !== null && props.swiped !== undefined) {
      console.log(props.swiped)
      if (props.swiped.length > 0) {
        alredyRemoved = [...props.swiped]
      }
  }


  if (people.length > 0) { //await
      if (alredyRemoved.length >= people.length && ripple === false) {
        setRipple(true)
      }
  }



  return (
      <div>
      <Header/>
    <div className="cards">
    
      {people.length>0?people.map((person, index) => {
        // if (person.user === props.id || props.swiped.includes(person.user)===true) { 
        //   return (<></>)
        // } else { 
        return ( <>
          <TinderCard
          ref={childRefs[index]} className='swipe' 
          key={person.name} onSwipe={(dir) => swiped(dir, person)}
          onCardLeftScreen={() => outOfFrame(person.name)}
          preventSwipe={['up', 'down']}>
            <Card2 data={person}/>
          </TinderCard>
          </>)
        // }      
      }):<></>
      }
      <div style={{marginLeft: '15px',     marginTop: '100px', textAlign:'center'}}>
      {ripple? <><Ripple color='skyblue' size='200px' style={{zIndex:'-1'}}/>
      <h1 style={{color:'#2c7f80'}}>You swiped all cards.<br/>
      Please wait until new accouts will be created.</h1></>: <></>}
      </div>
      <Match person={matchedPerson} onClose={onClose} popup={popup}/>
    </div>
    <Footer swipe_left={() => swipe('left')} swipe_right={() => swipe('right')}/>
    </div>
  );
}


const mapstateToProps = state => {
  return {
    id: state.auth_reducer.id,
    swiped: state.swipe_reducer.swiped,
    liked: state.swipe_reducer.liked,
    swipe_id: state.swipe_reducer.swipe_id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Swipe: (swipe_id, swiped, liked) => dispatch(swipe_actions.Swipe(swipe_id, swiped, liked)),
    chat_create: (user, friend) => dispatch(chat_actions.Create(user, friend)),
    add_friend: (id, friend) => dispatch(contact_actions.Update(id, friend)),
    receive_swipe: (id) => dispatch(swipe_actions.Receive(id)),
  }
}
export default connect(mapstateToProps, mapDispatchToProps)(Cards);



