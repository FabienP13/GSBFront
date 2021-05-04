import React from 'react'
import '../App.css';
import Footer from '../components/footer/Footer'
import Login from '../components/login/Login'


class Logins extends React.Component {

  constructor(props){
    super(props)
  }

  render (){
    return (
      <body class="d-flex flex-column h-100">
          
          <Login/>
          <Footer />
           

    </body>
    )

  }

}

export default Logins;
