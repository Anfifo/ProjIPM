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
        for (i = 0; i < ordered_plates.length; i++) {
            console.log("Nome:" + ordered_plates[i].name + " Preco:" + ordered_plates[i].price + "\n");
        }
    }


//<!-- REGISTO DOS PEDIDOS -->
    function storeOrder(foodId) {
        var foodCount = parseInt(sessionStorage.getItem(foodId));
        sessionStorage.setItem(foodId, foodCount + 1);
        $("#tabelaPedidos").append("<tr><td>" + foodId + "</td><td>" + findPlate(foodId).price + "€</td><tr>");//faz update da lista de pedidos
        
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