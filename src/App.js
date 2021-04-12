import React from 'react'
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props)
  }

  render (){
    return (
      <body class="d-flex flex-column h-100">
    
<header>
  
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">GSB</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Mes fiches de frais</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Saisir ma fiche de frais</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Déconnexion</a>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</header>

<main class="flex-shrink-0">
  <div class="container">
    <h1 class="mt-5">Bonjour M. Visiteur</h1>
  </div>
</main>

<div className="container">
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Mois</th>
      <th scope="col">Justificatifs</th>
      <th scope="col">Montant</th>
      <th scope="col">Date de modification</th>
      <th scope="col">Etat</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td></td>
      <td></td>
      <td> 
        <button type="button" class="btn btn-info btn-sm" data-action="delete" data-target="">
        <i class="fas fa-edit"></i>
      </button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>



    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

      
  </body>
    )

  }


}

export default App;
