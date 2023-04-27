/*
 * Classe com funcionalidades relacionadas aos videos.
 * É a responsável por colocar os elementos de video na pagina
 * e ja chamar os Services para ativar as principais funcionalidades.
 */

class VideoView {

    constructor() {
        this._container = $("#container__video");
    }


    adicionaVideos(videoUrls) {
    /* A partir de um array de URLs, adiciona os videos na tela e ativa as funcionalidades
     * Exemplo de @param:  ["./assets/video1.mp4", "./assets/video2.mp4"]
     */
        if (videoUrls.length > 0) {
            this._container.innerHTML = '';
            this.__colocaVideosNoContainer(videoUrls);
        }
    }


    __colocaVideosNoContainer(videoUrls) {
    // Cria os elementos HTML para serem colocados na pagina
        for (let i = 0; i < videoUrls.length; i++) {
            const video = document.createElement('video');
            video.id = `video${i + 1}`;
            video.className = "videos col-12 col-lg-5 px-1 py-0 mb-1 mx-auto";
            video.controls = true;
    
            const source = document.createElement('source');
            source.src = videoUrls[i];
            source.type = "video/mp4";
            video.appendChild(source);
        
            this._container.appendChild(video);
      }
    }

}
