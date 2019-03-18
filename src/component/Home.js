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

    onSearchClick = () => {
        const nameSearch = this.nameSearch.value;
        console.log(nameSearch);
        

        var products = this.state.products.filter(product => {
            return product.name.toLowerCase().includes(nameSearch.toLowerCase())
        })
        if (nameSearch !== ""){
            this.setState({products})
        } else{
            this.getProduct()
        }
    }
    
    // this.setState({
    //     products: this.state.products.filter(product => {
    //         if(nameSearch !== ""){
    //             return(
    //                 product.name.toLowerCase().includes(nameSearch)
    //             )
    //         } else{
    //             return this.getProduct()
    //         }
    //     })
    // }) 


    // const max = parseInt(this.max.value)

     //     var arrSearch = this.state.products.filter(item => {
    //         return item.price <= max 
    //     })
    //     if (arrSearch.length > 0) {
    //         this.setState({ products: arrSearch })
    //     } else {
    //         this.getProduct()
    //     }


    render(){
        return(
            <div className="row">
                {/* Div untuk searchbar */}
               <div className="col-2 ml-2 d-block">
                    <h1 className="display-4 border-bottom border-secondary">Search</h1>
                    <form className="mt-4 d-block">
                        <input onKeyUp={this.onSearchClick} ref={input => this.nameSearch = input} type="text" placeholder="By Name"></input>
                        {/* <button ={this.onSearchClick} className="btn btn-dark btn-block mt-2">Search</button> */}
                    </form>
                    <h1 className="display-4 border-bottom border-secondary mt-5">Filter</h1>
                    <form className="mt-4 d-block">
                        <input ref={input => this.inputFilterMin = input} type="text" placeholder="Minimum price"></input>
                        <input className="d-block mt-2" ref={input => this.inputFilterMax = input} type="text" placeholder="Maximum price"></input>
                    </form>
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