import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //Customer Array
  customersArr: any;
  isSubmitted = false;
  opt: any;

  //Seleced Customer Obj
  SelectedCustomer: any ={} ;
  DropDownCustomerSelected: any ={};



  salesBranchListSelected: any;
  DigitalForm: FormGroup;

  //Data To SP
  requestData: any;

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


    console.log(this.SelectedCustomer)
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
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc29uZXBhci5zaGFyZXBvaW50LmNvbUA2ODdiYmFhMS03YzdkLTRlNjYtOGFhMS00NjMzYTk1MzA0NmIiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBANjg3YmJhYTEtN2M3ZC00ZTY2LThhYTEtNDYzM2E5NTMwNDZiIiwiaWF0IjoxNjU0MDgwOTQ2LCJuYmYiOjE2NTQwODA5NDYsImV4cCI6MTY1NDE2NzY0NiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA2ODdiYmFhMS03YzdkLTRlNjYtOGFhMS00NjMzYTk1MzA0NmIiLCJuYW1laWQiOiIwOGRkMzI5MC0xMGI3LTQ0ZTEtODZjZS01ZGRmMWZjMGM5MTJANjg3YmJhYTEtN2M3ZC00ZTY2LThhYTEtNDYzM2E5NTMwNDZiIiwib2lkIjoiMzBiM2UxOTYtOTM5MS00NzIzLTgyNTAtNDg4MWQ1NGJlNDllIiwic3ViIjoiMzBiM2UxOTYtOTM5MS00NzIzLTgyNTAtNDg4MWQ1NGJlNDllIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.n2JRxxmHQQ4V_He0oA8uO9XhuqsGifgZK2XRvfdsI3hqKatNlxyfzpH2lC0sfh4npx8etDFvV8Qbtj8sSLVONygSrJM6f-2eB57U2KlPu7GxpC0kB9meEfYkiTsLnLrmbxijqNzfQoXlL89d7ETuaUbRZVgNetVn1TdWTfOPzoEdbhbJbiYCEEPe9AJTtU3hQt2K0csXlu-UY_72OEuzyMTPhQEfpHMdCpjb2BWA9cOqKOL5U9tvatOd5DKyi9tpq8Myf52-fmAAt0NqK-tc9PRIFn6RfrnNn51vB6L63lW7SSspd9PCJ_kRkZx9SAmCh5V8o1d_pZOS2chvIm1pfw',
    });

  }
  ngOnInit(): void {
    this.http.get(this.urlUserJsonData).subscribe((Users:any) => {
      this.customersArr = Object.keys(Users).map((key) => Users[key]);
      console.log('Customer Array: ',this.customersArr);

    });

  }


  selected() {
    //Selected item of customer array
    this.DropDownCustomerSelected = this.SelectedCustomer['Login'];



    this.adressessListSelected = this.SelectedCustomer['Login']['addresses'];
    this.DropDownSelectedAddress = this.SelectedAddress.addressLine1 +this.SelectedAddress.addressLine2;

    this.salesBranchListSelected =
      this.DropDownCustomerSelected['salesBranch'].name;

    this.DigitalForm = this.fb.group({
      Title: [this.SelectedCustomer['Login'].id, [Validators.required]],
      Voornaam: [
        this.SelectedCustomer['Login'].firstName,
        [Validators.required],
      ],
      Achternaam: [
        this.SelectedCustomer['Login'].lastName,
        [Validators.required],
      ],
      Geslacht: [this.SelectedCustomer['Login'].gender, [Validators.required]],
      Email: [this.SelectedCustomer['Login'].email, [Validators.required]],
      Adres: [this.SelectedAddress.addressLine1 +" " +this.SelectedAddress.addressLine2, [Validators.required]],

      Verkoopkantoor: [
        this.salesBranchListSelected,
        [Validators.required],
      ],
      Hulpmiddelen: ['', [Validators.required]],
    });
    console.log(this.DigitalForm);

  }

  onSubmit(data: any) {
    this.isSubmitted = true;
    console.log('In de onSubmit', data);
    console.log(data.Adres);
    this.http
      .post(this.urlSPList, data, { headers: this.httpHeaders })
      .toPromise()
      .then((data) => {
        console.log(data);
      });
    alert('Het formulier is verzonden');
  }
}

