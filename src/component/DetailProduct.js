import React, { Component } from 'react'
import axios from 'axios';

export default class DetailProduct extends Component {
    state = {
        product: {}
    }

    componentDidMount(){
        const idProduct = parseInt(this.props.match.params.id)
        console.log(idProduct);
        
        axios.get('http://localhost:1996/products/' + idProduct)
        .then(res => {
            this.setState({product: res.data})
            console.log(res.data);
            
        })
    }

    render() {
    const {product} = this.state;
    return (
        <div className="card" key={product.id}>
            <div className="card-header">
                {product.name}
            </div>
            <div className="card-body">
                <img src={product.src} alt={product.name} />
                <h3 className="card-title">Product: {product.name}</h3>
                <p className="card-text">Description: {product.desc}</p>
                <p className="card-text">Price: {product.price}€</p>
                <a href="/" className="btn btn-block btn-primary">Add to Cart</a>
            </div>
        </div>
    )
  }
}
