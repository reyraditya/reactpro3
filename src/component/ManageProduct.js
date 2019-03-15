import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


class ManageProduct extends Component {
    state = {
        products: [],
        selectedId: 0,
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(response => {
                this.setState({products: response.data, selectedId: 0})
            })
    }

    onDelete = (i) => { // i menampung id produk yg didelete/diklik, namanya terserah bisa diganti apa aja
        axios.delete(`http://localhost:1996/products/${i}`)
        .then(() => {
            this.getProduct()
        })
    }

    onAdd = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = this.price.value
        const src = this.src.value

         axios.post('http://localhost:1996/products/',{
            name,
            desc,
            price,
            src
        }).then(() => {
            this.getProduct();
            // Mengosongkan input form add setelah tombol add diklik
            this.name.value = ""
            this.desc.value = ""
            this.price.value = ""
            this.src.value = ""
        }) 
    }

    onEditClick = id => {
        this.setState({selectedId: id})
    }

    onSaveClick = (id) => {
        const Name = this.editName.value;
        const Desc = this.editDesc.value;
        const Price= this.editPrice.value;
        const Src = this.editSrc.value;

        axios.put('http://localhost:1996/products/' + id,{
            name: Name,
            desc: Desc,
            price: Price,
            src: Src
        }).then(() => {
            this.getProduct()
        })
    }

    renderList = () => {
        return this.state.products.map(item => {
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td><img className="list" src={item.src} alt={item.desc}></img></td>
                        <td>
                            <button onClick={() => {this.onEditClick(item.id)}} className="btn btn-primary mr-2">Edit</button>
                            <button onClick={() => {this.onDelete(item.id)}} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            } else{
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editSrc = input}} type="text" defaultValue={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveClick(item.id)}} className="btn btn-primary mr-2">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        if (this.props.username !== ''){
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
                                    <th scope="col"><input ref={input => this.name = input} name="name" className="form-control" type="text"/></th>
                                    <th scope="col"><input ref={input => this.desc = input} name="desc" className="form-control" type="text"/></th>
                                    <th scope="col"><input ref={input => this.price = input} name="price" className="form-control" type="text"/></th>
                                    <th scope="col"><input ref={input => this.src = input} name="src" className="form-control" type="text"/></th>
                                    <th scope="col"><button onClick={this.onAdd} className="btn btn-outline-warning" >Add</button></th>
                                </tr>
                            </tbody>
                    </table>
                </div>
            )   
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mstp = state => {
    return {username: state.auth.username}
}
export default connect(mstp)(ManageProduct) 

