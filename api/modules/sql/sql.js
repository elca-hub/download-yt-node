const mysql = require('mysql');

exports.Sql = class Sql {
  constructor () {
    this.connection = mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'yt_song'
    });
  }

  connect () {
    this.connection.connect((err) => {
      if (err) {
        console.log('error connecting: ' + err.stack);
        return;
      }
    });
  }

  end () {
    this.connection.end();
  }

  /* listIdに対応するリストの中でsort_indexが最大値の値を返す */
  async getMaxSortIndex (listId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT MAX(sort_index) AS max_sort_index FROM songs WHERE list_id = ${listId}`;
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].max_sort_index);
        }
      });
    });
  }

  /* 曲のデータを追加 */
  async insertSongData (youtubeId, listId, title, author) {
    const maxIndex = await this.getMaxSortIndex(listId);
    const sql = `INSERT INTO songs (youtube_id, list_id, title, author, sort_index) VALUES ('${youtubeId}', ${listId}, '${title}', '${author}', ${maxIndex + 1})`;
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getSongsData () {
    const sql = `SELECT s.youtube_id, l.name as list_name, s.title, s.author, s.sort_index FROM songs s INNER JOIN lists l ON s.list_id = l.list_id`;
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
