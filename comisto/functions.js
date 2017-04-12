//<!-- SRCIPT-WIZARDS TEST -->
//<script>
    function does_a_fucking_print() {
        console.log("Burguellets:" + sessionStorage.getItem("Burguellet") + "\n" + "Bitoque:" +
        sessionStorage.getItem("Bitoque") + "\n" + "Esparguete à Bolonhesa:" +
        sessionStorage.getItem("Esparguete à Bolonhesa") + "\n");
    }



//<!-- REGISTO DOS PEDIDOS -->
    function storeOrder(foodId) {
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount + 1);
        $("#tabelaPedidos").append("<tr><td>" + foodId + " 1€</td><tr>");//faz update da lista de pedidos
    } 


//<!-- INICIALIZAR "VETOR" DE PEDIDOS -->
    function initializeDataStorage() {
        sessionStorage.setItem("Burguellet",0);
        sessionStorage.setItem("Bitoque",0);
        sessionStorage.setItem("Esparguete à Bolonhesa",0);
    }

//PLATE STRUCTURE
    function Plate(){
        this.Price;
        this.Ingredients = [];
        this.Name;
    }





//plate-bolonhesa : 0
//plate-asdfhuahfa: 2

//comeca no incio
//randomguy: 1