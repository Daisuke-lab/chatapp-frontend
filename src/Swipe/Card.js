import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../assets/Card.css'
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
  

function OneCard(props) {
  console.log(props.data)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function time() {
    var time_range = null
    props.time_start !== null || props.time_end !== null ?
    time_range = <>{props.time_start}~{props.time_end}</>
    :  time_range = (<></>)
    return time_range
}


  return (
    <Card id='card_root'>
      <CardMedia
        className='media'
        image= {props.data.image}
        title="Nana Mori"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.name}
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
        <Typography paragraph>freeday: {props.freeday}  {time()}</Typography>
          <Typography paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

// const mapstateToProps = state => {
//   return {
//     name: state.profile_reducer.name,
//     gender: state.profile_reducer.gender,
//     age: state.profile_reducer.age,
//     native_lan: state.profile_reducer.native_lan,
//     foreign_lan: state.profile_reducer.foreign_lan,
//     image: state.profile_reducer.image,
//     location: state.profile_reducer.location,
//     time_start: state.profile_reducer.time_start,
//     time_end: state.profile_reducer.time_end,
//     intro: state.profile_reducer.intro,
//     freeday: state.profile_reducer.freeday

//   }
// }

// export default connect(mapstateToProps, null)(OneCard)
export default OneCard