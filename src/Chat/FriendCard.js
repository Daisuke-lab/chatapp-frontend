import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ClearIcon from '@material-ui/icons/Clear';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import '../assets/Swipe/Card.css'
import '../assets/Swipe/Match.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
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

function FriendCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.data.images.length >0? props.data.images.length: 1

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  function time() {
    var time_range = null
    props.data.time_start != null || props.data.time_end != null ?
    time_range = <>{props.data.time_start}~{props.data.time_end}</>
    :  time_range = (<></>)
    return time_range
}

  function freeday() {
    var freeday = null
    props.data.freeday != null ?
    freeday = <>freeday: {props.data.freeday}</>
    :
    freeday = null
    return freeday
  }

  return (
      <Card id='match_card'>
        <div id='card_imagebox' style={{position:'relative'}}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
        {props.data.images.map((step, index) => (
            <div key={props.data.name}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step} alt={props.data.name} />
              ) : null}
            </div>))}
          </SwipeableViews>
          <div id='card_stepper'>
          <MobileStepper
          variant="dots"
          steps={maxSteps>1? maxSteps: 0 }
          position="static"
          activeStep={activeStep}
          className="card_stepper"
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} id='outline'>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0} id='outline'>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
          />
        </div>
        <IconButton id='match_icon' onClick={props.handleClose}>
            <ClearIcon id='card_clearicon'/>
            </IconButton>
    </div>

    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.name}
        </Typography>
      </CardContent>
      <Typography style={{marginLeft: '10px'}}>native language: {props.data.native_lan}<br/>
                 want to learn: {props.data.foreign_lan}<br/><br/>
      </Typography>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          id='outline'
        >
          <ExpandMoreIcon onClick={handleExpandClick} id='outline'/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>{freeday}  {time}</Typography>
          <Typography className='card_intro'  paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default FriendCard;

