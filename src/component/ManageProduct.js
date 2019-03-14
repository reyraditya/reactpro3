import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class ManageProduct extends Component {
    state = {
        products: [],
        inputProductForm: {
            name: "",
            desc: "",
            price: "",
            src: "",
            id: ""
        },
        isUpdate: false
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(response => {
                this.setState({products: response.data})
            })
    }

    onDelete = (i) => { // i menampung id produk yg didelete/diklik
        axios.delete(`http://localhost:1996/products/${i}`)
        .then(() => {
            this.getProduct()
        })
    }

    handleFormChange = (event) => {
        let inputProductFormNew = {...this.state.inputProductForm};
        let idStamp = this.id;

        if(!this.state.isUpdate){
            inputProductFormNew["id"] = idStamp;
        } inputProductFormNew[event.target.name] = event.target.value ;
          this.setState({inputProductForm: inputProductFormNew})
    
    }

    postAPI = () => {
        axios.post('http://localhost:1996/products',
        this.state.inputProductForm)
        .then(() => {
            this.getProduct()
        }).then(formbacktoblank => {
            this.setState({
                inputProductForm: {
                    name: "",
                    desc: "",
                    price: "",
                    src: "",
                    id: ""
                }
            })
        })
    }

    putAPI = () => {
        axios.put(`http://localhost:1996/products/${this.state.inputProductForm.id}`, this.state.inputProductForm)
        .then(() => {
            this.getProduct()
        }).then(changebacktopost => {
            this.setState({
                isUpdate: false,
                inputProductForm: {
                    name: "",
                    desc: "",
                    price: "",
                    src: "",
                    id: ""
                }
            })
        })
    }

    onAdd = () => {
        if(this.state.isUpdate){
            this.putAPI();
        } else {
            this.postAPI();
        }
    }

    onEditClick = (i) => {
        console.log(i)
        this.setState({
            inputProductForm: i,
            isUpdate: true
        })
    }

    renderList = () => {
        return this.state.products.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button onClick={() => {this.onEditClick(item)}} className="btn btn-primary mr-2">Edit</button>
                        <button onClick={() => {this.onDelete(item.id)}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Manage Product</h1>
                <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input value={this.state.inputProductForm.name} ref={input => this.name = input} name="name" className="form-control" type="text" onChange={this.handleFormChange} /></th>
                                <th scope="col"><input value={this.state.inputProductForm.desc} ref={input => this.desc = input} name="desc" className="form-control" type="text" onChange={this.handleFormChange} /></th>
                                <th scope="col"><input value={this.state.inputProductForm.price} ref={input => this.price = input} name="price" className="form-control" type="text" onChange={this.handleFormChange} /></th>
                                <th scope="col"><input value={this.state.inputProductForm.src} ref={input => this.src = input} name="src" className="form-control" type="text" onChange={this.handleFormChange} /></th>
                                <th scope="col"><button onClick={this.onAdd} className="btn btn-outline-warning" >Add/Update</button></th>
                            </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}

export default connect()(ManageProduct) 

