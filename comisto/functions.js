//As funcoes dentro do document correm ao inicio
$(document).ready(function() {
    $('#Pagamentos').hide();
    $('#Opinioes').hide();

    //associa ao click do botao de #ID a função:
    $('#pedidosButton').click(function() {
        selectPedidos(); 
    });
    
    $('#pagamentosButton').click(function() {
        selectPagamentos(); 
    });
    
    $('#opinioesButton').click(function(){
        selectOpinioes();
    });
});
    








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


// VETOR DE PRATOS TODOS DO RESTAURANTE
var ordered_plates = [];
ordered_plates.push(burguellet_plate);
ordered_plates.push(bitoque_plate);
ordered_plates.push(espargueteBolonhesa_plate);




















//<!-- SRCIPT-WIZARDS TEST -->
//<script>
    function does_a_fucking_print() {
        var plateName;
        for (i = 0; i < ordered_plates.length; i++) {
            plateName = ordered_plates[i].name;
            console.log("Name:" + plateName + " Quantidade:" + parseInt(sessionStorage.getItem(plateName)) + "\n");
        }
    }


//<!-- REGISTO DOS PEDIDOS -->
    function storeOrder(foodId) {
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount + 1);
        $("#tabelaPedidos").append("<tr><td>" + foodId + "</td><td>" + findPlate(foodId).price + "€</td><td><img alt='" + foodId + "'src = 'images/woodenMinus.png', width = 20px, height = 20px onclick='removeTableEntry(this)'></td></tr>");//faz update da lista de pedidos
    } 


//<!-- INICIALIZAR "VETOR" DE PEDIDOS -->
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

// ELIMINA UMA ROW DE UMA TABELA DADA O ID DESSA ROW
    function removeTableEntry(tableRow) {
        var foodId = tableRow.alt;
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount - 1);
        document.getElementById("tabelaPedidos").deleteRow(tableRow.rowIndex);
        does_a_fucking_print();
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

function confirmOrder(){
    
}

function selectSplitTotal(){
    
}

function selectSplitPerPerson(){
    
}

function selecVer(){
    
}