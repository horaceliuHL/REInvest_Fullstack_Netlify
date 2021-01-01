import {useState,useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import Cookie from 'js-cookie';
import {loadingPage} from './loading';


export const PrivateRoute = ({ component: Component, ...rest }) => {

  const handleAuthVerification = async () => {
    let cookieTester = Cookie.get('auth'); //document.cookie.match(new RegExp('(^| )' + 'auth' + '=([^;]+)'))[2];
    if(cookieTester == null) return false;
    axios.post('https://reinvest-life.herokuapp.com/api/user/checkLoggedIn',{auth: cookieTester},{withCredentials:true}).then(res =>{
      if(res.status === 200){
        setLog(true);
      }else{
        setLog(false);
      }
    })
  }
  const [isLog, setLog] = useState(false);
  const [route, setRoute] = useState(loadingPage);
  useEffect(()=>{
    handleAuthVerification();
    console.log(isLog);
    setTimeout(()=>{
      setRoute(<Redirect to = '/login'/>);
    },2000);
  },isLog)

  return (
    <Route {...rest} render={(props) => (
      isLog === true ? <Component {...props} auth = {isLog}/>
            : route
        )} 
    />
  )
}