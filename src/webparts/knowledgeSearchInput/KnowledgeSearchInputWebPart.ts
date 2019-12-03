import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';

import styles from './KnowledgeSearchInputWebPart.module.scss';
import * as strings from 'KnowledgeSearchInputWebPartStrings';

export interface IKnowledgeSearchInputWebPartProps {
  placeholder: string;
}

export default class KnowledgeSearchInputWebPart extends BaseClientSideWebPart<IKnowledgeSearchInputWebPartProps> {

  public _sendSearch(): void {
    location.href = this.context.pageContext.web.absoluteUrl+'/SitePages/Knowledge-search.aspx?title='+document.getElementById('knowledgeSearchTxt')['value']
  }
  
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.knowledgeSearchInput }">
        <input type="text" id="knowledgeSearchTxt" class="${styles.input}" placeholder="${this.properties.placeholder}">
        <button class="${styles.button}" id="knowledgeSearchBtn">Search</button>
      </div>`;
      let clickEvent= document.getElementById('knowledgeSearchBtn');
      clickEvent.addEventListener("click", (e: Event) => this._sendSearch());
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('placeholder', {
                  label: strings.PlaceholderFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
