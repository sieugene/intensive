import {observable, computed, action, autorun} from 'mobx';
import apiService from './../api/api';

class authStore {
  constructor() {
    //sideEffects
    autorun(() => {
      console.log(this.email, ' ', this.password);
    });
    //аналог eventEmitter в saga
    apiService.onAuthChange(
      action((user) => {
        this.user = user;
      }),
    );
  }

  signIn = () => {
    try {
      apiService.signIn(this.email, this.password).then((data) => {
        this.user = data;
      });
    } catch (error) {}
  };
  signUp = () => {
    try {
      apiService.signUp(this.email, this.password).then((data) => {
        this.user = data;
      });
    } catch (error) {}
  };
  signOut = () => {
    try {
      apiService.signOut().then(() => {
        this.user = null;
      });
    } catch (error) {}
  };
  //объявление переменных
  @observable email = '';
  @observable password = '';
  @observable user = null;
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
