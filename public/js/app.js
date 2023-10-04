// const { useState } = require("react");

// const { response } = require("express");

// const { first } = require("lodash");

const App = () => {
  const [products, setProducts] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });

  //if there is any changes the useState then this function will call

  //if we pass an empty array then only one time it will run in this case we want this
  React.useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((Error) => {
        console.log(`error ${Error}`);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    //console.log('Submitting form')
     if (!form.name || !form.price) {
       console.log("field is empty")
       return;
     } 
      console.log('calling api')
      fetch('/api/products', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then((response) => response.json())
        .then((data) => {
          fetchProducts()
          setForm({name:'',price:''})
          console.log(data);
        });
    
  }

  function upDateForm(event, field) {
    if (field === 'name') {
      setForm((form)=>({
        ...form,
        name: event.target.value,
      }));

    } else if (field === 'price') {
      setForm((form)=>({
        ...form,
        price: event.target.value,
      }));
    }
  }

  const deleteProduct=(productId)=>{

    fetch(`/api/products/${productId}`,{

      method:'DELETE'


    }).then((response) => response.json())
    .then((data)=>{
      fetchProducts()
      console.log(data)
    })



  }



  return (
    <>
      <div className="card">
        <div className="card-header">Add a product</div>
        <div className="card-body">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => upDateForm(e, "name")}
              placeholder="Product name"
              className="form-control  mt-3"
             
            />

            <input
              type="text"
              value={form.price}
              onChange={(e) => upDateForm(e, "price")}
              placeholder="Product price"
              className="form-control  mt-5"
              
            />

            <button type="submit" className="btn btn-primary mt-3">
              {" "}
              submit
            </button>
          </form>
        </div>
      </div>

      <ul className="list-group" mt-4>
        {products.map((product) => {
          return (
            <li
              key={product.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{product.name}: </strong>${product.price}
              </div>
              <button className="btn"  onClick={()=> deleteProduct(product.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
