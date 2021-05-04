import React from 'react'
import './Header.css';


class Header extends React.Component {

  constructor(props){
    super(props)
  }

  signOut(e) {
    localStorage.clear();
    this.props.history.push('/')
  }


  render (){
    return (

    
<header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/accueil">GSB</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/accueil">Mes fiches de frais</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="CreateBill">Saisir ma fiche de frais</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/" onClick={() => this.signOut()}>Déconnexion</a>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</header>

    )

  }


}

export default Header;
