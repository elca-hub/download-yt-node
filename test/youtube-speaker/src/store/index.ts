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
    },
    isFirstPlay (state) {
      return state.nowPlayingSongIndex === -1
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
      state.audioObj.pause() // 一時停止
      state.isPlaying = false
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
      state.nowPlayingSongIndex = state.videoList.findIndex(item => item.id === videoId)
      if (!state.isPlaying) state.audioObj.play()
    },
    songControll ({ state }, isPlay:boolean) {
      if (isPlay) state.audioObj.play()
      else state.audioObj.pause()
    },
    skipSong ({ state, dispatch }, isNext: boolean) {
      if (isNext) state.nowPlayingSongIndex++
      else state.nowPlayingSongIndex--
      console.log(state.nowPlayingSongIndex)
      const playVideoId = state.videoList[state.nowPlayingSongIndex].id
      dispatch('setAudioObj', playVideoId)
    }
  },
  modules: {
  }
})
