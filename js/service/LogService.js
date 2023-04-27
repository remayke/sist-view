/**
 * Classe que lida com os Logs da aplicacao.
 */


class LogService {

    constructor(tabelaService) {
        this._nomeChave = "Video";
        this._json;
        this._tabelaService = tabelaService;
    }
    
    
    adicionaJSON(pathXML) {
        // this._json = this.__convertJSONfromXML(pathXML);
        this.__populaTabela();
    }


    getJSON() {
        return this._json;
    }


    buscaBinaria(valor, chave) {
        let start = 0;
        let end = this._json.length - 1;
        let mid;
        
        while (start <= end) {
            mid = Math.floor((start + end) / 2);
            if (this._json[mid][chave] < valor) {
                start = mid + 1;
            } else if (this._json[mid][chave] > valor) {
                end = mid -1;
            } else  {
                break;
            }
        }
        return this._json[mid];
    }

    __populaTabela() {
        this._json.forEach((line, index) => {
            if (index%25 == 0) {
                this._tabelaService.adicionaIRI(line["Odometro"], line["IRIInt"]);
                this._tabelaService.adicionaFlecha(line["Odometro"], line["FlechaInt"], 2);
            }
        });
    }


    __convertJSONfromXML(pathXML) {
        const xml = fs.readFileSync(pathXML, "utf-8");
        let logs;
        parseString(xml, (err, result) => {
            if (err) {
                console.err(err);
                logs = null;
            } else {
                logs = result.DadosTrecho.Logs[0].Log.map(this.__mapLogFromXML);
            }
        });
        return this.__ordenaArray(logs);
    }


    __mapLogFromXML(log) {
        return {
            Id: parseInt(log.$.Id),
            Odometro: parseInt(log.$.Odometro),
            Video: parseFloat(log.TempoCamera[0].$.Frente),
            Y: parseFloat(log.GPS[0].$.Y),
            X: parseFloat(log.GPS[0].$.X),
            Z: parseFloat(log.GPS[0].$.Z),
            IRIInt: parseFloat(log.Pavimento[0].$.IRIInt),
            IRIExt: parseFloat(log.Pavimento[0].$.IRIExt),
            FlechaInt: parseFloat(log.Pavimento[0].$.FlechaInt),
            FlechaExt: parseFloat(log.Pavimento[0].$.FlechaExt),
        };
    }

    
    __ordenaArray(array) {
        return array.sort((a, b) => {
            return parseFloat(a[this._nomeChave]) - parseFloat(b[this._nomeChave]);
        });
    }
}


// const fs = require('fs');
// const { parseString } = require('xml2js');
// files = new LogService();
// files.adicionaJSON("./assets/1067_153PR00563/LogsTrecho.xml");
// jsonData = JSON.stringify(files.getJSON());
// fs.writeFile('data.json', jsonData, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Arquivo salvo com sucesso!');
//     }
//   });
// console.log(JSON.stringify(files.getJSON()));