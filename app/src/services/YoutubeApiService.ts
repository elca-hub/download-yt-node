/* eslint @typescript-eslint/no-explicit-any: 0 */
import http from "@/http-common";
import IDatabaseData from "@/interfaces/IDatabaseData";

class YoutubeApiService {
  getAudioUrl(videoId: string): string {
    return `http://localhost:3000/song/${videoId}/audio`;
  }

  getInfo(videoId: string): Promise<any> {
    return http.get(`/song/${videoId}/info`);
  }

  getThumbnailUrl (videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  getSongs(listId: number): Promise<any> {
    return http.get(`/sql/songs/${listId}`);
  }

  insertSong (song: IDatabaseData): Promise<any> {
    return http.post("/sql/insert", song);
  }

  removeSong (youtubeId: string): Promise<any> {
    return http.delete(`/sql/delete/${youtubeId}`);
  }

  getSongLists(): Promise<any> {
    return http.get("/sql/songlists");
  }

  insertSongList (playListName: string): Promise<any> {
    return http.post("/sql/songlist/insert", {name: playListName});
  }
}
export default new YoutubeApiService();
