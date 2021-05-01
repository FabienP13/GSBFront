import React from 'react'
import './Login.css'
import logo from '../../asset/logo.png'
import * as fromUsersApi from '../../api/users'
import {withRouter } from "react-router-dom";
import Modal from "react-bootstrap4-modal";
import  {postUsers} from '../../api/users'

class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            login:'',
            password:'',
            visible: false
        }
    }

    
    handleChange(e){
        e.preventDefault()
        let name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    ShowModal() {
        this.setState({
            visible: !this.state.visible
        })
    }

    async login(){
    try {
        let {decoded, token } = await postUsers({login: this.state.login, password:this.state.password})
        if(decoded){
            localStorage.setItem('token', token)
            localStorage.setItem('id', decoded.id)
            localStorage.setItem('nom', decoded.nom)
            localStorage.setItem('prenom', decoded.prenom)
            this.props.history.push('/accueil')
        } 
     } catch (err){
            this.setState({
                visible: !this.state.visible
            })
        }
        
    }


render (){
    return(
        <div className="maincontainer">
        <div className="container-fluid">
            <div className="row no-gutter">
               
                <div className="col-md-6 d-none d-md-flex bg-image">
                    <img src={logo} alt=""/>
                </div>
                
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                       
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    
                                    <h3 className="display-4 fontsize">Connexion Accès Visiteur</h3>
                                    
                              
                                        <div className="form-group mb-3">
                                            <input name="login" type="email" placeholder="Adresse mail" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" value= {this.state.login} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input name="password" type="password" placeholder="Mot de passe" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value= {this.state.password} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        {/* <div className="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" class="custom-control-input" />
                                            <label for="customCheck1" className="custom-control-label">Mémoriser le mot de passe</label>
                                        </div> */}
                                        <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm centrer" onClick={() => this.login()}>Se connecter</button>
                                        </div>
                                        
                                        
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                    
                    <Modal visible={this.state.visible} dialogClassName="" role="alert" onClickBackdrop={() => this.ShowModal()}>

                <div className="modal-body alert alert-danger">
                    
                    <h6 className="centrer">Votre mot de passe ou votre identifiant est incorrect.</h6>
                   
                  
                </div>                  
                  

                    </Modal>

      </div>
    )
}
}
export default withRouter(Login);