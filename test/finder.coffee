Finder = require "../main"

describe "Finder", ->
  finder = Finder()

  it "should find objects with normal properties", ->
    results = finder.find([{
      name: "duder"
    }], ".name=duder")

    assert.equal results[0].name, "duder"

  it "should find obects with method properties", ->
    results = finder.find([{
      name: -> "duder"
    }], ".name=duder")

    assert.equal results[0].name(), "duder"

  it "should find objects by id attribute", ->
    results = finder.find([{
      id: "duder"
    }], "#duder")

    assert.equal results[0].id, "duder"

  it "should find objects by id method", ->
    results = finder.find([{
      id: -> "duder"
    }], "#duder")

    assert.equal results[0].id(), "duder"
