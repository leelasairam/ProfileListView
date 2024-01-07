import { LightningElement, track } from 'lwc';
import GetProfiles from '@salesforce/apex/ProfileList.GetProfiles';
export default class ProfilesView extends LightningElement {
    @track Profiles;
    @track FilterProfiles;
    @track load = false;
    cols = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Active', fieldName: 'IsActive' }
    ]

    connectedCallback(){
        this.RetriveProfiles();
    }

    async RetriveProfiles(){
        this.load = true;
        await GetProfiles()
        .then((result) => {
            const PList = [];
            const keys = Object.keys(result);
            keys.forEach((i,j)=>{
                PList.push({profile : i, users : result[i]})
            })
            this.Profiles = PList;
            this.GetFilterProfiles();
            this.load = false;
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    GetFilterProfiles(){
        let key = this.template.querySelector(".filter").value;
        if(!key){
            this.FilterProfiles = [...this.Profiles];
        }
        else{
            this.FilterProfiles = this.Profiles.filter((i) => i.profile.toLowerCase().includes(key.toLowerCase()));
        }
    }

    Spinner(){
        this.load = true;
        setTimeout(() => {
            this.load = false;
        },1000)
    }

}