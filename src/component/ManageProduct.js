import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class ManageProduct extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(res => {
                this.setState({products: res.data})
            })
    }

    onDelete = (i) => { // nampung id yg didelete/diklik
        axios.delete(`http://localhost:1996/products/${i}`)
        .then(response => {
            this.getProduct()
        })
    }

    onAdd = () => {
        const name = this.name.value;
        const desc = this.desc.value;
        const price = this.price.value;
        const pict = this.src.value;

        axios.post('http://localhost:1996/products', {
            name,
            desc,
            price,
            pict
        }).then(response => {
            this.getProduct()
        })
    }
    //

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
                        <button className="btn btn-primary mr-2">Edit</button>
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
                    <h1 className="display-4 text-center">input Product</h1>
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
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.src = input} className="form-control" type="text" /></th>
                                <th scope="col"><button onClick={this.onAdd}  className="btn btn-outline-warning" >Add</button></th>
                            </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}

export default connect()(ManageProduct) 

