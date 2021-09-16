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

var fields = document.querySelectorAll('#form-user-create [name]');
var user = {};

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

function addLine(dataUser){

    //console.log('adddLine', dataUser);
    //var tr = document.createElement("tr");

    //tr.innerHTML =
    document.getElementById("table-user").innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    
    `;

    //document.getElementById("table-user").appendChild(tr);

}

document.getElementById('form-user-create').addEventListener('submit', function(event){
   
    //alert('Oi');
    event.preventDefault();//evita que o submit mude a página da web

    fields.forEach(function(field, index){

        if (field.name == 'gender'){
    
            //Duas formas de escrever a mesma coisa
            //if (field.checked === true)
            if (field.checked) user[field.name] = field.value;
    
        } else {
    
            user[field.name] = field.value;
    
        }
    
        //console.log(user);
    
    });

    var objectUser = new User(
        user.name, 
        user.gender, 
        user.birth, 
        user.country, 
        user.email, 
        user.password, 
        user.photo, 
        user.admin
    );

    addLine(objectUser);
    
});