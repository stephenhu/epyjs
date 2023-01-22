const { isExportDeclaration } = require("typescript");
const { testEnvironment } = require("../jest.config");
const { Article, Github } = require("../src/index");

describe("article class", () => {
  
  test("title extraction with hyphens", () => {
    
    const a = new Article("a-namewithhyphens.md", "blah blah blah");
    expect(a.title).toBe("a namewithhyphens");
  
  });

  test("title extraction with multiple hyphens", () => {
    
    const a = new Article("a-name-with-hyphens.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens");
  
  });

  test("title extraction with mixed", () => {
    
    const a = new Article("a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with spaces", () => {
    
    const a = new Article("a name with hyphens dots.md", "blah blah blah");
    expect(a.title).toBe("");
  
  });

  test("title extraction with unsupported asterisk", () => {
    
    const a = new Article("a-name-with-hyphens*.md", "blah blah blah");
    expect(a.title).toBe("");
  
  });

  test("title extraction starts with underscores", () => {
    
    const a = new Article("_a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with multiple + in a row", () => {
    
    const a = new Article("a++++name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with mixed", () => {
    
    const a = new Article("a-name_with+hyphens.dots.md", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with no markdown ext", () => {
    
    const a = new Article("a-name_with+hyphens.dots", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with mkd extension", () => {
    
    const a = new Article("a-name_with+hyphens.dots.mkd", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots");
  
  });

  test("title extraction with non md or mkd ext", () => {
    
    const a = new Article("a-name_with+hyphens.dots.doc", "blah blah blah");
    expect(a.title).toBe("a name with hyphens dots doc");
  
  });

});
