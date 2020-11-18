import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../assets/SettingProfile.css'
import { connect } from 'react-redux'


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
  

function Profile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function time() {
    props.time_start || props.time_end ?
    (<>{props.time_start}~{props.time_end}</>)
    : (<></>)
  }
  

  return (
    <Card id='root'>
      <CardMedia
        className='media'
        image= {props.image}
        title= {props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.name}
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
          <Typography>My native language: {props.native_lan}<br/>
                I want to learn: {props.foreign_lan}<br/><br/>
          </Typography>
        <Typography paragraph>freeday: {props.freeday}  {time}</Typography>
          <Typography paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapstateToProps = state => {
  return {
    name: state.profile_reducer.name,
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

export default connect(mapstateToProps, null)(Profile)

// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 345,
//       margin: 30,
//     },
//     media: {
//       height: 0,
//       paddingTop: '56.25%', // 16:9
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//   }));
  
//   export default function Profile() {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
  
//     const handleExpandClick = () => {
//       setExpanded(!expanded);
//     };
  
//     return (
//       <Card className={classes.root}>
//         <CardHeader
//           avatar={
//             <Avatar aria-label="recipe" className={classes.avatar}>
//               R
//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings">
//               <MoreVertIcon />
//             </IconButton>
//           }
//           title="Shrimp and Chorizo Paella"
//           subheader="September 14, 2016"
//         />
//         <CardMedia
//           className={classes.media}
//           image="/static/images/cards/paella.jpg"
//           title="Paella dish"
//         />
//         <CardContent>
//           <Typography variant="body2" color="textSecondary" component="p">
//             This impressive paella is a perfect party dish and a fun meal to cook together with your
//             guests. Add 1 cup of frozen peas along with the mussels, if you like.
//           </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//           <IconButton aria-label="add to favorites">
//             <FavoriteIcon />
//           </IconButton>
//           <IconButton aria-label="share">
//             <ShareIcon />
//           </IconButton>
//           <IconButton
//             className={clsx(classes.expand, {
//               [classes.expandOpen]: expanded,
//             })}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <ExpandMoreIcon />
//           </IconButton>
//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <Typography paragraph>Method:</Typography>
//             <Typography paragraph>
//               Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
//               minutes.
//             </Typography>
//           </CardContent>
//         </Collapse>
//       </Card>
//     );
//   }