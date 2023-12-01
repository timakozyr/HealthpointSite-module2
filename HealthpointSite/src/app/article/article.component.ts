import { Component } from '@angular/core';
import { Article } from '../models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  article: Article;

  constructor(public route: ActivatedRoute) {
    this.article = new Article();
    route.params.subscribe(article => {
      this.article.id = article.id,
      this.article.annotation = article.annotation,
      this.article.text = article.text,
      this.article.title = article.title
    });
  }
}
