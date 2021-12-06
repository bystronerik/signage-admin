import { Routes } from '@angular/router';

const routes: Routes = [];
// TODO dodělat import nějakého base setu rout co se bude pořád opakovat list-view-edit
// TODO base routy budou mít obecné názvy List View Edit Create
//  pokud bude potřeba tak se tady pak při importu base setu extendne o doplnující routy

// TODO deklarovat službu, která bude sloužit handlování základního chování, načte
//  si config z tohoto souboru a podle toho vytvoří jednotlivé view, je potřeba myslet
//  na to, že ta služba nemusí vůbec vědět jaké views jsou zapnuté, jelikož pro ně
//  stejně deklaruju zvlášť page modul, tudíž by bylo dobré udělat nejspíše tři base classy,
//  ze kterých by extendovaly ty pages - ListComponent DetailComponent EditComponent,
//  ty by měly nějakou sdílenou logiku v BaseComponent - načetly by si z configu strukturu entity a dle toho
//  by pak vygenerovaly jednotlivé stránky

// TODO template systém udělat tak, že budou base componenty pro jednotlivé části a těm se jen předají parametry
//  ohledně struktury atd. také bude možnost cokoliv k nim doplnit  tím způsobem, že se do body componenty vloží
//  obsah a ten se vyrenderuje ještě před tlačítkem uložit
