import React from 'react'
import '../App.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import CreateBill from '../components/createBill/CreateBill'


class CreateBills extends React.Component {

  constructor(props){
    super(props)
  }

  render (){
    return (
      <body class="d-flex flex-column h-100">
          <Header />
          <CreateBill/>
          <Footer />
           

    </body>
    )

  }


}

export default CreateBills;
