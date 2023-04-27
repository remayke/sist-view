/**
 * Classe responsavel por atualizar os componentes da pagina.
 * Atualiza o cursor de timing e as tabelas.
 */

class AtualizaService {

    constructor(videoService, tabelaService, logService) {
        this._videoService = videoService;
        this._tabelaService = tabelaService;
        this._logService = logService;

        this._loopCursor;
        this._loopTabela;
    }


    atualiza() {
        clearInterval(this._loopCursor);
        clearInterval(this._loopTabela);
        if (this._videoService.temVideo()) {
            this.__ativaLoops();
        }
    }


    __ativaLoops() {
    // Adiciona funcionalidade para que os componentes se atualizem
        this._loopCursor = setInterval(() => {
            this._videoService.sincronizaCursor();
            const tempoVideo = this._videoService.getTime();
            const row = this._logService.buscaBinaria(tempoVideo, "Video");
            this._tabelaService.moveKmNaTabela(row["Odometro"]);
        }, Util.taxaAtualizacao);
    }
}