/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, nativeImage, Tray, BrowserWindow } from 'electron';

type TrayChannel = 'click';
// | 'right-click'
// | 'mouse-up'
// | 'mouse-move'
// | 'mouse-leave'
// | 'mouse-enter'
// | 'mouse-down'
// | 'drop-text'
// | 'drop-files'
// | 'drop'
// | 'drag-enter'
// | 'drag-end'
// | 'double-click'
// | 'balloon-closed'
// | 'balloon-click'
// | 'balloon-show';

export default class TrayApp {
  private tray: Tray | null;

  private static instance: TrayApp;

  public contextMenu: Menu | null;

  public icon: string;

  public title: string;

  public tip: string;

  public win: BrowserWindow | null;

  private constructor() {
    this.tray = null;
    this.win = null;
    this.contextMenu = null;
    this.icon = '';
    this.title = '';
    this.tip = '';
  }

  public static getInstance(): TrayApp {
    if (!TrayApp.instance) {
      TrayApp.instance = new TrayApp();
    }
    return TrayApp.instance;
  }

  public startTray() {
    const icon = nativeImage.createFromPath(this.icon);
    this.tray = new Tray(icon);
    this.tray.setTitle(this.title);
    this.tray.setToolTip(this.tip);
    // Call this again for Linux because we modified the context menu
    this.tray.setContextMenu(this.contextMenu);
  }

  public setRadioBtnTrue(item: string) {
    const pos = this.contextMenu?.items
      .map((itn, idx) =>
        itn.label === item && itn.type === 'radio' ? idx : -1
      )
      .filter((value) => value > -1);

    if (pos && pos.length > 0 && this.contextMenu)
      this.contextMenu.items[pos[0]].checked = true;
  }

  public on(channel: TrayChannel, func: any) {
    this.tray?.on(channel, (_event: any, ...args: any[]) => func(...args));
  }

  public once(channel: TrayChannel, func: any) {
    this.tray?.on(channel, (_event: any, ...args: any[]) => func(...args));
  }
}
