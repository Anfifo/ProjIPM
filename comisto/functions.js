//As funcoes dentro do document correm ao inicio
$(document).ready(function() {
    $('#Pagamentos').hide();
    $('#Opinioes').hide();
    $('#confirmOrderDiv').hide();
    $("#orderConfirmedDiv").hide();
    $("#divContaDividida").hide();
    $('#confirmPaymentDiv').hide();
    $("#pedirButton").hide();
    
    chooseStars(5);
    addReview("Buddy","Best restaurante ever, 10/10 would come back!!");
    chooseStars(0);
    starNumber = "Não Avaliado";

    
    $("#tabContaDividida").css("background","rgba(0, 0, 0, 0.2)");
    darkBackGround("#pedidosButton");
    $('.userName').text(userName);
    
    
    $('#pedidosButton').click(function() { selectPedidos(); });
    
    $('#pagamentosButton').click(function() { selectPagamentos(); });
    
    $('#opinioesButton').click(function(){ selectOpinioes(); });    
    
    $('#pedirButton').click(function(){
        replaceDivs('#confirmOrderDiv', '#orderDiv');
        numeroPedidos = 0;
    });
    
    $('#cancelOrder').click(function(){ replaceDivs('#orderDiv','#confirmOrderDiv'); });
    
    $('#confirmOrder').click(function(){
        transferOrder();
        $("#orderConfirmedDiv").show().delay(5000).fadeOut();
        replaceDivs('#orderDiv','#confirmOrderDiv');
//        $("#pedirButton").hide();
        $("#pedirButton").fadeOut(500);

    });
    
        
    
    $('#empregadoButton').click(function(){ callEmpregado(); });
    

    $('#payDinheiro').click(function(){
        if (!(totalPrice == 0)) {
            replaceDivs('#confirmPaymentDiv','#paymentButtons');
            $("#payValueConfirm").text(""+totalPrice +"€");
            $("#payMethodConfirm").text("Dinheiro");
        }
        else {
            // FAZER AKI UM POP UP A DIZER QUE NAO PODE PAGAR 0€€€€!!!!!!!!
        }
    });
    
    $('#payMultibanco').click(function(){
        if (!(totalPrice == 0)) {
            replaceDivs('#confirmPaymentDiv','#paymentButtons');
            $("#payValueConfirm").text(""+totalPrice);
            $("#payMethodConfirm").text("Multibanco");
        }
        else {
            // FAZER AKI UM POP UP A DIZER QUE NAO PODE PAGAR 0€€€€!!!!!!!!
        }
    });
    

    $('#cancelPayment').click(function(){ replaceDivs('#paymentButtons','#confirmPaymentDiv'); });
    

    $('#confirmPayment').click(function(){          // mudei estar merda, se n tiveres satisfeito devesme 4h da minha vida
        replaceDivs('#paymentButtons','#confirmPaymentDiv');
        $("#tabelaConta > tr[class=contabilizado]").remove();
        
        for(var i = 0; i <otherUsers.length; i++)
            $("#"+otherUsers[i]+"tabelaConta > tr[class=contabilizado]").remove();
        
        atualizadorPagamento();
    });
    

    $('#inputReviewButton').click(function() {
        var review = $('#inputReviewText').val();
        console.log(review);
        $('#inputReviewText').val('');
        addReview(userName, review);
        //add review
    });
    
    
    $('#1Star').click(function(){ chooseStars(1); });
    $('#2Star').click(function(){ chooseStars(2); });
    $('#3Star').click(function(){ chooseStars(3); });
    $('#4Star').click(function(){ chooseStars(4); });
    $('#5Star').click(function(){ chooseStars(5); });
    
    $(document).click(function() {
        console.log(clickCounter++);
    });
    
    
    addOtherUserPedido ("João2",["Bitoque", "Água"]);
    addOtherUserPedido ("João3",["Água",]);

});









/*********************
 +
 + Variaveis Globais
 +
 *********************/
var starNumber = "Não Avaliado";
var empregadoButtonActive= false;
var userName = "João";
var currentSelected = '#Pedidos';
var otherUsers = [];



var OrderCounter = 0; //nao mexer nisto, este contador so tem UM proposito
var totalPrice = 0;
var numeroPedidos = 0;
var counterCoisinha = 0;
var clickCounter = 0;

function Plate(price, ingredients, name){
    this.price = price;
    this.ingredients = ingredients;
    this.name = name;
}

var burguellet_ingredients = ["Queijo","Fiambre","Cebola Frita"];
var burguellet_plate = new Plate(8, burguellet_ingredients, "Burguellet");

var bitoque_ingredients = ["Tomate","Alface","Ovo", "Arroz"];
var bitoque_plate = new Plate(10, bitoque_ingredients, "Bitoque");

var espargueteBolonhesa_ingredients = ["Mozzarella Ralada","Fiambre","Tomate","Alface"];
var espargueteBolonhesa_plate = new Plate(10, espargueteBolonhesa_ingredients, "Esparguete à Bolonhesa");

var agua_ingredients = [];
var agua_plate = new Plate(1, agua_ingredients, "Água");

var cola_ingredients = ["Cafeína", "Açúcar", "Limão", "Gelo"];
var cola_plate = new Plate(1, cola_ingredients, "Cola");

// VETOR DE PRATOS TODOS DO RESTAURANTE
var ordered_plates = [];
ordered_plates.push(burguellet_plate);
ordered_plates.push(bitoque_plate);
ordered_plates.push(espargueteBolonhesa_plate);
ordered_plates.push(agua_plate);
ordered_plates.push(cola_plate);


var pedidosPriceRelation = {
    "Bitoque":10,
    "Burguellet":8,
    "Bolonhesa":10,
    "Água":1,
    "Coca-Cola":1
};










/*******************
 +
 + PEDIDOS
 +
 *******************/
//     REGISTO DOS PEDIDOS
function storeOrder(foodId) {
    var foodCount = parseInt(sessionStorage.getItem(foodId));
    sessionStorage.setItem(foodId, foodCount + 1);

    //$("#tabelaPedidos").append("<tr id='Pedido" + OrderCounter + "'><td>" + foodId + "</td><td>" + findPlate(foodId).price + "€</td><td><i class='fa fa-minus',  aria-hidden='true', width = 20px, height = 20px, onclick=\"removeTableEntry('Pedido" + OrderCounter + "')\"></i></td></tr>");//faz update da lista de pedidos

    var id = "Pedido"+OrderCounter;
    var tempForRemove = "removeTableEntry('" + id + "')";
    console.log("Adding id:" + id);

    $("#tabelaPedidos").prepend($('<tr>')
        .attr('id', id)
        .append($('<td>')
                .text(foodId)
                .addClass("tabelaConta")
        )
        .append($('<td>')
               .text(findPlate(foodId).price +"€")
               .addClass("tabelaContaSmall")
        )
        .append($('<td>')
                .addClass("tabelaContaSmall")
                .append($('<i>')
                    .attr("aria-hidden","true")
                    .attr("onClick",tempForRemove)        
                    .addClass("fa fa-times")
                )
        )
    );        

    OrderCounter++;   
    numeroPedidos++;
    $("#pedirButton").show();
    activatePedidos();
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
    console.log("Removing table: " + tableRowID);
    var tr = document.getElementById(tableRowID);
    var foodId = tr.cells[0].innerHTML;
    var foodCount = parseInt(sessionStorage.getItem(foodId));
    sessionStorage.setItem(foodId, foodCount - 1);
    document.getElementById("tabelaPedidos").deleteRow(tr.rowIndex);

    numeroPedidos--;
    if(numeroPedidos == 0) {
        $("#pedirButton").hide();
    }
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
            $("#tabelaConta").append($('<tr>')
                .addClass("contabilizado")
                .attr("id","Coisinha"+counterCoisinha)
                .append($('<td>')
                    .addClass("tabelaContaSmall")
                    .append($('<i>')
                        .attr("aria-hidden","true")
                        .attr("onClick","updatePrice(this,'Coisinha"+ counterCoisinha +"'," + platePrice + ")")        
                        .addClass("fa fa-check-square-o")
                    )
                )
                .append($('<td>')
                    .text(plateName)
                    .addClass("tabelaConta")
                )
                .append($('<td>')
                    .text(platePrice +"€")
                    .addClass("tabelaContaSmall")
                )
            );

            counterCoisinha++;

            //$("#tabelaConta").append("<tr><td>" + plateName + "</td><td>" + platePrice + "€</td></tr>");
            numberOfEachPlate--;
//            totalPrice += platePrice;   
        }

        sessionStorage.setItem(plateName, 0); //elimina todos os pedidos no menu dos pedidos (internamente)
//        $('#pricePlacePersonalizado').text(""+totalPrice);

    }

    //remove a tabela dos pedidos
    while(totalNumberOfPlates > 0) {
        document.getElementById("tabelaPedidos").deleteRow(totalNumberOfPlates - 1);
        totalNumberOfPlates--;
    }

    atualizadorPagamento();
}














/*******************
 +
 + PAGAMENTOS
 +
 *******************/
function atualizadorPagamento() {

    var string = "";

    $("#tabelaConta > tr[class=contabilizado] > td[class=tabelaContaSmall]").each(function() {
        string += $(this).text();
    });

    arr = string.split("€");
    totalPrice = 0;

    for (i = 0; i < arr.length-1; i++) {
        totalPrice += parseInt(arr[i]);
    }

    $('#pricePlacePersonalizado').text("" + totalPrice);
}


//inutilizada a função?
function checkBox(icon) {
    does_a_fucking_print();
    if(icon.className === "fa fa-check-square-o") {
        icon.className = "fa fa-square-o";
    }
    else {
        icon.className = "fa fa-check-square-o";
    }
}

function updatePrice(icon, id_tr, platePrice) {
    if(icon.className === "fa fa-check-square-o") {
        icon.className = "fa fa-square-o";
        totalPrice -= platePrice;
        $("#" + id_tr).removeClass("contabilizado").addClass("nao_contabilizado");
    }
    else {
        icon.className = "fa fa-check-square-o";
        totalPrice += platePrice;
        $("#" + id_tr).removeClass("nao_contabilizado").addClass("contabilizado");
    }
    $("#pricePlacePersonalizado").text("" + totalPrice);
}







/*******************
 +
 + Opinioes
 +
 *******************/
function chooseStars(starCount){
    starNumber = ""+starCount;
    for (var i = 1; i <=starCount; i++ ){
        id= "#"+ i + "Star";
        $(id).removeClass("fa-star-o").addClass("fa-star");
    }
    for (var j = 5; j >= i; j-- ){
        id= "#"+ j + "Star";
        $(id).removeClass("fa-star").addClass("fa-star-o");
    }
}


function addReview(name, text){
    console.log(name);
    console.log(text);
    
    if(starNumber.localeCompare("Não Avaliado") !== 0) {
        starNumber += " Estrela(s)";
    }
    
    starNumber = "Classificação: " + starNumber;

    $("#allReviews").prepend($('<div>')
        .addClass("existingReview")
        .append($('<div>')
                .text(name)
                .addClass("reviewUserName")
        )
        .append($('<div>')
                .text(starNumber)
                .addClass("reviewUserRate")
        )
        .append($('<div>')
                .text(text)
                .addClass("reviewUserText")
        )
    ).hide().fadeIn(1000);
    
    chooseStars(0);
    starNumber = "Não Avaliado";
}









/*******************
 +
 + Botoes
 +
 *******************/

function callEmpregado(){
     if (empregadoButtonActive==false){
     empregadoButtonActive=true;
     $("#empregadoImg").attr("src", "images/empregadoChamado.gif");
     $("#empregadoImg").css("height","150%");
     $("#empregadoImg").css("width","150%");
     $("#empregadoButton").css("box-shadow","inset 0 0 0.8em rgba(255,255,0,1), 0 0 0.8em rgba(255,255,0,1)");
     $("#empregadoButton").css("border", "#ffff00 solid 2px");

//            $('#empregadoButton').css("box-shadow","0px 0px 40px rgba(255, 255, 0, 1)");
    }
    else{
        empregadoButtonActive= false;
        $('#empregadoButton').css("box-shadow","");
        $("#empregadoButton").css("border", "");

        $("#empregadoImg").css("height","");
        $("empregadoImg").css("width","");
        $("#empregadoImg").attr("src", "images/empregado.png");
    }    
}

function activatePedidos(){
    if(currentSelected != "#Pedidos")
        selectPedidos();
}

function selectBlocoNotas(temp){
    console.log(currentSelected);
    
    if (temp == currentSelected){
        currentSelected = null;
//        $(temp).hide();
        $(temp).fadeOut(500); 

        removeBackground("#pedidosButton");
        removeBackground("#pagamentosButton");
        removeBackground("#opinioesButton");
        return;
    }
    
    else{
        $(currentSelected).hide();
//        replaceDivs(temp, currentSelected);
        currentSelected = temp;
        $(temp).show(); 

    }    
}

function selectPedidos(){
    darkBackGround("#pedidosButton");
    
    removeBackground("#pagamentosButton");
    removeBackground("#opinioesButton");
    selectBlocoNotas('#Pedidos');
}

function selectPagamentos(){
    
    darkBackGround("#pagamentosButton");

    removeBackground("#pedidosButton");
    removeBackground("#opinioesButton");
    selectBlocoNotas('#Pagamentos');
}

function selectOpinioes(){
    darkBackGround('#opinioesButton');

    removeBackground("#pedidosButton");
    removeBackground("#pagamentosButton");
    selectBlocoNotas('#Opinioes');
}

// shows new Div while hiding oldDiv
function replaceDivs(newDiv, oldDiv){
    $(oldDiv).fadeOut(300, function(){
        $(newDiv).fadeIn(300);
    });
}









/*********************
 +
 + Estetica/Animacoes
 +
 *********************/

function darkBackGround(id){
//    $(id).css("background","rgba(255, 255, 255, 0.5)");
    
    $(id).css("box-shadow","inset 0 0 0.8em rgba(255,255,255,0.3), 0 0 0.8em rgba(255,255,255,0.3)");
    $(id).css("border", "#fff solid 2px");

}
function removeBackground(id){
    $(id).css("background","");
    $(id).css("box-shadow","");
    $(id).css("border", "");
    //    $(id).css("border","");

}

function lightBackground(id){
    $(id).css("background","rgba(255,255,255.0.3)");
}









//divContaPersonalizada
// <div class="contaUserBox">
//    <div id="contaUserName" class="contaUserName">
//        <span class="userName tituloPequeno"></span>
//    </div>
//    <div class="pedidosDoUser">
//        <table id="tabelaConta">
//        </table>
//    </div>
//</div>









function addOtherUserPedido (name, otherUserPedidos) {
    if( otherUsers.indexOf(name) < 0){
        otherUsers.push(name);
    }
    console.log("adding pedido de " + name);
    var otherUserCounter = 0;
    
    $("#divContaPersonalizada").append($("<div>")
        .addClass("contaUserBox")
        .append($("<div>")
            .addClass("contaUserName")
            .append($("<span>")
                .addClass("tituloPequeno")
                .text(name)
            )
        )
        .append($("<div>")
            .addClass("pedidosDoUser")
            .append($('<table>')
                .attr("id", name+"tabelaConta")
                .addClass("tabelaContaBox")
            )
        )
    );

    var len = otherUserPedidos.length;
    
    for(var i = 0; i < len; i++){
        plate = otherUserPedidos[i];
        platePrice = pedidosPriceRelation[plate];
        console.log("+ prato " + plate);
        console.log("+ preço " + platePrice);
        
        $("#" + name +"tabelaConta").append($('<tr>')
            .attr("id", name+"Row"+otherUserCounter)
            .append($('<td>')
                .addClass("tabelaContaSmall")
                .append($('<i>')
                    .attr("aria-hidden","true")
                    .attr("onClick","updatePrice(this,'" + name + "Row" + otherUserCounter + "'," + platePrice + ")")        
                    .addClass("fa fa-square-o")
                )
            )
            .append($("<td>")
                .text(plate)
                .addClass("tabelaConta")
            )
            .append($("<td>")
                .text(platePrice +"€")
                .addClass("tabelaContaSmall")
            )
        );
        otherUserCounter++;
    }    
    atualizadorPagamento();
}






//    SRCIPT-WIZARDS TEST 

function does_a_fucking_print() {
    //console.log("I got printed");

    console.log(OrderCounter);


    //var plateName, platePrice;
    //for (i = 0; i < ordered_plates.length; i++) {
    //    plateName = ordered_plates[i].name;
    //    platePrice = ordered_plates[i].price;
    //    console.log("Name:" + plateName + " Quantity:" + parseInt(sessionStorage.getItem(plateName)) + " Price:" + platePrice + "\n");
    //}
}

