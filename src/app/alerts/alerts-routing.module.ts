import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LISTING_ROUTE } from '@app/alerts/pages/listing/listing.page.route';
import { DETAIL_ROUTE } from '@app/alerts/pages/detail/detail.page.route';
import { CREATE_ROUTE, EDIT_ROUTE } from '@app/alerts/pages/edit/edit.page.route';

const routes: Routes = [LISTING_ROUTE, CREATE_ROUTE, DETAIL_ROUTE, EDIT_ROUTE];
// TODO zde udělat statický config, který by se pak používal v komponentách stránek, krommě routování by
//  obsahoval i strukturu entity a další věci, které se budou využívat na více místech, jednotlivé komponenty
//  modulů se momentálně spíše opakují (list/detail/edit) takže udělat komponenty, které by byly spíše svázány
//  k použítí této struktury, ale musí jít i snadno ohýbat, tudíž bych použil častěčně uzavřený koncept,
//  kdy by tam byla natvrdo detekce struktury list-detail-edit ale bylo by možné načíst i další strukturu,
//  co bude potřeba - je potřeba myslet dopředu na to, že v budoucnu budou ty struktury mnohem komplikovanější

// TODO co nejvíce konfigurace by mělo být zde, do budoucna se chceme dostat do stavu, kdy bude struktura
//  list-detail-edit automatická a budou se jen dodělávat věci navíc - při plánování na toto myslet

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
