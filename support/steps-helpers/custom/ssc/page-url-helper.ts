import { injectable, inject } from 'inversify';

import { CUSTOMTYPES } from '../../../../IoC/custom/ssc/custom-types';
import { CustomConfig } from '../../../framework-helpers/interfaces/custom/custom-config';

import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class PageURLHelper {
  private readonly customConfig: CustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig: CustomConfig) {
    this.customConfig = customConfig;
  }

  getDefinedPageURL(pageName: string) {
    return this.getPageURL(this.formatPageNameKey(pageName));
  }

  private formatPageNameKey(pageName: string) {
    return pageName.replace(/ /g, '_').toLowerCase();
  }

  getPageURL(pageName: string) {
    const pageURLSPath: string = path.join(process.cwd(), this.customConfig.urlsPath + '.json');
    const urlJsonObject = JSON.parse(fs.readFileSync(pageURLSPath, 'utf8'));
    return urlJsonObject[pageName];
  }

}
