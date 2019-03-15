import React, {Component} from 'react';
import axios from 'axios';

import ProductItem from './ProductItem';

class Home extends Component{
    state = {
        products: []
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
        .then(response => {
            this.setState({products: response.data})
        })
    }

    renderList = () => {
        return this.state.products.map(iteem => {
            return (
                <ProductItem item = {iteem}/> //jadi ini mengambil data dari component ProductItem
            )
        })
    }

    render(){
        return(
            <div className="row">
                {/* Div untuk searchbar */}
               <div className="col-2">
                    <h1 className="display-4">Search</h1>
                </div>
                 {/* Div untuk produk  */}
                 <div className="row col-10">
                    {this.renderList()}
                 </div>
            </div>
        )
    }
}

export default Home;