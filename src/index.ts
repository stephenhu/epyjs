/* mkdown */

export const GITHUB_API               = "https://api.github.com";
export const GITHUB_API_REPOS         = "/repos";
export const GITHUB_API_CONTENTS      = "/contents";

export const EXT_MD                   = ".md";
export const EXT_MKD                  = ".mkd";

export const SKIP_README              = "README.md";

export const STR_EMPTY                = "";
export const STR_SPACE                = " ";
export const STR_NL                   = "\n";

export const STR_CLOSE_PAREN          = ")";
export const STR_OPEN_PAREN           = "(";

export const MD_HEADER                = '#';
export const MD_IMG                   = '!';


export const REGEX_MDMKD              = /\.md|\.mkd/;
export const REGEX_TITLE              = /[-|_|.|+]+/g;
export const REGEX_VALID_TITLE        = /[^-+_.a-zA-Z0-9]+/g;
export const REGEX_LINK               = /[(][a-zA-Z0-9+:=?&\/#._\-]+[)]$/;


export class Article {

  private _title:        string;
  private _file:         string;
  private _content:      string;
  private _synopsis:     string;
  private _creation:     number;

  constructor(title: string, content: string) {

    this._file     = title;
    this._title    = this.extractTitle(title);
    this._content  = content;
    this._synopsis = STR_EMPTY;
    this._creation = 0;

  } // constructor


  isValidTitle(n: string): boolean {

    const re = new RegExp(REGEX_VALID_TITLE);
    return !re.test(n);

  } // isValidTitle


  extractTitle(n: string): string {

    if(n === undefined || n === null || n.length === 0) {
      return STR_EMPTY;
    } else {

      if(this.isValidTitle(n)) {

        const title = n.replace(REGEX_MDMKD, STR_EMPTY).replace(
          REGEX_TITLE, STR_SPACE).trim();
  
        return title;
  
      } else {
        return STR_EMPTY;
      }

    }

  } // extractTitle


  summary(c: number): string {
  
    if(this._content === undefined || this._content === null ||
      this._content.length === 0) {
      
      console.log("Error: Unable to summarize article");
      return this._content;
  
    } else {

      const text = this.text();

      const words = text.trim().split(STR_SPACE);
  
      if(words.length >= c) {
    
        var ret: string = "";
    
        for(let i = 0; i < c; i++) {
          ret += words[i] + STR_SPACE;
        }
    
        return ret.trim();
    
      } else {
        return this._content;
      }
  
    }
  
  
  } // summary


  text(): string {

    const lines = this._content.split(STR_NL);

    for(let i = 0; i < lines.length; i++) {

      const m = lines[i][0];

      if(m !== undefined && m != null && m !== MD_HEADER &&
        m !== MD_IMG && lines[i] !== STR_EMPTY) {
        return lines[i];
      }

    }

    return STR_EMPTY;

  } // text


  images(): string[] {

    var ret: string[] = [];

    const lines = this._content.split(STR_NL);

    var re = new RegExp(REGEX_LINK);

    for(let i = 0; i < lines.length; i++) {

      const m = lines[i].trim()[0];

      if(m !== undefined && m != null && m === MD_IMG &&
        lines[i] !== STR_EMPTY) {

        let out = lines[i].match(re);

        console.log(lines[i]);
        if(out !== null && out.length > 0) {

          ret.push(out[0].replace(STR_OPEN_PAREN,
            STR_EMPTY).replace(STR_CLOSE_PAREN, STR_EMPTY));

        }

      }

    }

    return ret;

  } // images


  get file(): string {
    return this._file;
  } // file


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


  get page(): string {
    return this._page;
  } // page


  get articles(): Map<string, Article> {
    return this._articles;
  } // articles


  get meta(): any {
    return this._meta;
  } // meta

} // Github
