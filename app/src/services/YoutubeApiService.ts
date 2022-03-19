/* eslint @typescript-eslint/no-explicit-any: 0 */
import http from "@/http-common";

class YoutubeApiService {
  getAudioUrl(videoId: string): string {
    return `http://localhost:3000/get/${videoId}/audio`;
  }

  getInfo(videoId: string): Promise<any> {
    return http.get(`/get/${videoId}/info`);
  }

  getThumbnailUrl (videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  getSongs(): Promise<any> {
    return http.post("/sql/songs");
  }
}
export default new YoutubeApiService();
