import { Injectable } from '@angular/core';
import { getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies, getURL4SearchMovies, getURL4MovieVideos, getMovieVideos, fetchMovies } from './URL';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getTrendingMovies(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private apiKey = environment.apiKey;  // 발급받은 API 키로 변경

  // 인기 영화 가져오기
  async getPopularMovies(page: number = 1): Promise<any> {
    const url = getURL4PopularMovies(this.apiKey, page);
    return await fetchMovies(url);
  }

  // 최신 개봉 영화 가져오기
  async getReleaseMovies(page: number = 1): Promise<any> {
    const url = getURL4ReleaseMovies(this.apiKey, page);
    return await fetchMovies(url);
  }

  // 영화 검색 기능
  async searchMovies(query: string): Promise<any> {
    const url = getURL4SearchMovies(this.apiKey, query);
    return await fetchMovies(url); // 검색 영화 요청을 URL.ts에서 처리
  }

  // 추가적인 장르 기반 영화 가져오기
  async getMoviesByGenre(genreId: string, page: number = 1): Promise<any> {
    const url = getURL4GenreMovies(this.apiKey, genreId, page);
    return await fetchMovies(url);
  }

  // 배너 영화 데이터 가져오기
  async getRandomMovies(): Promise<any> {
    try {
      const response = await this.getPopularMovies(1);
      return response.data.results[0];  
    } catch (error) {
      console.error('Error fetching banner movies:', error);
    }
  }

  // 영화의 동영상 정보 가져오기
  async getMovieVideos(movieId: number): Promise<any> {
    try {
      // URL을 생성하여 동영상 정보를 가져옴
      const response = getMovieVideos(getURL4MovieVideos(this.apiKey, movieId))
      return (await response).data.results;  // 동영상 정보 배열 리턴
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      return [];  // 에러 발생 시 빈 배열 리턴
    }
  }
  
}
