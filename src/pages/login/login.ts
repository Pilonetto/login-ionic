import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController,
    AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth-data';
import {HomePage}from'../home/home';

import { ResetPassword } from '../reset-password/reset-password';
import { Signup } from '../signup/signup';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    public loginForm;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,
        public authData: AuthData, public nav: NavController) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
                this.loading.dismiss().then(() => {
                    this.nav.setRoot(HomePage);
                });
            }, error => {
                var msg = 'Senha inválida!'
                this.loading.dismiss().then(() => {
                    //if (error.code
                    let alert = this.alertCtrl.create({
                        message: msg,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });

            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

    goToSignup(): void {
        this.nav.push(Signup);
    }

    goToResetPassword(): void {
        this.nav.push(ResetPassword);
    }
}
