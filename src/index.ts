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
  private _bytes:        number;

  constructor(title: string, content: string, size: number) {

    this._title    = title;
    this._content  = content;
    this._synopsis = "";
    this._creation = Date.now(); // TODO: placeholder
    this._bytes    = size;

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

  get bytes(): number {
    return this._bytes;
  } // bytes


} // Article


export default class Github {

  private _user:         string;
  private _repo:         string;
  private _articles:     Map<string, Article>;
  private _exclusions:   Set<string>;

  constructor(_user: string, _repo: string, _exclude: string[]) {

    this._user = _user;
    this._repo = _repo;

    this._articles    = new Map();
    this._exclusions  = new Set();

    this.addExclusions(_exclude);
  
  } // constructor


  addExclusions(e: string[]) {

    if(e === null || e === undefined) {
      return;
    }

    for(let i = 0; i < e.length; i++) {
      this._exclusions.add(e[i].toLowerCase().trim());
    }

  } // addExclusions


  apiList(): string {
    return GITHUB_API + GITHUB_API_REPOS + "/" + this._user + "/" +
      this._repo + GITHUB_API_CONTENTS; 
  } // apiList


  apiContent(a: string): string {
    return GITHUB_API + GITHUB_API_REPOS + "/" + this._user + "/" +
      this._repo + GITHUB_API_CONTENTS + "/" + a;
  } // apiContent


  getContent(a: any): Promise<any> {

    let json = fetch(this.apiContent(a))
      .then((res) => res.json());

    return json;

  } // getContent


  getArticles(cb: Function) {

    fetch(this.apiList())
    .then((res) => res.json())
    .then((data) => {

      for(let i = 0; i < data.length; i++) {
        
        var t = data[i].name.toLowerCase();

        if((t.includes(EXT_MD) || t.includes(EXT_MKD)) &&
          !this._exclusions.has(t)) {

          let p = this.getContent(data[i].name);

          p.then((j) => {

            const a = new Article(j.name, atob(j.content), j.size);

            this._articles.set(j.name, a);

            cb(j.name);

          })
          .catch((err) => console.log(err));

        }

      }

    })
    .catch((err) => console.log(err));

  } // getArticles


  get user(): string {
    return this._user;
  } // user


  get repo(): string {
    return this._repo;
  } // repo


  get articles(): Map<string, Article> {
    return this._articles;
  } // articles

} // Github
