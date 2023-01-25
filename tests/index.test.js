const { isExportDeclaration } = require("typescript");
const { testEnvironment } = require("../jest.config");
const { Article, Github } = require("../src/index");

describe("article class title tests", () => {
  
  test("title with hyphens", () => {
    
    const a = new Article("a-namewithhyphens.md", "blah blah blah");
    expect(a.title).toBe("a namewithhyphens");
  
  });

  test("title with multiple hyphens", () => {
    
    const a = new Article("a-name-with-hyphens.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens");
  
  });

  test("title with mixed", () => {
    
    const a = new Article("a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with spaces", () => {
    
    const a = new Article("a name with hyphens dots.md", "blah blah blah");
    expect(a.title).toBe("");
  
  });

  test("title with unsupported asterisk", () => {
    
    const a = new Article("a-name-with-hyphens*.md", "blah blah blah");
    expect(a.title).toBe("");
  
  });

  test("title starts with underscores", () => {
    
    const a = new Article("_a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with multiple + in a row", () => {
    
    const a = new Article("a++++name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with mixed", () => {
    
    const a = new Article("a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with no markdown ext", () => {
    
    const a = new Article("a-name_with+hyphens.dots", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with mkd extension", () => {
    
    const a = new Article("a-name_with+hyphens.dots.mkd", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title with non md or mkd ext", () => {
    
    const a = new Article("a-name_with+hyphens.dots.doc", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots doc");
  
  });

});


describe("article class summary tests", () => {
  
  test("summary concatenated to 5 words", () => {
    
    const a = new Article("a-namewithhyphens.md", "this is a long article with more than 20 words from the long lost valley of the sun in new york city");
    expect(a.summary(5)).toBe("this is a long article");
  
  });

  test("summary without limit", () => {
    
    const a = new Article("a-namewithhyphens.md", "this is a long article with more than 20 words from the long lost valley of the sun in new york city");
    expect(a.summary()).toBe("this is a long article with more than 20 words from the long lost valley of the sun in new");
  
  });

  test("summary with header", () => {
    
    const a = new Article("a-namewithhyphens.md", "# what is this? \nthis is a long article with more than 20 words from the long lost valley of the sun in new york city");
    expect(a.summary(5)).toBe("this is a long article");
  
  });

  test("summary less than length for first paragraph", () => {
    
    const a = new Article("a-namewithhyphens.md", "two words\nthis is much longer with multiple words");
    expect(a.summary(5)).toBe("two words");
  
  });

});


describe("article class image tests", () => {
  
  test("single link", () => {
    
    const a = new Article("name.md",
    "# matsuda\n ![test](https://www.google.com)\n");

    expect(a.images()).toEqual(expect.arrayContaining([
      "https://www.google.com"
    ]));
  
  });

  test("no link", () => {
    
    const a = new Article("name.md", "# matsuda\n");
    expect(a.images()).toEqual(expect.arrayContaining([
    ]));
  
  });

  test("link valid chars", () => {
    
    const a = new Article("name.md",
    "# matsuda\n ![](https://www.a.com/page-two_at?det=ok@&token=2#west+x)");
    expect(a.images()).toEqual(expect.arrayContaining([
      "https://www.a.com/page-two_at?det=ok@&token=2#west+x"
    ]));
  
  });

  test("link invalid char caret", () => {
    
    const a = new Article("name.md",
    "# matsuda\n ![](https://www.a.com/page-two_at?det=\^ok&token=2#west+x)");
    expect(a.images()).toEqual(expect.arrayContaining([
    ]));
  
  });

  test("link invalid char exclamation", () => {
    
    const a = new Article("name.md",
    "# matsuda\n ![](https://www.a.com/page-two_at?det=!ok&token=2#west+x)");
    expect(a.images()).toEqual(expect.arrayContaining([
    ]));
  
  });

  test("valid link, but starts with spaces", () => {
    
    const a = new Article("name.md",
    "# matsuda\n    ![](https://www.a.com/page-two_at?det=ok&token=2#west+x)");
    expect(a.images()).toEqual(expect.arrayContaining([
      "https://www.a.com/page-two_at?det=ok&token=2#west+x"
    ]));
  
  });

});
