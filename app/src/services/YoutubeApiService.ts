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

  getSongs(): Promise<any> {
    return http.get("/sql/songs");
  }

  insertSong (song: IDatabaseData): Promise<any> {
    return http.post("/sql/insert", song);
  }
}
export default new YoutubeApiService();
