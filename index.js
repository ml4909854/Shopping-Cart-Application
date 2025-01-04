let productlist = document.getElementById("productlist")


let cart = JSON.parse(localStorage.getItem("cart")) || {} 
async function getdata(){
    let response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()
    showdata(data)
}

function showdata(products){
    productlist.innerHTML = ""
    products.forEach((product) => {

        let div = document.createElement("div")

        let title =  document.createElement("p")
        title.innerHTML =`title : ${product.title}`

        let price = document.createElement("p")
        price.innerHTML = `price : ${product.price}`

        let addtoCartButton = document.createElement("button")
        addtoCartButton.innerHTML = "Add to cart"
        addtoCartButton.addEventListener("click" , function(){
            addTocartHandler(product)
            alert(` " ${product.title} " added in your cart`)
        })
        div.append(title , price , addtoCartButton)
        productlist.append(div)
    });
}



function addTocartHandler(product){
    if(cart[product.id]){
        cart[product.id].quantity += 1
    }else{
        cart[product.id] = {...product , quantity:1}
    }
    localStorage.setItem("cart" , JSON.stringify(cart))
    
}


getdata()