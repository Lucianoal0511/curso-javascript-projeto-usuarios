class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    get register(){
        return this._register;
    }

    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json){
        for (let name in json){

            switch (name) {

                case '_register':
                    this[name] = new Date(json[name]);
                    break;

                default:
                    this[name] = json[name];
            }
            
        }
    }

    //Método para criar Id
    getNewID(){

        let usersID = parseInt(localStorage.getItem('usersID'));//colocamos o parseInt para não ser salvo como string

        if (!usersID) usersID = 0;

        usersID++;

        localStorage.setItem('usersID', usersID);//Guarda o Id no localStorage

        return usersID;

    }

    //Método de carregar os dados que estão dentro do sessionStorage
    static getUsersStorage(){

        let users = [];//Criando array
        
        //Para sessionStorage
        /*if (sessionStorage.getItem('users')){//verifica se tem alguma coisa no array

            users = JSON.parse(sessionStorage.getItem('users'));//Aqui vai sobreescrever o array

        }*/

        //Para localStorage
        if (localStorage.getItem('users')){//verifica se tem alguma coisa no array

            users = JSON.parse(localStorage.getItem('users'));//Aqui vai sobreescrever o array

        }

        return users;

    }

    save (){

        let users = User.getUsersStorage();

        if (this.id > 0) {//Aqui está editando o usuário

            users.map(u => {

                if (u._id == this.id) {

                    Object.assign(u, this);//Mesclar os dois objetos JSON 

                }

                return u;

            });

        } else {//Aqui está criando o usuário

            this._id = this.getNewID();

            users.push(this);//colocando o dados no array

        }

        //sessionStorage.setItem("users", JSON.stringify(users));//Converte o json em uma string
        localStorage.setItem("users", JSON.stringify(users));//Para salvar no localStorage

    }

    remove(){

        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            if (this._id == userData._id) {
                //console.log(userData, index)
                users.splice(index, 1)
            }
        });
        //console.log(users);

        localStorage.setItem("users", JSON.stringify(users));//Para salvar no localStorage



    }

}