import {observable, computed, action, autorun} from 'mobx';

class authStore {
    constructor(){
        //sideEffects
        autorun(() => {
            console.log(this.email,' ', this.password)
        })
   
    }
  //объявление переменных
  @observable email = '';
  @observable password = '';
  //если убрать computed, будет вызываться каждый раз
  //если оставить будет работать как memo и обновится когда нужно
  @computed get isValidPassword() {
    return this.password.length >= 8;
  }
  //

  @action setEmailChange = (email) => (this.email = email);
  @action setPasswordChange = (password) => (this.password = password);
}

export default new authStore();
