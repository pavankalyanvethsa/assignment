import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBuilding } from './Building';
import { IEdge} from'./edge';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  public strBuildingPath : string = "/assets/data/building.json";
  public strEdgePath : string = "/assets/data/edge.json";
  public strAEdgePath : string = "/assets/data/edge-details.json";

  constructor(private mHttp : HttpClient) { }
   
  getBuildingData():Observable<IBuilding[]>{
    return this.mHttp.get<IBuilding[]>(this.strBuildingPath);
  }
  getEdgeData():Observable<IEdge[]>{
    return this.mHttp.get<IEdge[]>(this.strEdgePath);
  }
  getAEdgeData():Observable<any>{
    return this.mHttp.get(this.strAEdgePath);
  }
}
