import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const SVG_ICONS_PATH = 'assets/images/icons/';
export const SVG_ICONS = [
  { name: 'ic-box-time', path: SVG_ICONS_PATH + 'box-time.svg' },
  { name: 'ic-settings', path: SVG_ICONS_PATH + 'settings.svg' },
  { name: 'ic-dashboard', path: SVG_ICONS_PATH + 'dashboard.svg' },
  { name: 'ic-proposal', path: SVG_ICONS_PATH + 'proposal.svg' },
  { name: 'ic-requests', path: SVG_ICONS_PATH + 'requests.svg' },
  { name: 'ic-blank-user', path: SVG_ICONS_PATH + 'blank-user.svg' },
  { name: 'ic-blank-user', path: SVG_ICONS_PATH + 'blank-user.svg' },
  { name: 'ic-logout', path: SVG_ICONS_PATH + 'logout.svg' },

];

@Injectable({
  providedIn: 'root'
})
export class IconsRegistrarService {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
  }

  public registerIcons(): void {
    SVG_ICONS.forEach(({ name, path }) =>
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path)));
  }
}
