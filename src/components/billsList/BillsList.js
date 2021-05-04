import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from "react-bootstrap4-modal";
import moment from 'moment'
import  * as fromUsersApi from '../../api/users'


class BillsList extends React.Component {

    constructor(props) {
        super(props)

        this.state = ({
            idFraisForfait: ['KM' , 'NUI', 'REP'],
            visible: false,
            quantite:'',
            mois:'',
            bills: [],
            users:[],
            fraishorsforfait: [],
            kmQty:0,
            nightsQty:0,
            repasQty:0,
            profileImg:''
        })

    }

    handleChange(e){
        e.preventDefault()
        let name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    handleRowsChange(e, i){
        e.preventDefault()
        let {name, value } = e.target
        let fraishorsforfait = [...this.state.fraishorsforfait]
        fraishorsforfait[i] = {
            ...fraishorsforfait[i],
            [name] : value
        }
        this.setState({
            fraishorsforfait : fraishorsforfait    
        })
    }

    ShowModal() {
        
        this.setState({
            visible: !this.state.visible
        })
    }

    async getLignes(mois) {
 
        let id = localStorage.getItem('id')
        let ligneff = await fromBillsApi.getLigneFraisForfait(id, mois)
        let lignefhf = await fromBillsApi.getLigneFraisHorsForfait(id,mois)
        lignefhf.result.map((ligne,i) => {

            ligne.date = moment(ligne.date).format("YYYY-MM-DD")
        })
        
        this.setState({
            kmQty: ligneff.result[0].quantite,
            nightsQty: ligneff.result[1].quantite,
            repasQty: ligneff.result[2].quantite,
            fraishorsforfait: lignefhf.result,
            mois: mois

        })

    }

    async update() {
        let idUser = localStorage.getItem('id')
        
        await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[0],this.state.kmQty)
        await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[1],this.state.nightsQty)
        await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[2],this.state.repasQty)
        
        this.state.fraishorsforfait.map(async (f,i) => {
            let horsforfait = await fromBillsApi.putLigneFraisHorsForfait(f.id, {idutilisateur : idUser, mois: this.state.mois, libelle : f.libelle, date : f.date, montant : f.montant, libelle: f.libelle})
        })

        
        this.setState({
            visible : !this.state.visible
        })
    }

    addRows() {
        
        this.setState({
            fraishorsforfait: [...this.state.fraishorsforfait, {date: '' , libelle: '', montant: '', justificatif: ''}]
        })
    }
    removeRows(i){
        let row = this.state.fraishorsforfait
        row.splice(i,1)
        this.setState({
            fraishorsforfait:row
        })
    }

    async componentDidMount() {
        let id = localStorage.getItem('id')
        let bills = await fromBillsApi.getBills(id)
        this.setState({ 
            bills: bills.result,
            
        })

        
    }

    render() {

        return (

            <main className="flex-shrink-0">
                <div className="container">
                   <br/> <h3 className="mt-5">Bonjour, voici vos fiches de frais : </h3> <br/>
                    <table className="table table-hover">
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
                            {
                                this.state.bills.map((bill, i) => {
                                
                                   bill.dateModif = moment(bill.dateModif,'YYYY-MM-DD[T]HH:mm:ss').format("DD-MM-YYYY")
                                    return (
                                        <tr>
                                            <th scope="row">{bill.mois}</th>
                                            <td>{bill.nbJustificatifs}</td>
                                            <td>{bill.montantValide}</td>
                                            <td>{bill.dateModif}</td>
                                            <td>{bill.idEtat}</td>
                                            <td>
                                                <button type="button" class="btn btn-info btn-sm" data-action="update" onClick={() => {this.ShowModal(); this.getLignes(bill.mois)}}>
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    
                                })
                            }
                        </tbody>
                    </table>
                    <Modal visible={this.state.visible} dialogClassName="modal-80w font-size center modal-fond modal-dialog-scrollable">
                            
                        <div className="modal-header">
                            <h4 className="modal-title">Modification Fiche Frais de {this.state.mois} </h4>
                            <button type="button" className="btn btn-danger" onClick={() => this.ShowModal()}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                        
                            <h5 className="centrer">Frais Forfait </h5>
                            <div className="card border-primary">
                                <div className="card-body">
                                    <table className="table text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Frais </th>
                                                <th scope="col">Quantité</th>
                                                <th scope="col">Montant unitaire</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><label className="form-control-label"><strong>Nuitées</strong></label></td>
                                                <td><input type="text" name="nightsQty" placeholder="Qté" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)} /></td>
                                                <td>80€</td>
                                                <td>{this.state.nightsQty * 80}€</td>
                                            </tr>
                                            <tr>
                                                <td><label for="" className="form-control-label"><strong>Repas</strong></label></td>
                                                <td><input type="text" name="repasQty" placeholder="Qté" value={this.state.repasQty} onChange={(e) => this.handleChange(e)} /></td>
                                                <td>29€</td>
                                                <td>{this.state.repasQty * 29}</td>
                                            </tr>
                                            <tr>
                                                <td><label for="" className="form-control-label"><strong>Kilométrage</strong></label></td>
                                                <td><input type="text" name="kmQty" placeholder="Qté" value={this.state.kmQty} onChange={(e) => this.handleChange(e)} /></td>
                                                <td>0.6€</td>
                                                <td>{this.state.kmQty * 0.6}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br />
                            <h5 className="centrer">Frais Hors Forfait </h5>
                            <div className="card border-primary">
                                <div className="card-body">
                                <button type="button" className="btn btn-success btn-sm" onClick={() => this.addRows()}>Ajoutez un frais hors forfait</button>
                                    <table className="table text-center">
                                        <thead>                                
                                        
                                            <tr> 
                                                <th scope="col">Dates</th>
                                                <th scope="col">Libellé</th>
                                                <th scope="col">Montant</th>
                                                <th scope="col"> Justificatifs</th>
                                                <th scope="col"> Actions</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                        
                                            {
                                                
                                                this.state.fraishorsforfait.map((f, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td><input type="date" name="date" value={this.state.fraishorsforfait[i].date} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                                            <td><input type="text" placeholder="Libellé" name="libelle" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                                            <td><input type="text   " placeholder="Montant" name="montant" value={this.state.fraishorsforfait[i].montant} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                                            <td><input type="file" name="justificatif" value={this.state.fraishorsforfait[i].justificatif} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" onClick={() => this.removeRows(i)}>
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                
                                            }
                                            
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => this.update()}>
                                Enregistrer
                            </button>
                            <button type="button" className="btn btn-light" onClick={() => this.ShowModal()}>
                                Annuler
                            </button>
                        </div>
                    
                    </Modal>
                </div>

            </main>

        )

    }


}

export default BillsList;
