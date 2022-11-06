
import { Injectable } from '@angular/core';

import { IconsRegistrarService } from './icons-registrar.service';

@Injectable()
export class AppInitService {

  constructor(
    public iconsRegistrarService: IconsRegistrarService,
  ) {
  }

  init(): Promise<any> {
    return new Promise((resolve) => {
      this.iconsRegistrarService.registerIcons();
      resolve(true);
    });
  }
}
