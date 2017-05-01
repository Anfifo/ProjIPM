//As funcoes dentro do document correm ao inicio
$(document).ready(function() {
    $('#Pagamentos').hide();
    $('#Opinioes').hide();
    $('#confirmOrderDiv').hide();
    $("#orderConfirmedDiv").hide();
    $("#divContaDividida").hide();
    $('#tabContaDividida').css("background","rgba(0, 0, 0, 0.3)");
    
    
    //associa ao click do botao de #ID a funcao:
    $('#pedidosButton').click(function() {
        selectPedidos(); 
    });
    
    $('#pagamentosButton').click(function() {
        selectPagamentos(); 
    });
    
    $('#opinioesButton').click(function(){
        selectOpinioes();
    });
    
    
    
    
    $('#pedirButton').click(function(){
        replaceDivs('#confirmOrderDiv', '#orderDiv');
    });
    
    $('#cancelOrder').click(function(){
        replaceDivs('#orderDiv','#confirmOrderDiv');
    });
    
    $('#confirmOrder').click(function(){
        transferOrder();
        $("#orderConfirmedDiv").show().delay(5000).fadeOut();
        replaceDivs('#orderDiv','#confirmOrderDiv');
        
    });
    
    
    
    $('#tabContaDividida').click(function(){
        replaceDivs('#divContaDividida','#divContaPersonalizada');
        
        $('#tabContaDividida').css("border-bottom","none");
        $('#tabContaPersonalizada').css("border-bottom","1px black solid");
        $('#tabContaPersonalizada').css ("background","rgba(0, 0, 0, 0.3)");
        $('#tabContaDividida').css ("background","inherit");
    });
    
    
    
    $('#tabContaPersonalizada').click(function(){
        replaceDivs('#divContaPersonalizada','#divContaDividida');
        
        $('#tabContaPersonalizada').css("border-bottom","none");
        $('#tabContaDividida').css("border-bottom","1px black solid");
        $('#tabContaDividida').css("background","rgba(0, 0, 0, 0.3)");
        $('#tabContaPersonalizada').css("background","inherit");
    });
    
});



// shows new Div while hiding oldDiv
function replaceDivs(newDiv, oldDiv){
    $(oldDiv).hide();
    $(newDiv).show();    
}



// VARIAVEIS GLOBAIS
var OrderCounter = 0; //nao mexer nisto, este contador so tem UM proposito
var totalPrice = 0;

//PLATE STRUCTURE
    function Plate(price, ingredients, name){
        this.price = price;
        this.ingredients = ingredients;
        this.name = name;
    }

        /* Burguellet */
var burguellet_ingredients = ["Queijo","Fiambre","Cebola Frita"];
var burguellet_plate = new Plate(8, burguellet_ingredients, "Burguellet");

        /* Bitoque */
var bitoque_ingredients = ["Tomate","Alface","Ovo", "Arroz"];
var bitoque_plate = new Plate(10, bitoque_ingredients, "Bitoque");

        /* Esparguete à bolonhesa */
var espargueteBolonhesa_ingredients = ["Mozzarella Ralada","Fiambre","Tomate","Alface"];
var espargueteBolonhesa_plate = new Plate(10, espargueteBolonhesa_ingredients, "Esparguete à Bolonhesa");

        /* Água */
var agua_ingredients = [];
var agua_plate = new Plate(0.75, agua_ingredients, "Água");

        /* Coca-cola */
var cola_ingredients = ["Cafeína", "Açúcar", "Limão", "Gelo"];
var cola_plate = new Plate(1, cola_ingredients, "Cola");

// VETOR DE PRATOS TODOS DO RESTAURANTE
var ordered_plates = [];
ordered_plates.push(burguellet_plate);
ordered_plates.push(bitoque_plate);
ordered_plates.push(espargueteBolonhesa_plate);
ordered_plates.push(agua_plate);
ordered_plates.push(cola_plate);


















//    SRCIPT-WIZARDS TEST 

    function does_a_fucking_print() {
        //console.log("I got printed");
        
        console.log(totalPrice);
        
        
        //var plateName, platePrice;
        //for (i = 0; i < ordered_plates.length; i++) {
        //    plateName = ordered_plates[i].name;
        //    platePrice = ordered_plates[i].price;
        //    console.log("Name:" + plateName + " Quantity:" + parseInt(sessionStorage.getItem(plateName)) + " Price:" + platePrice + "\n");
        //}
    }


//     REGISTO DOS PEDIDOS
    function storeOrder(foodId) {
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount + 1);
        $("#tabelaPedidos").append("<tr id='Pedido" + OrderCounter + "'><td>" + foodId + "</td><td>" + findPlate(foodId).price + "€</td><td><img alt='Pedido" + OrderCounter + "', src='images/woodenMinus.png', width = 20px, height = 20px onclick='removeTableEntry(alt)'></td></tr>");//faz update da lista de pedidos
        OrderCounter++;
    } 


//     INICIALIZAR "VETOR" DE PEDIDOS
    function initializeDataStorage() {
        for(i = 0; i < ordered_plates.length; i++) {
            sessionStorage.setItem(ordered_plates[i].name, 0);
        }
    }

// RETORNA UM PLATE DO VETOR ordered_plates
    function findPlate(plate_name) {
        for(i = 0; i < ordered_plates.length; i++) {
            if (ordered_plates[i].name.localeCompare(plate_name) == 0) {
                return ordered_plates[i];
            }
        }
    }

// ELIMINA UMA ROW DA TABELA DE PEDIDOS DADO O SEU ID
    function removeTableEntry(tableRowID) {
        var tr = document.getElementById(tableRowID);
        var foodId = tr.cells[0].innerHTML;
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount - 1);
        document.getElementById("tabelaPedidos").deleteRow(tr.rowIndex);
    }

// EFETUA O PEDIDO (rolepay :P) E METE NA CONTA PARA PAGAR
    function transferOrder() {
        var plateName, platePrice, numberOfEachPlate;
        var totalNumberOfPlates = $('#tabelaPedidos tr').length;
        

        //cria a tabela da conta e guarda nela os pedidos efetuados
        for (i = 0; i < ordered_plates.length; i++) {
            plateName = ordered_plates[i].name;
            platePrice = ordered_plates[i].price;
            numberOfEachPlate = parseInt(sessionStorage.getItem(plateName));
           
            while(numberOfEachPlate > 0) {
                $("#tabelaConta").append("<tr><td>Azul</td><td>João</td><td>" + plateName + "</td><td>" + platePrice + "€</td></tr>");
                numberOfEachPlate--;
                totalPrice += platePrice;   
            }
          
            sessionStorage.setItem(plateName, 0); //elimina todos os pedidos no menu dos pedidos (internamente)
        }
        
        //remove a tabela dos pedidos
        while(totalNumberOfPlates > 0) {
            document.getElementById("tabelaPedidos").deleteRow(totalNumberOfPlates - 1);
            totalNumberOfPlates--;
        }
    }










var currentSelected = '#Pedidos';


//Buttons related

function callWaiter(){
}

function helpRequest(){

}

function selectBlocoNotas(temp){
    if (temp == currentSelected){
        currentSelected = null;
        $(temp).hide();
        return;
    }
    
    else{
        $(currentSelected).hide(); 
        currentSelected = temp;
        $(temp).show(); 
    }    
}

function selectPedidos(){
    selectBlocoNotas('#Pedidos');
}

function selectPagamentos(){
    selectBlocoNotas('#Pagamentos');
}

function selectOpinioes(){
    selectBlocoNotas('#Opinioes');
}





// Bloco de Notas auxiliar functions


function selectSplitTotal(){
    
}

function selectSplitPerPerson(){
    
}

function selecVer(){
    
}