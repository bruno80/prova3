import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilPage } from '../perfil/perfil.page';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = {
    "nome": "",
    "foto": "",
  }

  constructor(public modalController: ModalController, private storage: Storage) {
    this.storage.get('user').then((val) => {
      if (val) {
        this.user = val
      };
    });
  }

  async modal() {
    const modal = await this.modalController.create({
      component: PerfilPage
    });
    await modal.present();

    modal.onDidDismiss().then((dados) => {
      this.user = dados.data
      this.storage.set("user", this.user)
    })
  }
}
