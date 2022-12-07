import { Component, OnInit, ViewChild } from '@angular/core';
import { inherits } from 'util';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  @ViewChild('video') vid: any

  constructor() { }

  position: any
  currentLat: any
  currentLong: any

  geoPermission: any
  mediaPermission: any

  ngOnInit(): void {
    this.init()
  }

  ngAfterViewInit(): void {

  }

  init(): void {
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      this.processLocation(result.state)

      result.onchange = () => {
        this.processLocation(result.state)
      }
    })

    const permissionMediaName = "camera" as PermissionName;
    navigator.permissions.query({name: permissionMediaName}).then((result) => {
      this.processVideo(result.state)

      result.onchange = () => {
        this.processVideo(result.state)
      }
    })
  }

  processLocation(state: any): void {
    console.log(`geo: ${state}`)
    this.geoPermission = state

    this.currentLat = null
    this.currentLong = null

    if (state == 'granted' || state == 'prompt') {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        this.position = position
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude
      })
    }
  }

  processVideo(state: any): void {
    console.log(`media: ${state}`)
    this.mediaPermission = state

    if (this.vid) {
      if (state == 'granted' || state == 'prompt') {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } }).then((stream) => {
          this.vid.nativeElement.srcObject = stream
        })
      }
    }
  }

  closeWebView(): void {
    window.location.href = '//itax//?event=close'
  }
}
