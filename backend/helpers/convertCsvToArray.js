import csvParse from 'csv-parse';
import fs from 'fs';
import { finished } from 'stream';

export async function convertCsvToArray(filePath) {
    function promisifyParser(parser) {
        return new Promise((resolve, reject) => {
            const records = [];

            parser.on('readable', () => {
                let record;

                while(record = parser.read()) {
                    records.push(record);
                }
            });

            finished(parser, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(records);
                }
            });
        })
    }

    const parser = fs
        .createReadStream(filePath)
        .pipe(csvParse());

    const records = await promisifyParser(parser);
    
    return records;
}
