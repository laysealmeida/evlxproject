
import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css'
import { Link } from 'react-router-dom';


export default class Main extends Component {


    state = {
        products: [],
        productInfo: {},
        page: 1,
        loading: false,
    };


    componentDidMount() {

        this.loadProducts();

    }

    loadProducts = async (page = 1) => {

        this.setState({
            loading: true
        })

        const response = await api.get(`/products?page=${page}`)

        const { docs, ...productInfo } = response.data;

        this.setState({
            products: docs, productInfo, page,
            loading: false,
        })

    }

    prevPage = () => {
        const { page, productInfo, loading } = this.state;

        if (page == 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {

        const { page, productInfo, loading } = this.state;

        if (page == productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }


    render() {

        const { products, page, productInfo, loading } = this.state;

        return (
            <div>

                <div className="product-list">
                    {loading && <div className="loading">
                        <svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-arrow-clockwise" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                    </div>}
                    {products.map(product => (
                        <article key={product._id}>
                            <strong>

                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" />
                                </svg>
                                {product.id}
                            </strong>
                            <p> {product.value}
                            </p>

                            <Link to={`/products/${product._id}`}>Details</Link>

                        </article>

                    ))}

                    <div className="actions">
                        <button disabled={page == 1} onClick={this.prevPage}>Prev</button>
                        <button disabled={page == productInfo.pages} onClick={this.nextPage}>Next</button>
                    </div>

                </div>
            </div>)
    }
}