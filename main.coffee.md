Finder
======

Use a query language to filter an array of objects.

    module.exports = (I={}, self=Core(I)) ->
      self.extend

Get a selection of objects that match the specified selector criteria. 
The selector language can select objects by id, type, or attributes. This 
method always returns an Array.

        find: (objects, selector) ->
          results = []

          matcher = generate(selector)

          objects.forEach (object) ->
            results.push object if matcher object

          results

    parseSelector = (selector) ->
      selector.split(",").invoke("trim")

    parseResult = (str) ->
      try
        JSON.parse(str)
      catch
        str

    process = (item) ->
      query = /^(\w+)?#?([\w\-]+)?\.?([\w\-]+)?=?([\w\-]+)?/.exec(item)

      if query
        if valueQuery = query[4]
          query[4] = parseResult valueQuery

        query.splice(1)
      else
        []

    get = (object, property) ->
      value = object?[property]

      if typeof value is "function"
        value.call(object)
      else
        value

    defaultTypeMatch = (type, object) ->
      type is get(object, "class")

    generate = (selector="", typeMatch=defaultTypeMatch) ->
      components = parseSelector(selector).map (piece) ->
        process(piece)

      (object) ->
        for component in components
          [type, id, attr, value] = component
          
          console.log component

          idMatch = !id or (id is get(object, "id"))
          typeMatch = !type or defaultTypeMatch(type, object)

          if attr
            if value?
              attrMatch = get(object, attr) is value
            else
              attrMatch = get(object, attr)
          else
            attrMatch = true

          return true if idMatch && typeMatch && attrMatch

        return false
