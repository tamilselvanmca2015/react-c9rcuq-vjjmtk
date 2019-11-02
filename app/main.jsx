
import React from 'react';
import ReactDOM from 'react-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { dataCategories, dataProducts, dataOrders } from './data.js';

const defaultItemCategory = { categoryName: 'Select Category ...' };
const defaultItemProduct = { productName: 'Select Product ...' };
const defaultItemOrder = { orderName: 'Select Order ...' };

class AppComponent extends React.Component {
    state = {
        category: null,
        product: null,
        order: null,
        orders: dataOrders,
        products: dataProducts
    };

    categoryChange = (event) => {
        const category = event.target.value;
        const products = dataProducts.filter(product => product.categoryId === category.categoryId);

        this.setState({
            category: category,
            products: products,
            product: null,
            order: null
        });
    }

    productChange = (event) => {
        const product = event.target.value;
        const orders = dataOrders.filter(order => order.productId === product.productId);

        this.setState({
            product: product,
            orders: orders,
            order: null
        });
    }

    orderChange = (event) => {
        this.setState({ order: event.target.value });
    }

    render() {
        const category = this.state.category;
        const product = this.state.product;
        const order = this.state.order;

        const hasCategory = category && category !== defaultItemCategory;
        const hasProduct = product && product !== defaultItemProduct;

        return (
            <div>
                <div style={{ display: 'inline-block' }}>
                    Categories
                    <br />
                    <DropDownList
                        data={dataCategories}
                        textField="categoryName"
                        onChange={this.categoryChange}
                        defaultItem={defaultItemCategory}
                        value={category}
                    />
                </div>
                <div style={{ display: 'inline-block', marginLeft: '30px' }}>
                    Products
                    <br />
                    <DropDownList
                        disabled={!hasCategory}
                        data={this.state.products}
                        textField="productName"
                        onChange={this.productChange}
                        defaultItem={defaultItemProduct}
                        value={product}
                    />
                </div>
                <div style={{ display: 'inline-block', marginLeft: '30px' }}>
                    Orders
                    <br />
                    <DropDownList
                        disabled={!hasProduct}
                        data={this.state.orders}
                        textField="orderName"
                        onChange={this.orderChange}
                        defaultItem={defaultItemOrder}
                        value={order}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AppComponent />,
    document.querySelector('my-app')
);

