import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Taxon, TaxonName } from '../models/taxon';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  taxonSearchApi: string = 'https://ao3-coreapi-test.azurewebsites.net/api/v1/TaxonName/Search?';

  /**
   * 
   * https://ao3-coreapi-test.azurewebsites.net/api/v1/TaxonName/Search?Search=spekkhogger&SpeciesGroupId=7&IncludeSubSpecies=true&OnlyReportable=true
   * 
   */
  constructor(private httpClient: HttpClient) { }

  getTaxon(
    searchString: string,
    speciesGroupId?: number,
    includeSubSpecies?: boolean,
    onlyReportable?: boolean
  ): Observable<Taxon[]> {

    const api: string = this.createApiUrl(this.taxonSearchApi, searchString, speciesGroupId, includeSubSpecies, onlyReportable);

    return this.httpClient.get(api).pipe(
      map((response: any) => {

        console.log('response', response)

        let taxon: Taxon;
        let taxons: Taxon[] = [];

        let scientificName: TaxonName | null;
        let vernacularName: TaxonName | null;

        let scientificNameSynonym: TaxonName | null;
        let scientificNameSynonyms: TaxonName[] = [];

        let vernacularNameSynonym: TaxonName | null;
        let vernacularNameSynonyms: TaxonName[] = [];

        response.forEach(element => {

          //--------------------***

          if (element['scientificNameSynonyms']) {

            element['scientificNameSynonyms'].forEach(element => {

              scientificNameSynonym = {
                name: element.name,
                author: element.auctor,
                taxonLanguage: element.taxonNameLanguage
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
                taxonLanguage: element.taxonNameLanguage
              }

              vernacularNameSynonyms.push(vernacularNameSynonym);

            });

          }

          //--------------------***

          if (element['scientificName']) {
            scientificName = {
              name: element.scientificName.name,
              author: element.scientificName.auctor,
              taxonLanguage: element.scientificName.taxonNameLanguage
            }
          }
          else {
            scientificName = null;
          }

          if (element['vernacularName']) {
            vernacularName = {
              name: element.vernacularName.name,
              author: element.vernacularName.auctor,
              taxonLanguage: element.vernacularName.taxonNameLanguage
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
            // scientificName: { name: element.scientificName?.name, author: element.scientificName?.auctor, taxonLanguage: element.scientificName?.taxonNameLanguage },
            // vernacularName: { name: element.vernacularName?.name, author: element.vernacularName?.auctor, taxonLanguage: element.vernacularName?.taxonNameLanguage },
            scientificName: scientificName,
            vernacularName: vernacularName,
            scientificNameSynonyms: scientificNameSynonyms,
            vernacularNameSynonyms: vernacularNameSynonyms

          }

          console.log('taxon', taxon);

          taxons.push(taxon);

        });


        console.log('taxons', taxons);


        return taxons;

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
