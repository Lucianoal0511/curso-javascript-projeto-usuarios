class UserController {

    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();

    }

    //Configurando o botão Cancelar
    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener('submit', event => {

            event.preventDefault();//evita que o submit mude a página da web

            let btn = this.formUpdateEl.querySelector('[type = submit]');//Seleciona o Botão Salvar

            //aqui vai desabilitar o botão quando estiver enviando o formulário
            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            //console.log(values);

            let index = this.formUpdateEl.dataset.trIndex

            let tr = this.tableEl.rows[index];

            //Recuperando a imagem já salva anteriormente
            let userOld = JSON.parse(tr.dataset.user);
            let result = Object.assign({}, userOld, values)//Aqui irá substituir a imagem da esquerda pela da direita

            //Configurando a edição da photo
            this.getPhoto(this.formUpdateEl).then(
                (content) => {

                    //validação da foto para não ser trocada por vazio
                    if (!values.photo) {
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;
                    }

                    let user = new User();//Tive que instanciar por causa dos underlines nos nomes
                    user.loadFromJSON(result)

                    user.save();

                    this.getTr(user, tr)

                    this.updateCount();

                    this.formUpdateEl.reset();//Limpa o formulário de edição

                    btn.disabled = false;//Aqui habilita novamente o botão salvar após enviado o formuário

                    this.showPanelCreate();//Remete o usuário ao painel de inclusão

                },
                function(e){
                    console.error(e)
                }
            );

        })

    }

    onSubmit(){

        this.formEl.addEventListener('submit', event => {//Arrow function
   
            //alert('Oi');
            event.preventDefault();//evita que o submit mude a página da web

            let btn = this.formEl.querySelector('[type = submit]');//Seleciona o Botão Salvar

            //aqui vai desabilitar o botão quando estiver enviando o formulário
            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if (!values) return false;//Caso não passe na validação dos campos ele já não tenta colocar a foto

            //Chamando Promise
            this.getPhoto(this.formEl).then(
                (content) => {

                    //Tratamento para a foto
                    values.photo = content;

                    //Inserir no sessionStorage
                    //this.insert(values);
                    //Insert substituido por save
                    values.save();

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
    getPhoto(formEl){

        return new Promise((resolve, reject) => {//Caso funcione tudo bem ocorre o resolve e no contrário ocorre o reject

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => {
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

    getValues(formEl){

        let user = {};
        let isValid = true;

        //console.log(typeof this.formEl.elements);

        [...formEl.elements].forEach(function (field, index){//Spread ... evita a repetição dos indices do array

            //Implementando campos obrigatórios
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){

                //console.dir(field);
                field.parentElement.classList.add('has-error');
                isValid = false;

            }

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
    
        //Antes de iniciar um novo formulário ele pergunta se está válido
        if (!isValid) {
            return false;
        }

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

    //Aqui irá carregar todos os dados que estão no sessionStorage para nossa página
    selectAll(){

        //let users = User.getUsersStorage();

        //Criando o AJAX = JavaScript Assincrono e XML

        HttpRequest.get('/users').then(data => {

            data.users.forEach(dataUser => {

                //Precisou fazer isso porque precisa carregar a partir de um JSON
                let user = new User();
                user.loadFromJSON(dataUser);
                this.addLine(user);//Adiciona linha a cada usuário
            })

        })

        // let ajax = new XMLHttpRequest();
        // ajax.open('GET', '/users');
        // ajax.omload = event => {//Porque não sabemos quanto tempo irá levar para responder

        //     let obj = {users: []}

        //     try {
        //         obj = JSON.parse(ajax.responseText);
        //     } catch(e) {
        //         console.log(e);
        //     }
            
        //     obj.users.forEach(dataUser => {

        //         //Precisou fazer isso porque precisa carregar a partir de um JSON
        //         let user = new User();
        //         user.loadFromJSON(dataUser);
        //         this.addLine(user);//Adiciona linha a cada usuário
        //     })

        // }

        // ajax.send();

        // users.forEach(dataUser => {

        //     //Precisou fazer isso porque precisa carregar a partir de um JSON
        //     let user = new User();
        //     user.loadFromJSON(dataUser);
        //     this.addLine(user);//Adiciona linha a cada usuário
        // })

    }

    //Foi substituido pelo método save
    /*insert(data){

        let users = this.getUsersStorage();

        users.push(data);//colocando o dados no array

        //sessionStorage.setItem("users", JSON.stringify(users));//Converte o json em uma string
        localStorage.setItem("users", JSON.stringify(users));//Para salvar no localStorage

    }*/

    addLine(dataUser){

        //console.log('adddLine', dataUser);

        let tr = this.getTr(dataUser);//aqui se faz necessário criar uma tr
        
        this.tableEl.appendChild(tr);

        this.updateCount();
    
    }

    getTr(dataUser, tr = null){//Como o tr nem sempre existe ou é opcional, foi necessário colocá-lo mas como null

        if (tr === null) tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        
        `;

        this.addEventsTr(tr);

        return tr;

    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e => {
        
            if (confirm('Deseja realmente excluir?')) {//Confirmação de exclusão

                let user = new User();

                //Para remover do localStorage
                user.loadFromJSON(JSON.parse(tr.dataset.user));
                user.remove();

                tr.remove();//Excluir toda a linha da tr

                this.updateCount();//Para atualizar o contador

            }
        
        })

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            //console.log(JSON.parse(tr.dataset.user));
            let json = JSON.parse(tr.dataset.user);

            //Criando um id para o usuário
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {
                let field = this.formUpdateEl.querySelector("[name = " + name.replace('_', '') + ']' );

                if (field) {
                    //if (field.type == 'file') continue;
                    //Criando Switch
                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name = " + name.replace('_', '') + '][value = ' + json[name] + ']');
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];

                    }

                }
                
            }

            //Procura a imagem na classe photo e achando troca o src por json._photo
            this.formUpdateEl.querySelector('.photo').src = json._photo;

            this.showPanelUpdate();

        });

    }

    //Criando o painel de inclusão
    showPanelCreate(){

        document.querySelector("#box-user-create").style.display = "block";//Aparece o box de criar usuário
        document.querySelector("#box-user-update").style.display = "none";//Desaparece o box de editar usuário

    }

    //Criando o painel de edição
    showPanelUpdate(){
        
        document.querySelector("#box-user-create").style.display = "none";//Desaparece o box de criar usuário
        document.querySelector("#box-user-update").style.display = "block";//Aparece o box de editar usuário

    }

    //Atualizar quantidade de usuários
    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            //console.log(JSON.parse(tr.dataset.user));
            let user = JSON.parse(tr.dataset.user);//Comverte uma string em Objeto JSON

            if (user._admin) numberAdmin++;

        });

        //atualizando os contadores na tela
        document.querySelector('#number-users').innerHTML = numberUsers;
        document.querySelector('#number-users-admin').innerHTML = numberAdmin;

    }

}