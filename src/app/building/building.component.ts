import { Component, OnInit,  ViewChild } from '@angular/core';
import { BuildingService } from '../building.service';
import { IEdge } from '../IEdge';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { interval } from 'rxjs';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent implements OnInit {
  public building = [];
  public edge = [];
  public mAEdge : object[];
  public mIEdge = new IEdge();
  public mAIEdge : any[] = [];
  public strValue : string ="";
  public strTempValue : string ="";
  public bIsValid : boolean = false;
  public bPrgBar : boolean = false;

  strHeadings : string[]  = ["Equipment","Topentry","Model","system","CollectionInterval","Actions" ];
  dataSource : MatTableDataSource<IEdge>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private mBuilding : BuildingService) { }

  ngOnInit(): void {
    this.mBuilding.getBuildingData().subscribe( data => this.building = data );
    this.mBuilding.getEdgeData().subscribe( data => this.edge = data );

  }

  Check(EdgeDetaildata : any[],value : string) : void{

    if(this.bIsValid == true)
    {


      this.strValue = value == "DirectEdge" ? "66734fedfb75" : "56240fb7dcda";

      for(let dwStart = 0; dwStart < EdgeDetaildata.length; dwStart++)
      {
        let res = EdgeDetaildata[dwStart];
        this.mAEdge = res['EdgeID'];
        for(let dwInnerStart = 0; dwInnerStart < this.mAEdge.length; dwInnerStart++)
        {
          this.strTempValue = this.mAEdge[dwInnerStart]['equipmentId'];
          if(this.strTempValue.endsWith(this.strValue))
          {
            this.mIEdge.strEquipmentName =this.mAEdge[dwInnerStart]['equipmentName'];
            this.mIEdge.strEquipmentId =this.mAEdge[dwInnerStart]['equipmentId'];
            this.mIEdge.strModelName =this.mAEdge[dwInnerStart]['modelName'];
            this.mIEdge.strSystemName =this.mAEdge[dwInnerStart]['systemName'];
            this.mIEdge.strTopEntity =this.mAEdge[dwInnerStart]['topEntity'];
            this.mIEdge.dwCollectionInterval =this.mAEdge[dwInnerStart]['collectionInterval'] == null ? 0 : this.mAEdge[dwInnerStart]['collectionInterval'];
            this.mAIEdge.push(this.mIEdge);
          }
          this.dataSource = new MatTableDataSource<IEdge>(this.mAIEdge);
          this.dataSource.paginator = this.paginator;
          this.mIEdge = new IEdge();
        }
      }
    }
}

validate(value) : void{
  this.bIsValid = true;
}
query(value) : void{
  this.mAIEdge =[];
  this.mBuilding.getAEdgeData().subscribe( data =>{
    this.Check(data,value);
} );
  
}
}