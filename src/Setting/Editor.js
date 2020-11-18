import React, { useEffect, useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import Profile from './Profile'
import '../assets/Editor.css'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ImageIcon from '@material-ui/icons/Image';
import * as profile_actions from '../store/actions/profile_action';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../assets/SettingProfile.css'
import { connect } from 'react-redux'
import default_image from '../assets/default_image.jpg'

const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      marginRight: 'auto',
      outline: 'none',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));


const Editor = (props) => {
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [formData, setFormData] = useState({
        name: props.name,
        account_id: props.account_id,
        gender: props.gender,
        age: props.age,
        native_lan: props.native_lan,
        foreign_lan: props.foreign_lan,
        location: props.location,
        time_start: props.time_start,
        time_end: props.time_end,
        intro: props.intro,
        freeday: props.freeday 
    })

    const [formImage, setFormImage] = useState(props.image)

    const languages = ['Arabic','Bengali','Burmese','Chinese','English','French','German','Gujarati','Hindi','Italian','Japanese','Kannada','Korean','Malayalam',
    'Marathi','Oriya','Panjabi','Persian','Polish','Portuguese','Russian','Spanish','Tamil','Telugu','Thai','Turkish','Ukrainian','Urdu','Vietnamese']

    const days = ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const genders = ['Male', 'Female', 'Other']



    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function time() {
        var time_range = null
        time_start !== '' || time_end !== '' ?
        time_range = <>{time_start}~{time_end}</>
        :  time_range = (<></>)
        return time_range
    }
    
    function Imagehandler(e) {
        console.log(e.target.files[0])
        // .name => nashi
        var image_file = e.target.files[0]
        setFormImage(image_file)
    
    }

    const {name, account_id, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e =>{
        e.preventDefault()
        props.update(name, account_id, age, gender, native_lan, foreign_lan, formImage, location, time_start, time_end, intro, freeday)
        setProfileUpdated(true)
    }
    if (profileUpdated) {
        return <Redirect to='/setting'/>
    }

    return (
        <div className='edit'>
            <div className='edit_header'>
                <Link to='/setting'>
                    <IconButton style={{outline:'none'}}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Link>
            </div>

            <div className='edit_content'>
            <Card id='root'>
                <CardMedia
                    className='media'
                    image={formImage}
                    title="Nana Mori"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {name}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                <Typography>My native language: {native_lan}<br/>
                I want to learn: {foreign_lan}<br/><br/></Typography>
                    <Typography paragraph>free time: {freeday}<br/>{time()}</Typography>
                    <Typography paragraph id='profile_intro'>
                        {intro}
                    </Typography>
                    </CardContent>
                </Collapse>
            </Card>



                <div className='edit_setting'>
                    <form className='edit_form' onSubmit={onSubmit} encType='multipart/form-data'>
                    <div className='edit_container'>
                        <h1>Setting</h1>
                            <input placeholder='name' type='text' name='name' value={name} className='edit_input' onChange={onChange}/>
                            <input placeholder='age' type="number" name='age' value={age} className='edit_input' onChange={onChange}/>
                            <select className='edit_select' name='gender' onChange={onChange}>
                                <option hidden>gender</option>
                                {genders.map((sex) => {
                                    if (sex===gender) {
                                        return <option selected>{sex}</option>
                                    } else {
                                    return <option>{sex}</option>
                                    }
                                })}
                            </select>
                            <select className='edit_select' name='native_lan' onChange={onChange} required>
                                <option hidden>You speak...</option>
                                {languages.map((language) => {
                                    if (language===native_lan) {
                                        return <option selected>{language}</option>
                                    } else {
                                    return <option>{language}</option>
                                    }
                                })}
                            </select>
                            <select className='edit_select' name='foreign_lan' onChange={onChange} required>
                                <option hidden>You want to learn ...</option>
                                {languages.map((language) => {
                                    if (language===foreign_lan) {
                                        return <option selected>{language}</option>
                                    } else {
                                    return <option>{language}</option>
                                    }
                                })}
                            </select>

                            <select className='edit_select' name='freeday' onChange={onChange}>
                                <option hidden>You are free on ...</option>
                                {days.map((day) => {
                                    if (day===freeday) {
                                        return <option selected>{day}</option>
                                    } else {
                                    return <option>{day}</option>
                                    }
                                })}
                            </select>
                            <div className='edit_time'>
                            <input type='time' className='edit_input_time' name='time_start' value={time_start} onChange={onChange}/>
                            ~
                            <input type='time' className='edit_input_time' name='time_end' value={time_end} onChange={onChange}/>
                            </div>
                            <label className='edit_input_file'>
                                {formImage!==`${default_image}` ? <p1><AutorenewIcon className='edit_icon'/>{formImage.name}</p1>  
                                : <p1><ImageIcon className='edit_icon'/>choose your image</p1>}
                            <input placeholder='image' type='file' name='image' className='edit_input' accept="image/png, image/jpeg"　onChange={Imagehandler}/>
                            </label>
                            <textarea placeholder='Write your profile message here!' name='intro' value={intro} type='text' className='edit_input' onChange={onChange}/>
                            </div>
                            <button className='edit_button' type='submit'><span>SAVE</span></button>
                        </form> 
                </div>
            </div>
       </div>
    )
}


const mapstateToProps = state => {
    return {
      name: state.profile_reducer.name,
      account_id: state.profile_reducer.account_id,
      gender: state.profile_reducer.gender,
      age: state.profile_reducer.age,
      native_lan: state.profile_reducer.native_lan,
      foreign_lan: state.profile_reducer.foreign_lan,
      image: state.profile_reducer.image,
      location: state.profile_reducer.location,
      time_start: state.profile_reducer.time_start,
      time_end: state.profile_reducer.time_end,
      intro: state.profile_reducer.intro,
      freeday: state.profile_reducer.freeday
  
    }
  }
  


const mapDispatchToProps = dispatch => {
    return {
        update : (name, account_id, age, gender, native_lan, foreign_lan, image, location, time_start, time_end, intro, freeday) => 
        dispatch(profile_actions.Update(name, account_id, age, gender, native_lan, foreign_lan, image, location, time_start, time_end, intro, freeday))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Editor)



// const language_option = () => {
//     languages.map((language) => {
//         console.log(language)
//         if (language===native_lan) {
//             return <option value={language} selected>{language}</option>
//         } else {                                                                    I don't know why but it didn'T work
//             return <option value={language}>{language}</option>
//         }
//     })
// }

