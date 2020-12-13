 // valiation flags
var paymentValidated = false;
var cardValidated = false;
var cvvValidated = false;
var terms = false;

 
function validate()
    {
        var condic = document.getElementById('terms-cond');
        if(condic.checked == false){
            document.getElementById('terms-cond-label').style.color = 'red';
            window.alert('Please, accept the conditions to register the payment method');
            terms = false;
        }
        if(condic.checked == true){ // check if terms and condicions are accepted
            document.getElementById('terms-cond-label').style.color = 'black';
            terms = true;
        }
        if(paymentValidated == false){ // check if payment method is populated
            document.getElementById("payment-method").style.color = "red";
        }
        if(cardValidated == true && paymentValidated == true && cvvValidated == true && terms == true){ 
            console.log('all set');
            document.getElementById('terms-cond-label').style.color = 'black';
            terms = true;
            return true;
        }else{
            window.alert('Check that all the mandatory fields are populated');
            console.log('Payment: ',paymentValidated,'Card:', cardValidated,'CVV: ', cvvValidated,'Terms: ', terms);
            return false; 
        } // If everything has been validated then validate() = true, ready to go.
    }

function highlightFields(field, msgPlaceholder, msg){
    document.getElementById(field).style.borderColor = 'red';
    document.getElementById(field).style.backgroundColor = '#ffe6e6';
    document.getElementById(msgPlaceholder).innerText =  msg;
}

function unhighlightFields(field, msgPlaceholder, msg){
    document.getElementById(field).style.borderColor = 'green';
    document.getElementById(field).style.backgroundColor = '#e6ffe6';
    document.getElementById(msgPlaceholder).innerText =  msg;
}

function validatePaymentMethod(){
    var paypal = document.getElementById("paypal").checked;
    var mastercard = document.getElementById("mastercard").checked;
    var visa = document.getElementById("visa").checked;
    if (paypal == false && mastercard == false && visa == false){
        document.getElementById("visa_error").innerHTML =  "<br>Please, choose one of the payment methods below";
        document.getElementById("payment-method").style.color = "red";
        paymentValidated = false;
        console.log("Nada ticado", paypal, mastercard, visa);
    }else{
        document.getElementById("visa_error").innerHTML =  "";
        document.getElementById("payment-method").style.color = "black";
        paymentValidated = true;
        return true;
    }
    
}

function validateCard(){
            
    if(document.getElementById("visa").checked == true){
        document.getElementById("mastercard_error").innerHTML = ""; //Initialize error messages if I return from MasterCard
        cardValidated = true;
        console.log('Validated?', cardValidated); 
        checkVisa();

    }else if(document.getElementById("mastercard").checked == true){
        document.getElementById("visa_error").innerHTML = ""; //It initiates error messages if I return from Visa
        cardValidated = true;
        console.log('Validated?', cardValidated);  
        checkMasterCard();
    }else if(document.getElementById("paypal").checked == true){ 
        document.getElementById("card").disabled = true;
    }
}

function activateCardFields(){
    if(document.getElementById("visa").checked == true || document.getElementById("mastercard").checked == true){
        document.getElementById("card").disabled = false;
        document.getElementById("cvv").disabled = false;
    }else{ //Style for disabled buttons
        document.getElementById("card").value = "";
        document.getElementById("cvv").value = "";
        document.getElementById("visa_error").innerText = "";
        document.getElementById("mastercard_error").innerText = "";
        document.getElementById("cvv_error").innerText = "";
        document.getElementById("card").style.borderColor = '#ced4da';
        document.getElementById("card").style.backgroundColor = '#e9ecef';
        document.getElementById("cvv").style.borderColor = '#ced4da';
        document.getElementById("cvv").style.backgroundColor = '#e9ecef';
        document.getElementById("visa_error").innerText =  '';
        document.getElementById("card").disabled = true;
        document.getElementById("cvv").disabled = true;

        //bypass the card validation
        cardValidated = true;
        cvvValidated = true;
        paymentValidated = true;
    }
}

function checkVisa(){
    card = document.getElementById("card").value;
        visa_error = "";
        mastercard_error = "";
        if (!card.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)){
            highlightFields('card', 'visa_error', "Is not a valid Visa number");
            document.getElementById("card").value = "";
            unhighlightFields('','mastercard_error', '');
            cardValidated = false;
        }
        else{ unhighlightFields('card', 'mastercard_error', ''); } 
}

function checkMasterCard(){
    card = document.getElementById("card").value;
        if (!card.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)){
            highlightFields('card', 'mastercard_error', "Is not a valid MasterCard number");
            document.getElementById("card").value = "";
            unhighlightFields('','visa_error', '');
            cardValidated = false;
        }
        else{ unhighlightFields('card', 'visa_error', ''); } 
}

function validateCVV(){
    var num_card = document.getElementById("card").value;
    var temp = '';
    //remove '-'
    for(i =0; i < num_card.length; i++){
        if (num_card[i] != '-')
        { temp = temp + num_card[i] }
    }
    
    //CVV calculation only valid for CVV, using the most replicated method over the internet as example.
    //The CVV is calculated by taking the eighth, twelfth and thirteenth numbers on the card and adding 1.
    //As a sample, you have the right CVV for the card given on console.
    var cvv1 = temp[9];
    var cvv2 = temp[4];
    var cvv3 = parseInt(temp[3])+1;
    cvv3 = String(cvv3);
    var cvv = cvv1 + cvv2 + cvv3;
    console.log('cvv: ', cvv); //Showing the valid CVV for testing purposes.

    if(document.getElementById('cvv').value != cvv){
        highlightFields('cvv', 'cvv_error', 'CVV not valid');
        cvvValidated = false;
    } else{
        unhighlightFields('cvv','cvv_error', '');
        cvvValidated = true;
        paymentValidated = true; // payment is only validated when card and cvv matches.
    }
}