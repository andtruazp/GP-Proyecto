import { Router } from '@angular/router';
import { inject } from "@angular/core"


export const rolGuard = () =>{
    //const router = inject(Router);
    const data = sessionStorage.getItem('userData')
    if(data){
        const datosu = JSON.parse(data);
        const user1 = datosu[0];
        if(user1.id_u == 1){
            console.log(user1.id_u);
        }
    }
    
    
    

    
}