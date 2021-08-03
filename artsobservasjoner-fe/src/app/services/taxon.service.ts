import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Taxon, TaxonClassification, TaxonName } from '../models/taxon';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class TaxonService {
  
  private taxonClassificationsCache$: Observable<TaxonClassification[]>;

  constructor(private httpClient: HttpClient) { }

  getTaxon(
    searchString: string,
    speciesGroupId?: number,
    includeSubSpecies?: boolean,
    onlyReportable?: boolean
  ): Observable<Taxon[]> {

    const baseUrl: string = 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/TaxonName/Search?';
    const api: string = this.createApiUrl(baseUrl, searchString, speciesGroupId, includeSubSpecies, onlyReportable);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        let taxon: Taxon;
        let taxons: Taxon[] = [];

        let scientificName: TaxonName | null;
        let vernacularName: TaxonName | null;

        response.forEach(element => {

          let scientificNameSynonym: TaxonName | null;
          let scientificNameSynonyms: TaxonName[] = [];

          let vernacularNameSynonym: TaxonName | null;
          let vernacularNameSynonyms: TaxonName[] = [];

          //--------------------***

          if (element['scientificNameSynonyms']) {

            element['scientificNameSynonyms'].forEach(element => {

              scientificNameSynonym = {
                name: element.name,
                author: element.auctor,
                taxonLanguage: element.taxonNameLanguage,
                isSearchMatch: element.isSearchMatch
              }

              scientificNameSynonyms.push(scientificNameSynonym);

            });

          }

          //--------------------***

          if (element['vernacularNameSynonyms']) {

            element['vernacularNameSynonyms'].forEach(element => {

              vernacularNameSynonym = {
                name: element.name,
                author: element.auctor,
                taxonLanguage: element.taxonNameLanguage,
                isSearchMatch: element.isSearchMatch
              }

              vernacularNameSynonyms.push(vernacularNameSynonym);

            });

          }

          //--------------------***

          if (element['scientificName']) {
            scientificName = {
              name: element.scientificName.name,
              author: element.scientificName.auctor,
              taxonLanguage: element.scientificName.taxonNameLanguage,
              isSearchMatch: element.isSearchMatch
            }
          }
          else {
            scientificName = null;
          }

          if (element['vernacularName']) {
            vernacularName = {
              name: element.vernacularName.name,
              author: element.vernacularName.auctor,
              taxonLanguage: element.vernacularName.taxonNameLanguage,
              isSearchMatch: element.isSearchMatch
            }
          }
          else {
            vernacularName = null;
          }

          //--------------------***

          taxon = {
            taxonId: element.taxonId,
            taxonCategoryId: element.taxonCategoryId,
            speciesGroupId: element.speciesGroupId,
            protectionLevelId: element.protectionLevelId,
            scientificName: scientificName,
            vernacularName: vernacularName,
            scientificNameSynonyms: scientificNameSynonyms,
            vernacularNameSynonyms: vernacularNameSynonyms
          }

          taxons.push(taxon);

        });

        console.log('taxons', taxons);

        return taxons;

      }),
      shareReplay()
    );

  }

  getTaxonData(taxonId: number): Observable<object> {

    const baseUrl: string = 'https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Taxons/' + taxonId + '/Information';

    return this.httpClient.get(baseUrl).pipe(
      map((response: any) => {
        
        console.log('taxondata', response)
        return response;

      }),
      shareReplay(1)
    );

  }

  // getTaxonCategories(): Observable<TaxonCategory[]> {

  //   const baseUrl: string = "https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Taxons/TaxonCategories";

  //   return this.httpClient.get(baseUrl).pipe(
  //     map((response: any) => {

  //       console.log('texon cats', response);

  //       let taxonCategory: TaxonCategory;
  //       let taxonCategories: TaxonCategory[] = [];

  //       response.forEach(element => {

  //         taxonCategory = {
  //           id: element.id,
  //           sortOrder: element.sortOrder,
  //           en: element.localizedLabels[0].value,
  //           no: element.localizedLabels[1].value,
  //         }

  //         taxonCategories.push(taxonCategory);

  //       });

  //       return taxonCategories;

  //     }),
  //     shareReplay(1)
  //   );

  // }

  // getTaxonCategoryById(id: number): Observable<TaxonCategory> {

  //   return this.getTaxonCategories().pipe(
  //     map(categories => categories.find(category => category.id === id))
  //   );

  // }

  get taxonClassifications(): Observable<TaxonClassification[]> {

    if (!this.taxonClassificationsCache$) {
      this.taxonClassificationsCache$ = this.requestTaxonClassifications().pipe(shareReplay(CACHE_SIZE));
    }

    return this.taxonClassificationsCache$;

  }

  private requestTaxonClassifications(): Observable<TaxonClassification[]> {

    const api: string = "https://ao3-coreapi.test.artsobservasjoner.no/api/v1/Taxons/TaxonCategories";

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        const taxonClassifications: TaxonClassification[] = [];

        response.forEach(element => {

          let taxonClassification: TaxonClassification = {
            id: element.id,
            sortOrder: element.sortOrder,
            en: element.localizedLabels[0].value,
            no: element.localizedLabels[1].value,
          }

          taxonClassifications.push(taxonClassification);

        });

        return taxonClassifications;
      }),
      shareReplay()
    );

  }

  private createApiUrl(
    baseUrl: string,
    searchParam: string,
    speciesGroupParam?: number,
    subSpeciesParam?: boolean,
    reportableParam?: boolean
  ): string {

    let api: string;
    let params: URLSearchParams = new URLSearchParams();

    // console.log('params XXX', yearParam);
    // console.log('params XXX', speciesGroupParam);
    // console.log('params XXX', taxonParam);
    // console.log('params XXX', areaParam);
    // console.log('params XXX', pageNumberParam);
    // console.log('params XXX', pageSizeParam);

    if (searchParam) params.append('Search', searchParam.toString());
    if (speciesGroupParam) params.append('SpeciesGroupId', speciesGroupParam.toString());
    if (subSpeciesParam) params.append('IncludeSubSpecies', subSpeciesParam.toString());
    if (reportableParam) params.append('OnlyReportable', reportableParam.toString());

    api = baseUrl + params.toString();

    return api;

  }

}
