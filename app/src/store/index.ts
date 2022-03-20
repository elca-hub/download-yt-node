import Vue from 'vue'
import Vuex from 'vuex'
import IYoutubeData from '@/interfaces/IYoutubeData'
import YoutubeApiService from '@/services/YoutubeApiService'
import ISongListData from "@/interfaces/ISongListData";

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoId: '', // 追加された動画のID
    videoList: [] as IYoutubeData[],
    songListsList: [] as ISongListData[],
    nowPlayingSongIndex: -1, // 現在再生されている曲に対応したvideoListのindex
    isPlaying: false, // 再生中か
    audioObj: new Audio() as HTMLAudioElement, // audioオブジェクト
    repeatTypeObj: {
      list: ['none', 'all', 'one'],
      index: 0
    },
    audioNowTime: 0, // 現在の再生時間
    audioTimer: 0,
    listId: -1,
    isSidebarView: false,
    playListName: ''
  },
  getters: {
    getNowPlayingVideoItem (state) {
      const res = state.nowPlayingSongIndex >= 0 ? state.videoList[state.nowPlayingSongIndex] : null;
      return res
    },
    isFirstPlay (state) {
      return state.nowPlayingSongIndex === -1
    },
    getNowRepeatType (state) {
      return state.repeatTypeObj.list[state.repeatTypeObj.index]
    }
  },
  mutations: {
    setVideoId(state, id) {
      state.videoId = id
    },
    pushVideoList(state, data: IYoutubeData) {
      state.videoList.push(data)
    },
    setVideoList (state, data: IYoutubeData[]) {
      state.videoList = data
    },
    setIsSidebarView (state, isSidebarView: boolean) {
      state.isSidebarView = isSidebarView
    },
    setPlayListName (state, name: string) {
      state.playListName = name
    },
    setSongListsList (state, data: ISongListData[]) {
      state.songListsList = data
    },
    setListId (state, id: number) {
      state.listId = id
    }
  },
  actions: {
    startTimer ({ state }) {
      state.audioTimer = setInterval(() => {
        state.audioNowTime = state.audioObj.currentTime
      }, 500);
    },
    stopTimer ({ state }) {
      clearInterval(state.audioTimer)
    },
    setAudioObj ({ state, dispatch }, videoId) {
      if (state.audioObj.src !== undefined) state.audioObj.pause()
      state.isPlaying = false
      state.audioObj = new Audio(YoutubeApiService.getAudioUrl(videoId)) // audioオブジェクトを作成
      state.audioObj.addEventListener('ended', () => { // 曲が最後まで終了したら
        dispatch('stopTimer') // タイマーを停止
        state.isPlaying = false
        const repeatType = state.repeatTypeObj.list[state.repeatTypeObj.index]
        if (repeatType === 'one') {
          state.audioObj.pause()
          state.audioObj.currentTime = 0
          state.audioObj.play()
        } else if (repeatType === 'all') {
          dispatch('skipSong', true)
        }
      })
      state.audioObj.addEventListener('play', () => { // 曲が再生されたら
        state.isPlaying = true
        dispatch('startTimer') // タイマーを開始
      })
      state.audioObj.addEventListener('pause', () => { // 曲が一時停止されたら
        state.isPlaying = false
        dispatch('stopTimer') // タイマーを停止
      })
      state.nowPlayingSongIndex = state.videoList.findIndex(item => item.id === videoId)
      if (!state.isPlaying || state.nowPlayingSongIndex !== -1) state.audioObj.play()
    },
    songControll ({ state }, isPlay:boolean) {
      if (isPlay) state.audioObj.play()
      else state.audioObj.pause()
    },
    skipSong ({ state, dispatch }, isNext: boolean) {
      if (isNext) { // 次の曲へ進むなら
        if (state.nowPlayingSongIndex < state.videoList.length - 1) state.nowPlayingSongIndex++
        else state.nowPlayingSongIndex = 0
      } else { // 前の曲へ戻るなら
        if (state.nowPlayingSongIndex > 0) state.nowPlayingSongIndex--
        else state.nowPlayingSongIndex = state.videoList.length - 1
      }
      const playVideoId = state.videoList[state.nowPlayingSongIndex].id
      dispatch('setAudioObj', playVideoId)
    },
    changeRepeatType ({ state }) {
      state.repeatTypeObj.index++
      if (state.repeatTypeObj.index >= state.repeatTypeObj.list.length) state.repeatTypeObj.index = 0
    },
    initSongAudio ({state, dispatch}) {
      state.nowPlayingSongIndex = -1
      state.audioObj.pause()
      state.audioObj.currentTime = 0
      state.audioObj.src = ''
      dispatch('stopTimer')
      state.isPlaying = false
    },
    removeSongList ({ state, dispatch }) {
      const nowPlayingSongIndex = state.nowPlayingSongIndex
      if (nowPlayingSongIndex === -1) return
      state.videoList.splice(nowPlayingSongIndex, 1)
      if (state.videoList.length <= state.nowPlayingSongIndex) state.nowPlayingSongIndex = state.videoList.length - 1
      if (state.videoList.length === 0) {
        // 初期化
        dispatch('initSongAudio')
      } else {
        const playVideoId = state.videoList[state.nowPlayingSongIndex].id
        dispatch('setAudioObj', playVideoId)
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'yt-speaker',
      paths: ['repeatTypeObj', 'listId']
    })
  ]
})
