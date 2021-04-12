import {Route, Redirect} from 'react-router-dom'

const getAuth = () =>(localStorage.getItem('token'))

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      getAuth()
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )

export default ProtectedRoute