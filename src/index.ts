/* mkdown */


export const GITHUB_API              = "https://api.github.com";
export const GITHUB_API_REPOS        = "/repos";
export const GITHUB_API_CONTENTS     = "/contents";

export const EXT_MD                  = ".md";
export const EXT_MKD                 = ".mkd";

export const SKIP_README             = "README.md";


export class Article {

  private _title:        string;
  private _content:      string;
  private _synopsis:     string;
  private _creation:     number;

  constructor(title: string, content: string) {

    this._title    = title;
    this._content  = content;
    this._synopsis = "";
    this._creation = Date.now(); // TODO: placeholder

  } // constructor


  get title(): string {
    return this._title;
  } // title


  get content(): string {
    return this._content;
  } // content


  set content(c: string) {
    this._content = c;
  } // content


  get synopsis(): string {
    return this._synopsis;
  } // synopsis


  get creation(): number {
    return this._creation;
  } // creation


} // Article


export default class Github {

  private _page:          string;
  private _index:         string;
  private _meta:          any;
  private _articles:      Map<string, Article>;


  constructor(page: string, index: string) {

    this._page        = page;
    this._index       = index;
    this._articles    = new Map();

  } // constructor


  getContent(id: string, cb: Function) {

    fetch(this._page + "/" + id)
    .then((res) => res.text())
    .then((data) => {

      const a = new Article(id, data);

      this._articles.set(id, a);

      cb(id);

    })

  } // getContent


  getIndex(cb: Function) {

    fetch(this._page + "/" + this._index)
    .then((res) => res.json())
    .then((data) => {

      this._meta = data;

      console.log(data);

      cb(data);

    })
    .catch((err) => console.log(err));

  } // getIndex


  get articles(): Map<string, Article> {
    return this._articles;
  } // articles


  get meta(): any {
    return this._meta;
  } // meta

} // Github
