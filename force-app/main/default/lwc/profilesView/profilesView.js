import { LightningElement, track } from 'lwc';
import GetProfiles from '@salesforce/apex/ProfileList.GetProfiles';
export default class ProfilesView extends LightningElement {
    @track Profiles;
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
        await GetProfiles()
        .then((result) => {
            const PList = [];
            const keys = Object.keys(result);
            keys.forEach((i,j)=>{
                PList.push({profile : i, users : result[i]})
            })
            this.Profiles = PList;
        })
        .catch((error)=>{
            console.log(error);
        })
    }

}