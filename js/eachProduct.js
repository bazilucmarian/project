var parfumUpdate = JSON.parse(localStorage.getItem("item"));
console.log(parfumUpdate);
var parinte=document.querySelector('#container-product');
console.log(parinte);
parinte.innerHTML=` <div class="row product-sec">
<div class="col-lg-6 prod-left">
    <div class="hero-image">
    <img src="/poze-parf/${parfumUpdate.image}.jpg" class="img wow fadeInUp" alt="">

    </div>
</div>

<div class="col-lg-6 prod-right">
    <div class="prod-opt">
   
    
        <h4 id="prod-model" class="wow fadeInUp" data-wow-delay="0.4s">${parfumUpdate.name} </br>${parfumUpdate.model}</h4>
        <p>O ${parfumUpdate.tip} ideala pentru ${parfumUpdate.sex}</p>
        <p><small>Cod produs: ${parfumUpdate.id}</small></p>
        <p id="price" class="wow fadeInUp" data-wow-delay="0.5s">Pret: ${parfumUpdate.price} lei</p>


        <div class="border_line"></div>
                            <div class="sizes">
                                <h5>Selecteaza cantitatea</h5>
                                <div class="radio-group">
                                    <input type="radio" id="option-one" name="selector" checked="checked">
                                    <label for="option-one">100ml</label>
                                    <input type="radio" id="option-two" name="selector">
                                    <label for="option-two">50ml</label>
                                    <input type="radio" id="option-three" name="selector">
                                    <label for="option-three">30ml</label>
                                </div>
                            </div>
                            <div class="border_line"></div>
                            <h5>Descriere produs</h5>
                 <p id="description-product">${parfumUpdate.description}</p>


           <div class="add-prod wow fadeInUp"data-wow-delay="1s">
               <a href="#">Add to bag</a>
           </div>
           

    </div>
    
</div>

</div>`;


