import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  testHeader: any;

  //Customer Array
  customersArr: any;
  isSubmitted = false;

  //Selected Customer Obj
  SelectedCustomer: any ={} ;
  DropDownCustomerSelected: any ={};
  salesBranchListSelected: any;
  DigitalForm: FormGroup;
  //address
  adressessListSelected: any;
  SelectedAddress: any;
  DropDownSelectedAddress: any;
  //url JSON server
  urlUserJsonData = 'http://localhost:3000/data';
  //Header to SP List
  private httpHeaders;
  //SP url
  urlSPList =
    "https://sonepar.sharepoint.com/sites/nl_tu_pi_hulpmiddelen/_api/web/lists/getbytitle('Digitaal-formulier')/items";
  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.DigitalForm = this.fb.group({
      Title: ['', [Validators.required]],
      Voornaam: ['', [Validators.required]],
      Achternaam: ['', [Validators.required]],
      Geslacht: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Adres: ['',[Validators.required]],
      Verkoopkantoor: ['', [Validators.required]],
      Hulpmiddelen: ['', [Validators.required]],
    });
    this.httpHeaders = new HttpHeaders({
      contentType: 'application/json;odata=verbose',
      Accept: 'application/json;odata=verbose',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc29uZXBhci5zaGFyZXBvaW50LmNvbUA2ODdiYmFhMS03YzdkLTRlNjYtOGFhMS00NjMzYTk1MzA0NmIiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBANjg3YmJhYTEtN2M3ZC00ZTY2LThhYTEtNDYzM2E5NTMwNDZiIiwiaWF0IjoxNjU0MTcwMjM4LCJuYmYiOjE2NTQxNzAyMzgsImV4cCI6MTY1NDI1NjkzOCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA2ODdiYmFhMS03YzdkLTRlNjYtOGFhMS00NjMzYTk1MzA0NmIiLCJuYW1laWQiOiIwOGRkMzI5MC0xMGI3LTQ0ZTEtODZjZS01ZGRmMWZjMGM5MTJANjg3YmJhYTEtN2M3ZC00ZTY2LThhYTEtNDYzM2E5NTMwNDZiIiwib2lkIjoiMzBiM2UxOTYtOTM5MS00NzIzLTgyNTAtNDg4MWQ1NGJlNDllIiwic3ViIjoiMzBiM2UxOTYtOTM5MS00NzIzLTgyNTAtNDg4MWQ1NGJlNDllIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.OD8ZKh4J7fW6LdjbNBJUQl34m9Z5GogfOEF7vEjVgTu7bWOO9AdMe6wpvTsoNjkZjRFmbcaVqkV4bIdmYIYsXcp-bSDnf8ob4vNxuFFr_L2pUQ4YKqXeGkx5rzO9oGhQbVmNsw7dExdbOOuAh0qJGv82Pp57kKBy3-gamZpAYhAzBHgyotBxp03eG36mYAtvpuDyLXNWjXoUDizl_mld6isM5Ocvc9bcU4JnZ_B2NX2W8bMX9UCudzz5zHh-9QE_rJg_NZJfN5KdpKcXAroUl4VZ_wvfCtmkmRSJeRDtdtWjMYbYscAHTr_zlgrxL-TzpTYywq2OGVjj2wf88Is0nw',
    });
    this.testHeader = new HttpHeaders({
      contentType: 'application/json;odata=verbose',
      Accept: 'application/json;odata=verbose',
      grant_type: 'client_credentials',
      client_id: '08dd3290-10b7-44e1-86ce-5ddf1fc0c912@687bbaa1-7c7d-4e66-8aa1-4633a953046b',
      client_secret:'5ALr7D0tuDELpBtUFJqwiHmjNIzfux9dNL1ooPPBTu0=',
      resource: '00000003-0000-0ff1-ce00-000000000000/sonepar.sharepoint.com@687bbaa1-7c7d-4e66-8aa1-4633a953046b'
    })
    console.log(this.testHeader)
  }
  ngOnInit(): void {
    this.http.get(this.urlUserJsonData).subscribe((Users:any) => {
      this.customersArr = Object.keys(Users).map((key) => Users[key]);
    });

    this.http
      .get('https://accounts.accesscontrol.windows.net/687bbaa1-7c7d-4e66-8aa1-4633a953046b/tokens/OAuth/2',{headers: this.testHeader })
      .subscribe((res: any) => {
        console.log(this.testHeader);
      });
  }
  selected() {
    //Selected item of customer array
    this.DropDownCustomerSelected = this.SelectedCustomer['Login'];
    this.adressessListSelected = this.SelectedCustomer['Login']['addresses'];
    this.DropDownSelectedAddress = this.SelectedAddress.addressLine1 +" "+this.SelectedAddress.addressLine2;
    this.salesBranchListSelected = this.DropDownCustomerSelected['salesBranch'].name;
    this.DigitalForm = this.fb.group({
      Title: [this.SelectedCustomer['Login'].id, [Validators.required]],
      Voornaam: [this.SelectedCustomer['Login'].firstName,[Validators.required]],
      Achternaam: [this.SelectedCustomer['Login'].lastName,[Validators.required]],
      Geslacht: [this.SelectedCustomer['Login'].gender, [Validators.required]],
      Email: [this.SelectedCustomer['Login'].email, [Validators.required]],
      Adres: [this.SelectedAddress.addressLine1 +" " +this.SelectedAddress.addressLine2, [Validators.required]],
      Verkoopkantoor: [this.salesBranchListSelected,[Validators.required]],
      Hulpmiddelen: ['', [Validators.required]],
    });
  }
  onSubmit(data: any) {
    this.isSubmitted = true;
    this.http
      .post(this.urlSPList, data, { headers: this.httpHeaders })
      .toPromise()
      .then((data) => {
        console.log(data);
      });
    alert('Het formulier is verzonden');
  }

}

