var search = document.querySelector(".fa-search");
var searchContent = document.querySelector("#search-form");

search.addEventListener("click", function () {

    if (searchContent.style.visibility === "hidden") {
        searchContent.style.visibility = "visible"
    } else {
        searchContent.style.visibility = "hidden";
    }



});




var parf = document.getElementById('parfumes');
var branduri = "";
var models = "";
var sex = "";

var filterBrand = document.getElementsByClassName('filter-brand')[0];
var filterModel = document.getElementsByClassName('filter-model')[0];
var filterSex = document.getElementsByClassName("filter-sex")[0];

fetch("http://localhost:3000/api/parfumes",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then((response) => response.json())
    .then((response) => {
        var parfumuri = response;

        // formez un produs
        parfumuri.forEach(function (parfum) {
            var div = document.createElement("div");
            div.className = "col-sm-4 product";
            div.setAttribute("data-brand", `${parfum.name}`);
            div.setAttribute("data-model", `${parfum.model}`);
            div.setAttribute("data-sex", `${parfum.sex}`);
            div.setAttribute("data-price", `${parfum.price}`);

            var div2 = document.createElement("div");

            div2.className = "product-inner text-center";
            var img = document.createElement("img");
            img.src = `/poze-parf/${parfum.image}.jpg`;
            img.className = "product-image";

            var p = document.createElement("p");
            p.innerHTML = `${parfum.name} <br> ${parfum.model} <br> Pentru: ${parfum.sex} <br> Pret: ${parfum.price}`;

            var a = document.createElement('a');
            a.setAttribute("href", "#");
            a.className = "addToCart";
            a.setAttribute("data-id", `${parfum.id}`);
            a.innerHTML = "Adauga in cos";



            var a2 = document.createElement("a");
            a2.setAttribute("href", "#");
            a2.className = "detailsProduct";
            a2.setAttribute("data-id", `${parfum.id}`);
            a2.innerHTML = "Detalii produs";

            var div3 = document.createElement("div");
            div3.className = "referinte";
            div3.appendChild(a);
            div3.appendChild(a2);




            div2.appendChild(img);
            div2.appendChild(p);
            div2.appendChild(div3);
            div.appendChild(div2);
            parf.appendChild(div);
            console.log(parf);


            if (branduri.indexOf(`<option value=${parfum.name}> ${parfum.name} </option>`) == -1) {
                branduri += `<option value= ${parfum.name}> ${parfum.name} </option> `;
            }

            if (models.indexOf(`<option value=${parfum.model}> ${parfum.model}</option>`) == -1) {
                models += `<option value=${parfum.model}> ${parfum.model}</option>`;
            }

            if (sex.indexOf(`<option value=${parfum.sex}> ${parfum.sex}</option>`) == -1) {
                sex += `<option value=${parfum.sex}> ${parfum.sex}</option>`;
            }






        });
        var produs = document.querySelectorAll('.product');
        function appendItem(filterWhatever, items) {
            var values = filterWhatever.innerHTML;
            filterWhatever.innerHTML = values + items;
        }
        appendItem(filterBrand, branduri);
        appendItem(filterModel, models);
        appendItem(filterSex, sex);

        var filterObject = {};

        var filter = document.querySelectorAll(".filter");
        console.log(filter);
        filter.forEach(function (filtru) {
            filtru.addEventListener('change', filterFnc);

            function filterFnc() {
                var filterName = this.getAttribute("data-filter");
                var filterValue = this.value;
                console.log(filterName, filterValue);


                if (filterValue == "") {
                    delete filterObject[filterName];

                } else {
                    filterObject[filterName] = filterValue;

                }

                var filters = "";

                for (var key in filterObject) {
                    if (filterObject.hasOwnProperty(key)) {

                        filters += "[data-" + key + "='" + filterObject[key] + "'] ";

                    }
                }






                // if (filters=="") {
                //                  produs.forEach(function (prod) {

                //                         prod.style.display = "block";

                //                  });

                //                 } else {


                //                  produs.forEach(function (prod) {

                //                     var flt=prod.dataset[key];
                //                     console.log(flt);
                //                     console.log(Object.values(filterObject));

                //                      if(filterObject.value==flt)

                //                         prod.style.display="none";
                //                         //   

                //                         // var result=produs.filter( prod=> flt.hasOwnProperty(filterObject[key]))
                //                         // console.log(result);

                //                        });



                //                      }





            };

        });



        var searchBtn = document.getElementById("search-form");
        searchBtn.addEventListener("submit", function (e) {
            e.preventDefault();
            var query = document.querySelector("#search-form input").value.toLowerCase();

            var produs2 = document.querySelectorAll(".product");

            // produs2.forEach(function (prd) {
            //     prd.style.display = "none";

            // });


            produs2.forEach(function (el) {


                var brandu = el.getAttribute("data-brand").toLowerCase();
                var modelu = el.getAttribute("data-model").toLowerCase();
                var sex = el.getAttribute("data-sex").toLowerCase();

                if (brandu.indexOf(query) > -1 || modelu.indexOf(query) > -1 || sex.indexOf(query) > -1) {

                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }

            })

        })

        const cartBtn = document.querySelector(".nav-icon");
        const closeCartBtn = document.querySelector(".close-cart");
        const clearCart = document.querySelector(".clear-cart");
        const cartDOM = document.querySelector(".cart");
        const cartItems = document.querySelector(".cart-items");
        const cartTotal = document.querySelector(".cart-total");
        const cartContent = document.querySelector(".cart-content");

        var cart = [];
        //buttons
        var buttonsDOM = [];




        const buttons = [...document.querySelectorAll(".addToCart")];

        console.log(buttons);
        buttonsDOM = buttons;
        buttons.forEach(function (button) {
            var id = button.dataset.id;





            // var inCart=cart.find(item => item.id === id);

            // if(inCart){

            //     button.innerText="in cart";
            //   e.target.disabled=true;
            // }


            button.addEventListener("click", function (e) {
                e.preventDefault();

                e.target.innerText = "in cart";

                // e.target.style.display="none";
                e.target.style.pointerEvents = "none";





                //  get product from produts
                var cartItem = { ...Storage.getProduct(id), amount: 1 };


                //add product to the cart

                cart = [...cart, cartItem];
                console.log(cart, cartItem);


                // save cart in local storage

                Storage.saveCart(cart);

                // set cart values

                setCartValues(cart);


                // display cart item

                function addCartItem(item) {
                    var div = document.createElement("div");
                    div.classList.add("cart-item");
                    div.innerHTML = `<img src="/poze-parf/${item.image}.jpg" alt="product">
                        <div>
                            <h4>${item.name}</h4>
                            <h5>${item.price} lei</h5>
                           
                            <span class="remove-item" data-id=${item.id}>remove</span>
                        </div>
                        <div>
                            <i class="fa fa-chevron-up"data-id=${item.id} ></i>
                            <p class="item-amount">${item.amount}</p>
                            <i class="fa fa-chevron-down" data-id=${item.id}></i>
                           
                        </div>`;
                    cartContent.appendChild(div);
                    console.log(cartContent);


                }
                addCartItem(cartItem);
                console.log(cartItem);
                console.log(cart);

            })


            cartBtn.addEventListener("click", appearCart);
            //     
            function appearCart() {

                cartDOM.style.display = "block";
            }
            closeCartBtn.addEventListener('click', hiddenCart);
            //     
            function hiddenCart() {

                cartDOM.style.display = "none";
            }


        })

        //sterg toate elementele din cart cand apas clear cart

        clearCart.addEventListener("click", clearCartFnc);



        function clearCartFnc() {
            var howManyInCart = cart.map(item => item.id);
            console.log(howManyInCart);
            console.log(cart);
            howManyInCart.forEach(id => removeItem(id))


            while (cartContent.children.length > 0) {
                console.log(cartContent.children);
                cartContent.removeChild(cartContent.children[0]);
            }
        }


        function removeItem(id) {


            cart = cart.filter(item => item.id !== id);

            setCartValues(cart);
            // fac uptade la local storage, sa-mi sterga ce am in cart
            Storage.saveCart(cart);
            console.log(cart);
            // console.log(cartTotal, cartItems);

            var button = getSingleButton(id);

            button.innerHTML = "add to cart";
            button.style.pointerEvents = "auto";


        }

        cartContent.addEventListener("click", function (e) {
            // console.log(e.target);

            if (event.target.classList.contains("remove-item")) {
                // console.log(event.target.classList);
                var removeElement = event.target;
                // console.log(removeItem);
                let id = removeElement.dataset.id;




                cartContent.removeChild(removeElement.parentElement.parentElement);
                removeItem(id);

            }
            else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                console.log(addAmount);
                Storage.saveCart(cart);
                setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;


            }
            else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);

                tempItem.amount = tempItem.amount - 1;


                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    setCartValues(cart);

                    lowerAmount.previousElementSibling.innerText = tempItem.amount;

                }
                else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    removeItem(id);
                }



            }
        })








        class Storage {
            static saveProducts(parfumuri) {
                localStorage.setItem("parfumuri", JSON.stringify(parfumuri))
            }
            static getProduct(id) {
                var products = JSON.parse(localStorage.getItem("parfumuri"));

                return products.find(product => product.id === id);
            }
            static saveCart(cart) {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            //  static getChart(){
            //      return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
            //  }
            // static updateQuickView(item){
            //     localStorage.setItem("item", JSON.stringify(item))
            // }
        }

        Storage.saveProducts(parfumuri);



        function setCartValues(param) {
            let tempTotal = 0;
            let itemsTotal = 0;
            cart.map(item => {
                tempTotal += item.price * item.amount
                itemsTotal += item.amount;
            });
            cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
            cartItems.innerText = itemsTotal;
            console.log(cartTotal, cartItems);

        }

        function getSingleButton(id) {
            return buttonsDOM.find(button => button.dataset.id === id);
        }

        //////////////////QUICK VIEW


        const detailsBtns = [...document.querySelectorAll(".detailsProduct")];

        console.log(detailsBtns);

        detailsBtns.forEach(function (button) {
            var id = button.dataset.id;
            console.log(id);

            button.addEventListener("click", function (e) {
                console.log(e.target.dataset.id);

                fetch(`http://localhost:3000/api/parfumes/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + sessionStorage.getItem('token')
                        }
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        var item = response;
                        localStorage.setItem("item", JSON.stringify(item));


                    })


                window.location = "productPage.html";


            });

        });


    });













