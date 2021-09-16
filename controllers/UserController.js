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

            let btn = this.formEl.querySelector('[type = submit]');//Seleciona o Botão Salvar

            //aqui vai desabilitar o botão quando estiver enviando o formulário
            btn.disabled = true;

            let values = this.getValues();

            //Chamando Promise
            this.getPhoto().then(
                (content) => {

                    //Tratamento para a foto
                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();//Aqui vai limpar o formulário

                    btn.disabled = false;//Aqui habilita novamente o botão salvar após enviado o formuário

                },
                function(e){
                    console.error(e)
                }
            );
            
        });

    }

    //Método para pegar a foto
    getPhoto(){

        return new Promise((resolve, reject) => {//Caso funcione tudo bem ocorre o resolve e no contrário ocorre o reject

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });

            //console.log(elements[0].files[0]);
            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {//Utiliza o e para aparecer o erro que ocorreu

                reject(e);

            };

            //Tratando um bug caso não tenha sido enviado foto alguma
            if (file) {//Se tiver foto
                fileReader.readAsDataURL(file);
            } else {//Caso não tenha foto
                resolve('dist/img/boxed-bg.jpg');
            }

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
        
            } else if (field.name == "admin") {//Resolver o problema do checkbox do admin

                user[field.name] = field.checked;

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
        let tr = document.createElement("tr");
    
        tr.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        
        `;
    
        this.tableEl.appendChild(tr);
    
    }

}