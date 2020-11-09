import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  fileUpload(file,nombre:string) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIARK2MAXL4BSSKCWJD',
              secretAccessKey: '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',
              region: 'us-east-2',
            
          }
      );
      const params = {
          Bucket: 'semi1-proyectoclase',
          Key:  nombre , 
          //Key:  file.name ,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('EROOR: ',JSON.stringify( err));
              return false;
          }
          console.log('File Uploaded.', data);
          return true;
      });
    }
}
