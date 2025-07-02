// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-frames-management',
//   templateUrl: './frames-management.component.html',
//   styleUrls: ['./frames-management.component.css']
// })
// export class FramesManagementComponent {

// }
// import { Component, OnInit } from '@angular/core';
// import { FrameService, Frame } from 'src/app/services/frame.service';

// @Component({
//   selector: 'app-frames-management',
//   templateUrl: './frames-management.component.html',
//   styleUrls: ['./frames-management.component.css']
// })
// export class FramesManagementComponent implements OnInit {

//   frames: Frame[] = [];

//   newFrame: Frame = {
//     frameId: '',
//     frameName: '',
//     brand: '',
//     color: '',
//     price: 0,
//     description: '',
//     shape: '',
//     quantity: 0,
//     imageUrl: ''
//   };

//   constructor(private frameService: FrameService) { }

//   ngOnInit(): void {
//     this.fetchFrames();
//   }

//   fetchFrames(): void {
//     this.frameService.getAllFrames().subscribe(data => {
//       this.frames = data;
//     });
//   }

//   addFrame(): void {
//     this.frameService.addFrames(this.newFrame).subscribe(() => {
//       this.fetchFrames();
//       this.resetForm();
//     });
//   }

//   deleteFrame(id: string): void {
//     this.frameService.deleteFrames(id).subscribe(() => {
//       this.fetchFrames();
//     });
//   }

//   editFrame(frame: Frame): void {
//     this.newFrame = { ...frame };
//   }

//   resetForm(): void {
//     this.newFrame = {
//       frameId: '',
//       frameName: '',
//       brand: '',
//       color: '',
//       price: 0,
//       description: '',
//       shape: '',
//       quantity: 0,
//       imageUrl: ''
//     };
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Frame, FrameService } from 'src/app/services/frame.service';

@Component({
  selector: 'app-frames-management',
  templateUrl: './frames-management.component.html',
  styleUrls: ['./frames-management.component.css']
})
export class FramesManagementComponent implements OnInit {
  frames: Frame[] = [];
  frameData: Frame = this.getEmptyFrame();
  isEditMode = false;

  constructor(private frameService: FrameService) {}

  ngOnInit(): void {
    this.loadFrames();
  }

  getEmptyFrame(): Frame {
    return {
      frameId: '',
      frameName: '',
      brand: '',
      color: '',
      price: 0,
  
      shape: '',
      quantity: 0,
      imageUrl: ''
    };
  }

  loadFrames(): void {
    this.frameService.getAllFrames().subscribe((data) => {
      this.frames = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.frameService.updateFrames(this.frameData).subscribe(() => {
        this.loadFrames();
        this.resetForm();
      });
    } else {
      this.frameService.addFrames(this.frameData).subscribe(() => {
        this.loadFrames();
        this.resetForm();
      });
    }
  }

  editFrame(frame: Frame): void {
    this.frameData = { ...frame };
    this.isEditMode = true;
  }

  deleteFrame(frameId: string): void {
    if (confirm('Are you sure you want to delete this frame?')) {
      this.frameService.deleteFrames(frameId).subscribe(() => {
        this.loadFrames();
      });
    }
  }

  resetForm(): void {
    this.frameData = this.getEmptyFrame();
    this.isEditMode = false;
  }
}
