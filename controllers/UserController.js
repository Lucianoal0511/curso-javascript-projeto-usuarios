class UserController {

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit(){

        this.formEl.addEventListener('submit', event => {//Arrow function
   
            //alert('Oi');
            event.preventDefault();//evita que o submit mude a página da web

            /*let user = this.getValues();

            this.addLine(user);*/

            //Reduzindo código é a mesma coisa de cima
            this.addLine(this.getValues());
            
        });

    }

    getValues(){

        let user = {};

        //console.log(typeof this.formEl.elements);

        [...this.formEl.elements].forEach(function (field, index){//Spread ... evita a repetição dos indices do array

            if (field.name == 'gender'){
        
                if (field.checked){
                    user[field.name] = field.value;
                }
        
            } else {
                user[field.name] = field.value;
            }      
        });
    
        //Uma boa prática, reduzir código
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

        /*var objectUser = new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

        return objectUser;*/

    }

    addLine(dataUser){

        //console.log('adddLine', dataUser);
        //var tr = document.createElement("tr");
    
        //tr.innerHTML =
        this.tableEl.innerHTML = `
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

}