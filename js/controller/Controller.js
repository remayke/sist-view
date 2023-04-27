

class Controller {
    
    constructor() {
        this._videoService = new VideoService();
        this._tabelaService = new TabelaService($("#marcacoes"));
        this._video = new VideoView();
        this._logs = new LogService(this._tabelaService);
        
        this._atualizaService = new AtualizaService(this._videoService, this._tabelaService, this._logs);
    }


    adicionaLogsEVideos(pathXML, videosUrl) {
        this._video.adicionaVideos(videosUrl);
        this.__atualiza();
        this._logs.adicionaJSON(pathXML);
    }


    adicionaDadosNaTabela(x, y) {
        this._tabelaService.adicionaDadosNaTabela(x, y);
    }


    __atualiza() {
        this._videoService.atualiza();
        this._tabelaService.atualiza();
        this._atualizaService.atualiza();
    }

}