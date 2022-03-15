import Vue from 'vue'
import Vuex from 'vuex'
import IYoutubeData from '@/interfaces/IYoutubeData'
import YoutubeApiService from '@/services/YoutubeApiService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoId: '', // 追加された動画のID
    videoList: [] as IYoutubeData[],
    nowPlayingSongIndex: -1, // 現在再生されている曲に対応したvideoListのindex
    isPlaying: false, // 再生中か
    audioObj: new Audio() as HTMLAudioElement, // audioオブジェクト
  },
  getters: {
    getNowPlayingVideoItem (state) {
      const res = state.nowPlayingSongIndex >= 0 ? state.videoList[state.nowPlayingSongIndex] : null;
      return res
    }
  },
  mutations: {
    setVideoId(state, id) {
      state.videoId = id
    },
    pushVideoList(state, data: IYoutubeData) {
      state.videoList.push(data)
    }
  },
  actions: {
    setAudioObj ({ state }, videoId) {
      state.audioObj = new Audio(YoutubeApiService.getAudioUrl(videoId)) // audioオブジェクトを作成
      state.audioObj.addEventListener('ended', () => { // 曲が最後まで終了したら
        state.isPlaying = false
      })
      state.audioObj.addEventListener('play', () => { // 曲が再生されたら
        state.isPlaying = true
      })
      state.audioObj.addEventListener('pause', () => { // 曲が一時停止されたら
        state.isPlaying = false
      })
      state.nowPlayingSongIndex++
      if (!state.isPlaying) state.audioObj.play()
    }
  },
  modules: {
  }
})
