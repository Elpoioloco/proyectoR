import ProductsTable from "@/components/ProductosTable";
import axios from "axios";


async function loadProductos(){
    const response = await axios.get("http://localhost:3000/api/productos");
    return response.data.data; 

}

export default  async function ProductPage() {

    const products = await loadProductos();

    return (
        <div>  
            <div>
                <ProductsTable products={products}/>
            </div>
        </div>
    );
}

