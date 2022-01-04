import { IArticles } from '../models/response-everything-model';
import News from '../news/news';

export default class SortService {
  static transform(value: IArticles[], isDesk: boolean): IArticles[] {
    const sorted = value.sort((a, b) => {
      const cur = new Date(a.publishedAt).getTime();
      const prev = new Date(b.publishedAt).getTime();
      if (cur < prev) {
        return -1;
      }
      return 1;
    });
    News.draw(sorted);
    if (isDesk) {
      News.draw(sorted.reverse());
    }
    return sorted;
  }
}
