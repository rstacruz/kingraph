# Advanced

This is the part of the API that will help deal with bigger trees.

## Complex families

To express complex families, you can use `parents2` and `children2`. They will be drawn as dotted lines. Use this to express a different link, such as foster children or step parents.

```yml
families:
  - parents: [Ned, Catelyn]
    children: [Arya, Rickon, Bran, Sansa, Rob]
    children2: [Jon]
```

## Expressing relationships

All properties in a `Family` are optional (but you have to define at least one). You can use these to show other types of relationships.

```yml
families:
  # These guys are having an affair of sorts
  - parents2: [Loras, Renly]

  # No need to show their parents in the family tree,
  # but we want them to show up as siblings.
  - children: [Danaerys, Viserys, Rhaegar]
```

## Styling

Use `class` and `style` to style. Refer to Graphviz's [attributes documentation](http://graphviz.org/doc/info/attrs.html) for possible attributes.

```yml
people:
  James:
    fullname: James Potter
    class: [deceased]
styles:
  deceased:
    color: red
```

