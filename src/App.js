import React, { useEffect }from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import * as auth_actions from './store/actions/auth_action'
import Home from './Authentication/Home'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Activate from './Authentication/Activate'
import PasswordReset from './Authentication/PasswordReset'
import PasswordResetConfirm from './Authentication/PasswordResetConfirm'
import Cards from './Swipe/Cards'
import ChatPanels from './Swipe/ChatPanels'
import Setting from './Setting/Setting'
import Layout from './hoc/Layout'
import Chat from './Component/Chat'
import Editor from './Setting/Editor'
const App = (props) => {

    useEffect(() => {
        props.checkAuthenticated();
    })

        return(
            <Router>
              <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset_password' component={PasswordReset} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={PasswordResetConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    {/* <Layout> */}
                    <Route exact path="/chat/test" component={Chat} />
                    <Route exact path='/swipe' component={Cards}/>
                    <Route exact path='/setting' component={Setting}/>
                    <Route exact path='/chat' component={ChatPanels}/>
                    <Route exact path='/edit' component={Editor}/>
                {/* </Layout> */}
              </Switch>
            </Router>
        );
}
  
// :chatID
{/* <Router>
<div id="frame">
    <Sidepanel />
    <div className="content">
        <Profile />
        <BaseRouter />
    </div>
</div>
</Router> */}


const mapDispatchToProps = dispatch => {
    return {
        checkAuthenticated: () => dispatch(auth_actions.checkAuthenticated)
    }
}

export default connect(null, mapDispatchToProps)(App)
