/*var nome = document.querySelector("#exampleInputName");

nome.value = 'Luciano'
nome.style.color = 'blue'*/

//Variáveis e Seletores
/*var name = document.querySelector("#exampleInputName");
var gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
var birth = document.querySelector('#exampleInputBirth');
var country = document.querySelector('#exampleInputCountry');
var email = document.querySelector('#exampleInputEmail');
var password = document.querySelector('#exampleInputPassword');
var photo = document.querySelector('#exampleInputFile');
var admin = document.querySelector('#exampleInputAdmin');*/

//var fields = document.querySelectorAll('#form-user-create [name]');
//var user = {};

/*fields.forEach(function(field, index){

    if (field.name == 'gender'){

        //Duas formas de escrever a mesma coisa
        //if (field.checked === true)
        if (field.checked)

        //console.log("Sim", field)
        user[field.name] = field.value;

    } else {

        //console.log("Não");
        user[field.name] = field.value;

    }

    //console.log(field.id, field.name, field.value, index);

});

console.log(user);*/

//colocando evento no botão
/*document.querySelectorAll("button").forEach(function(){

    this.addEventListener("click", function(){
        console.log("clicou!");
    });
});*/

let userController = new UserController("form-user-create", "table-users");