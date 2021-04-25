import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {PgServiceService} from '../../../../services/pgService/pg-service.service'

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  constructor(private pgserve:PgServiceService,private router:ActivatedRoute,private route:Router) { }
  id;
  pg;
  images:[any]
  selectimg
  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id');
    console.log(this.id);
      this.pgserve.getPg(this.id).subscribe(res=>{
        this.pg=res.result;
        this.images=res.result.photos;
        this.selectimg=this.images[0];
        console.log(this.pg);
      },err=>{
        console.log(err);
      })


}

onSelectImg(imgsrc)
{
  this.selectimg=imgsrc;
}


bookPage()
{
  localStorage.setItem('pgid',this.pg._id);
  this.route.navigate(['book'],{relativeTo:this.router});
}

}
