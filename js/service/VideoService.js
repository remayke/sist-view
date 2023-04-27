/*
 * Classe com funcionalidades relacionadas aos videos da pagina.
 * Gerencia o sincronismo dos videos com o cursor e a velocidade
 * de reproducao dos videos, sobrescrevendo as funcionalidades 
 * de play, de pause, de update e de seeking dos videos.
 */

class VideoService {

    constructor() {
        this._videos;
        this._cursor;
        this._speed;
    }


    atualiza() {
    // Atualiza componentes que fazem as funcionalides do VideoService
        this._videos = document.querySelectorAll(".videos");
        this._cursor = document.querySelector("#cursor")
        this._speed  = document.querySelector("#speedButton");
        if (this._videos.length !== 0) {
            this.__atualizaEventsVideo();
            this.__atualizaEventSpeedVideo();
            this.__atualizaEventCursor();
        }
    }


    temVideo() {
    // Verifica se existem videos para serem mostrados
        return this._videos.length !== 0;
    }


    getTime() {
    // Obtem timing em segundos do video mostrado
        return this._videos[0].currentTime;
    }


    sincronizaCursor() {
    // Funcionalidade que sincroniza o cursor com o time dos videos
        this._cursor.value = (this._videos[0].currentTime / this._videos[0].duration) * 100;
    }


    sincronizaVideos(time) {
    // Sincroniza todos os videos para rodarem no mesmo timing, e chama o cursor para se atualizar
        for (const video of this._videos) {
            video.currentTime = time;
        }
    }


    __atualizaEventsVideo() {
    // Events que sincronizam os videos com o apertar do play, do pause, do seeking e do update dos videos
        this._videos.forEach((video, indice, listaVideos) => {
                video.currentTime = 0;
                Util.removeAllEventListeners(video, "play");
                Util.removeAllEventListeners(video, "pause");
                const listaVideosSemVideoAtual = Array.from(listaVideos).filter((v, i) => indice !== i);
                listaVideosSemVideoAtual.forEach((outrosVideos) => {
                    video.addEventListener("play",  () => { this.sincronizaVideos(video.currentTime); this.sincronizaCursor(); outrosVideos.play();});
                    video.addEventListener("pause", () => { this.sincronizaVideos(video.currentTime); this.sincronizaCursor(); outrosVideos.pause();});
                });
        });
    }


    __atualizaEventSpeedVideo() {
    // Event que alteram a velocidade de reprodução dos videos
        this._speed.value = "1.0";
        Util.removeAllEventListeners(this._speed, "change");
        this._speed.addEventListener("change", () => {
            this._videos.forEach(video => video.playbackRate = parseFloat(this._speed.value));
        });
    }


    __atualizaEventCursor() {
    // Event o cursor ao mover a barra de progresso do video.
        this._cursor.value = 0;
        Util.removeAllEventListeners(this._cursor, "input");
        this._cursor.addEventListener("input", () => {
            this.sincronizaVideos((this._cursor.value / 100) * this._videos[0].duration);
        });
    }

}