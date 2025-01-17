import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="text-white bg-blue-600 p-3 text-center">
      Développé par <a href="mailto:martin.defachelles9@gmail.com" class="text-white underline">Martin Defachelles</a>
    </footer>
  `,
  standalone:true
})
export class FooterComponent {

}
